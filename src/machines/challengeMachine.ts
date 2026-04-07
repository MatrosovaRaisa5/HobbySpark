import { createMachine, interpret, assign } from 'xstate'
import { ApplicationSettings } from '@nativescript/core'

const STORAGE_KEY_STATE = 'challenge_state'
const STORAGE_KEY_ID    = 'challenge_id'
const STORAGE_KEY_DAY   = 'challenge_current_day'
const STORAGE_KEY_TOTAL = 'challenge_total_days'

export interface ChallengeContext {
  challengeId: number
  currentDay: number
  totalDays: number
}

export type ChallengeEvent =
  | { type: 'START'; challengeId: number; totalDays: number }
  | { type: 'COMPLETE_DAY' }
  | { type: 'RESET' }

function loadContext(): ChallengeContext {
  return {
    challengeId: ApplicationSettings.getNumber(STORAGE_KEY_ID, 1),
    currentDay:  ApplicationSettings.getNumber(STORAGE_KEY_DAY, 1),
    totalDays:   ApplicationSettings.getNumber(STORAGE_KEY_TOTAL, 7),
  }
}

function loadState(): string {
  return ApplicationSettings.getString(STORAGE_KEY_STATE, 'idle')
}

function saveContext(ctx: ChallengeContext, state: string) {
  ApplicationSettings.setNumber(STORAGE_KEY_ID,    ctx.challengeId)
  ApplicationSettings.setNumber(STORAGE_KEY_DAY,   ctx.currentDay)
  ApplicationSettings.setNumber(STORAGE_KEY_TOTAL, ctx.totalDays)
  ApplicationSettings.setString(STORAGE_KEY_STATE, state)
}

export const challengeMachine = createMachine<ChallengeContext, ChallengeEvent>({
  id: 'challenge',
  initial: loadState() as 'idle' | 'inProgress' | 'completed',
  context: loadContext(),
  states: {
    idle: {
      on: {
        START: {
          target: 'inProgress',
          actions: assign((_, event) => ({
            challengeId: event.challengeId,
            currentDay: 1,
            totalDays: event.totalDays,
          })),
        },
      },
    },
    inProgress: {
      on: {
        START: {
          target: 'inProgress',
          actions: assign((_, event) => ({
            challengeId: event.challengeId,
            currentDay: 1,
            totalDays: event.totalDays,
          })),
        },
        COMPLETE_DAY: [
          {
            target: 'completed',
            cond: 'isLastDay',
            actions: assign((ctx) => ({
              currentDay: Math.min(ctx.currentDay + 1, ctx.totalDays),
            })),
          },
          {
            target: 'inProgress',
            actions: assign((ctx) => ({
              currentDay: Math.min(ctx.currentDay + 1, ctx.totalDays),
            })),
          },
        ],
        RESET: {
          target: 'idle',
          actions: assign({
            challengeId: 1,
            currentDay: 1,
            totalDays: 7,
          }),
        },
      },
    },
    completed: {
      on: {
        START: {
          target: 'inProgress',
          actions: assign((_, event) => ({
            challengeId: event.challengeId,
            currentDay: 1,
            totalDays: event.totalDays,
          })),
        },
        RESET: {
          target: 'idle',
          actions: assign({
            challengeId: 1,
            currentDay: 1,
            totalDays: 7,
          }),
        },
      },
    },
  },
}, {
  guards: {
    isLastDay: (ctx) => ctx.currentDay >= ctx.totalDays,
  },
})

export const challengeService = interpret(challengeMachine)
  .onTransition((state) => {
    saveContext(state.context, state.value as string)
  })
  .start()

export function getCurrentDay(): number {
  return challengeService.getSnapshot().context.currentDay
}

export function getTotalDays(): number {
  return challengeService.getSnapshot().context.totalDays
}

export function getChallengeId(): number {
  return challengeService.getSnapshot().context.challengeId
}

export function getMachineState(): string {
  return challengeService.getSnapshot().value as string
}

export function startChallenge(challengeId: number, totalDays = 7) {
  const snap = challengeService.getSnapshot()
  if (snap.value === 'inProgress' && snap.context.challengeId === challengeId) return
  challengeService.send({ type: 'START', challengeId, totalDays })
}

export function completeDay() {
  challengeService.send({ type: 'COMPLETE_DAY' })
}