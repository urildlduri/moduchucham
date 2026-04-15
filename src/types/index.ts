export type EventStatus = 'draft' | 'active' | 'locked' | 'live' | 'drawing' | 'done' | 'cancelled'

export type SeedSourceType = 'bitcoin' | 'bitcoin_lotto' | 'weather'

export interface DrawEvent {
  id: string
  companyId: string
  companyName: string
  companyLogo?: string
  title: string
  description: string
  prize: string
  prizeValue?: number
  winnerCount: number
  allowDuplicate: boolean
  status: EventStatus
  participantCount: number
  streamUrl?: string
  streamViewers?: number
  scheduledAt: string        // ISO UTC
  broadcastStartAt?: string
  lockAt?: string
  lockedAt?: string
  participantsHash?: string  // SHA-256
  seedSource: SeedSourceType
  seedBlockNumber?: number
  seedValue?: string
  seedCollectedAt?: string
  drawExecutedAt?: string
  algorithmVersion: string
  certificateUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Participant {
  uuid: string
  eventId: string
  joinedAt: string           // ISO UTC
  channel: string            // instagram | web | api
  isValid: boolean
  isDuplicate: boolean
}

export interface Winner {
  rank: number
  participantUuid: string
  maskedName: string
  maskedContact: string
  score: string
}

export interface Certificate {
  version: string
  eventId: string
  eventName: string
  companyName: string
  participants: {
    count: number
    hashSha256: string
    lockTimestampUtc: string
    downloadUrl: string
  }
  seed: {
    sourceType: SeedSourceType
    sourceDescription: string
    seedValue: string
    seedCollectedUtc: string
    externalVerifyUrl: string
  }
  algorithm: {
    name: string
    version: string
    sourceUrl: string
  }
  drawExecution: {
    timestampUtc: string
    winnersCount: number
  }
  winners: Winner[]
  verification: {
    verifyUrl: string
    certificateHash: string
    issuedUtc: string
  }
}

export interface Company {
  id: string
  name: string
  email: string
  plan: 'starter' | 'business' | 'pro' | 'enterprise'
  usageThisMonth: number
  limitPerMonth: number
  isVerified: boolean
  createdAt: string
}
