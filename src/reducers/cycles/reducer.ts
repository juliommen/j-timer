// A immer garante a imutabilidade do estado, permitindo trabalharmos com ele de forma mutável na aparência
import { produce } from 'immer'
import { Cycle } from '../../contexts/CyclesContext'
import { ActionTypes } from './actions'

export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CYCLE: {
      const indexOfCycle = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      return produce(state, (draft) => {
        draft.cycles[indexOfCycle].interruptionDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionTypes.FINISH_CYCLE: {
      const indexOfCycle = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      return produce(state, (draft) => {
        draft.cycles[indexOfCycle].finishDate = new Date()
        draft.activeCycleId = null
      })
    }
    default:
      return state
  }
}
