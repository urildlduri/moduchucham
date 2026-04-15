/**
 * 외부 공개 데이터 기반 Seed 수집
 * 운영자가 개입할 수 없는 외부 소스만 사용
 */

export interface BitcoinBlock {
  blockNumber: number
  hash: string
  timestamp: number
  verifyUrl: string
}

/**
 * 특정 시각 이후 첫 번째 Bitcoin 블록 해시 조회
 * Blockstream.info 공개 API 사용
 */
export async function fetchBitcoinBlockAfter(afterTimestamp: number): Promise<BitcoinBlock> {
  // 현재 최신 블록 높이 조회
  const heightRes = await fetch('https://blockstream.info/api/blocks/tip/height')
  if (!heightRes.ok) throw new Error('Bitcoin API 연결 실패')
  const tipHeight = parseInt(await heightRes.text())

  // 최근 10개 블록 조회하여 afterTimestamp 이후 첫 블록 찾기
  for (let h = tipHeight; h >= tipHeight - 20; h--) {
    const hashRes = await fetch(`https://blockstream.info/api/block-height/${h}`)
    if (!hashRes.ok) continue
    const blockHash = (await hashRes.text()).trim()

    const blockRes = await fetch(`https://blockstream.info/api/block/${blockHash}`)
    if (!blockRes.ok) continue
    const block = await blockRes.json()

    if (block.timestamp * 1000 >= afterTimestamp) {
      return {
        blockNumber: h,
        hash: blockHash,
        timestamp: block.timestamp * 1000,
        verifyUrl: `https://blockstream.info/block/${blockHash}`,
      }
    }
  }

  throw new Error('적합한 Bitcoin 블록을 찾을 수 없습니다')
}

/**
 * 동행복권 로또 당첨번호 조회
 */
export async function fetchLottoNumbers(round?: number): Promise<{
  round: number
  numbers: number[]
  bonus: number
  drawDate: string
}> {
  const roundParam = round ? `&drwNo=${round}` : ''
  const res = await fetch(
    `https://www.dhlottery.co.kr/common.do?method=getLottoNumber${roundParam}`
  )
  if (!res.ok) throw new Error('로또 API 연결 실패')
  const data = await res.json()

  return {
    round: data.drwNo,
    numbers: [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6],
    bonus: data.bnusNo,
    drawDate: data.drwNoDate,
  }
}

/**
 * 복합 Seed 생성 (Bitcoin + 이벤트 ID 조합)
 * 동일 날짜 이벤트 간에도 서로 다른 Seed 보장
 */
export function buildCombinedSeed(bitcoinHash: string, eventId: string): string {
  const { createHash } = require('crypto')
  return createHash('sha256')
    .update(`${bitcoinHash}${eventId}`)
    .digest('hex')
}

/**
 * Seed 소스 설명 텍스트
 */
export function describeSeedSource(sourceType: string, blockNumber?: number): string {
  switch (sourceType) {
    case 'bitcoin':
      return `Bitcoin Block #${blockNumber?.toLocaleString() ?? '???'} Hash`
    case 'bitcoin_lotto':
      return `Bitcoin Block #${blockNumber?.toLocaleString() ?? '???'} + 로또 당첨번호 조합`
    default:
      return '외부 공개 데이터'
  }
}
