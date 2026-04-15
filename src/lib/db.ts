import {
  collection, doc, getDoc, getDocs, addDoc, updateDoc,
  query, where, orderBy, limit, serverTimestamp, Timestamp,
  writeBatch, increment
} from 'firebase/firestore'
import { db } from './firebase'
import type { DrawEvent, Participant, Certificate, Company } from '@/types'

// ── EVENTS ──────────────────────────────────────────────

export async function getEvents(opts?: {
  status?: DrawEvent['status']
  companyId?: string
  lim?: number
}): Promise<DrawEvent[]> {
  let q = query(collection(db, 'events'), orderBy('scheduledAt', 'asc'))
  if (opts?.status) q = query(q, where('status', '==', opts.status))
  if (opts?.companyId) q = query(q, where('companyId', '==', opts.companyId))
  if (opts?.lim) q = query(q, limit(opts.lim))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as DrawEvent))
}

export async function getEvent(id: string): Promise<DrawEvent | null> {
  const snap = await getDoc(doc(db, 'events', id))
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as DrawEvent) : null
}

export async function createEvent(data: Omit<DrawEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'events'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateEvent(id: string, data: Partial<DrawEvent>): Promise<void> {
  await updateDoc(doc(db, 'events', id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// ── PARTICIPANTS ─────────────────────────────────────────

export async function getParticipants(eventId: string, onlyValid = false): Promise<Participant[]> {
  let q = query(
    collection(db, 'events', eventId, 'participants'),
    orderBy('joinedAt', 'asc')
  )
  if (onlyValid) q = query(q, where('isValid', '==', true))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ uuid: d.id, ...d.data() } as Participant))
}

export async function uploadParticipants(
  eventId: string,
  participants: Omit<Participant, 'uuid'>[]
): Promise<{ uploaded: number; duplicates: number }> {
  const batch = writeBatch(db)
  let duplicates = 0

  // 이메일/전화 기준 중복 탐지
  const seen = new Set<string>()

  for (const p of participants) {
    const key = `${p.channel}`
    const isDuplicate = seen.has(key)
    if (isDuplicate) duplicates++
    else seen.add(key)

    const ref = doc(collection(db, 'events', eventId, 'participants'))
    batch.set(ref, { ...p, isDuplicate, isValid: !isDuplicate })
  }

  await batch.commit()
  await updateDoc(doc(db, 'events', eventId), {
    participantCount: participants.length - duplicates,
    updatedAt: serverTimestamp(),
  })

  return { uploaded: participants.length, duplicates }
}

export async function lockParticipants(
  eventId: string,
  hash: string
): Promise<void> {
  await updateDoc(doc(db, 'events', eventId), {
    status: 'locked',
    participantsHash: hash,
    lockedAt: new Date().toISOString(),
    updatedAt: serverTimestamp(),
  })
}

// ── CERTIFICATES ─────────────────────────────────────────

export async function saveCertificate(cert: Certificate): Promise<void> {
  await addDoc(collection(db, 'certificates'), {
    ...cert,
    createdAt: serverTimestamp(),
  })
}

export async function getCertificate(eventId: string): Promise<Certificate | null> {
  const q = query(collection(db, 'certificates'), where('eventId', '==', eventId), limit(1))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return snap.docs[0].data() as Certificate
}

// ── AUDIT LOG ────────────────────────────────────────────

export async function writeAuditLog(entry: {
  actorId: string
  action: string
  resourceId: string
  resourceType: string
  before?: unknown
  after?: unknown
  ip?: string
}): Promise<void> {
  await addDoc(collection(db, 'auditLogs'), {
    ...entry,
    timestamp: serverTimestamp(),
  })
}

// ── TODAY's EVENTS (public) ───────────────────────────────

export async function getTodayEvents(): Promise<DrawEvent[]> {
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)

  const q = query(
    collection(db, 'events'),
    where('scheduledAt', '>=', todayStart.toISOString()),
    where('scheduledAt', '<=', todayEnd.toISOString()),
    orderBy('scheduledAt', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as DrawEvent))
}
