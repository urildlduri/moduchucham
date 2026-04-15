import { createHash } from 'crypto'
import type { Participant, Winner } from '@/types'

export const ALGORITHM_VERSION = 'moduchucham-fair-v1.2'
export const ALGORITHM_SOURCE = 'https://github.com/moduchucham/algorithm'

/**
 * 참가자 목록을 결정론적으로 정렬
 * 정렬 기준: 참가시각(UTC) 오름차순 → UUID 오름차순
 */
export function sortParticipants(participants: Participant[]): Participant[] {
  return [...participants].sort((a, b) => {
    const timeA = new Date(a.joinedAt).getTime()
    const timeB = new Date(b.joinedAt).getTime()
    if (timeA !== timeB) return timeA - timeB
    return a.uuid.localeCompare(b.uuid)
  })
}

/**
 * 참가자 목록의 SHA-256 해시 생성
 * 입력: 정렬된 참가자 UUID + 참가시각 배열을 JSON 직렬화
 */
export function hashParticipants(sortedParticipants: Participant[]): string {
  const data = sortedParticipants.map(p => ({
    uuid: p.uuid,
    joinedAt: p.joinedAt,
    channel: p.channel,
  }))
  const json = JSON.stringify(data)
  return createHash('sha256').update(json, 'utf8').digest('hex')
}

/**
 * 각 참가자의 결정론적 점수 계산
 * score = SHA256(uuid + seed + index)
 */
export function scoreParticipant(uuid: string, seed: string, index: number): string {
  const input = `${uuid}${seed}${index}`
  return createHash('sha256').update(input, 'utf8').digest('hex')
}

/**
 * 핵심 추첨 알고리즘 (모두의추첨-Fair-v1.2)
 * 동일한 participants + seed → 항상 동일한 winners
 */
export function runDraw(
  sortedParticipants: Participant[],
  seed: string,
  winnersCount: number
): Winner[] {
  // 1. 각 참가자에게 결정론적 점수 부여
  const scored = sortedParticipants.map((p, i) => ({
    uuid: p.uuid,
    score: scoreParticipant(p.uuid, seed, i),
  }))

  // 2. 점수(hex string) 사전순 정렬
  scored.sort((a, b) => a.score.localeCompare(b.score))

  // 3. 상위 N명 선정
  return scored.slice(0, winnersCount).map((w, i) => ({
    rank: i + 1,
    participantUuid: w.uuid,
    maskedName: '***',       // 실제: DB에서 개인정보 조회 후 마스킹
    maskedContact: '***',
    score: w.score,
  }))
}

/**
 * 추첨 결과 검증 (누구나 실행 가능)
 * participantsHash가 일치하고 동일한 당첨자가 나오면 검증 통과
 */
export function verifyDraw(
  sortedParticipants: Participant[],
  expectedHash: string,
  seed: string,
  winnersCount: number,
  expectedWinnerUuids: string[]
): { valid: boolean; hashMatch: boolean; winnersMatch: boolean; computedHash: string; computedWinners: string[] } {
  const computedHash = hashParticipants(sortedParticipants)
  const hashMatch = computedHash === expectedHash

  const computedWinnersRaw = runDraw(sortedParticipants, seed, winnersCount)
  const computedWinners = computedWinnersRaw.map(w => w.participantUuid)
  const winnersMatch =
    computedWinners.length === expectedWinnerUuids.length &&
    computedWinners.every((uuid, i) => uuid === expectedWinnerUuids[i])

  return {
    valid: hashMatch && winnersMatch,
    hashMatch,
    winnersMatch,
    computedHash,
    computedWinners,
  }
}

/**
 * 브라우저에서 실행 가능한 클라이언트 사이드 검증
 * SubtleCrypto API 사용 (라이브러리 불필요)
 */
export async function scoreParticipantClient(uuid: string, seed: string, index: number): Promise<string> {
  const input = `${uuid}${seed}${index}`
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function runDrawClient(
  participantUuids: string[],
  seed: string,
  winnersCount: number
): Promise<{ uuid: string; score: string; rank?: number }[]> {
  const scored = await Promise.all(
    participantUuids.map(async (uuid, i) => ({
      uuid,
      score: await scoreParticipantClient(uuid, seed, i),
    }))
  )
  scored.sort((a, b) => a.score.localeCompare(b.score))
  return scored.slice(0, winnersCount).map((w, i) => ({ ...w, rank: i + 1 }))
}

/**
 * 마스킹 규칙
 */
export function maskName(name: string): string {
  if (name.length === 2) return name[0] + '*'
  if (name.length === 3) return name[0] + '*' + name[2]
  return name[0] + '**' + name[name.length - 1]
}

export function maskPhone(phone: string): string {
  return phone.replace(/(\d{3})-(\d{3,4})-(\d{4})/, '$1-****-$3')
}

export function maskEmail(email: string): string {
  const [id, domain] = email.split('@')
  return id.slice(0, 3) + '***@' + domain
}
