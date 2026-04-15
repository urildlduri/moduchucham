# 모두의 추첨 — 공정한 추첨 방송 플랫폼

## 로컬 실행

```bash
# 1. 압축 해제 후 의존성 설치
npm install

# 2. Firebase 키 설정
cp .env.local.example .env.local
# .env.local 파일에 Firebase 키 입력

# 3. 개발 서버 실행
npm run dev
# → http://localhost:3000
```

## 페이지 구조

| 경로 | 설명 |
|---|---|
| `/` | 홈 (Hero, 추첨 일정, How it Works, 요금제) |
| `/verify/[eventId]` | 공정성 검증 페이지 |
| `/admin` | 기업 관리자 대시보드 |

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/api/events` | 이벤트 목록 조회 |
| POST | `/api/events` | 이벤트 생성 |
| GET/POST | `/api/participants/[eventId]` | 참가자 조회/업로드/잠금 |
| POST | `/api/draw/[eventId]` | 추첨 실행 |
| GET | `/api/certificate/[eventId]` | 증명서 조회 |

## Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인 및 배포
vercel login
vercel

# 환경변수 등록
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
vercel env add NEXT_PUBLIC_BASE_URL

# 프로덕션 배포
vercel --prod
```

## Firebase 설정

1. [Firebase Console](https://console.firebase.google.com) → 새 프로젝트 생성
2. Firestore Database → 시작 (asia-northeast3 / 서울)
3. Authentication → Google/Email 활성화
4. 프로젝트 설정 → 웹 앱 추가 → 키 복사 → `.env.local`에 붙여넣기

## 알고리즘 (Provably Fair)

```
SHA256(UUID + Seed + index) → 점수화 → 정렬 → 상위 N명 선정

Seed = 방송 시작 이후 첫 Bitcoin 블록 해시 (자동 수집)
명단 해시 = SHA256(정렬된 참가자 UUID + 참가시각 JSON)
```

소스코드: `src/lib/algorithm.ts`
