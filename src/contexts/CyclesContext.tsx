/* eslint-disable prettier/prettier */
import { differenceInSeconds } from 'date-fns'
import { createContext,ReactNode, useReducer, useState, useEffect } from 'react'
import { createNewCycleAction, finishCycleAction } from '../reducers/cycles/actions'
import { cyclesReducer, CyclesState } from '../reducers/cycles/reducer'
import { interruptCycleAction } from './../reducers/cycles/actions'

export interface Cycle {
  id: string
  task: string
  minutes: number
  startDate: Date
  interruptionDate?: Date
  finishDate?: Date
}

interface CreateCycleDate {
  task: string
  minutes: number
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPast: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleDate) => void
  interruptCurrentCycle: () => void
  cycles: Cycle[]
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({children}: CyclesContextProviderProps) {
  const emptyCycleState: CyclesState = {cycles: [],activeCycleId: null}
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    emptyCycleState,
    (emptyCycleState) => {
      const storageStateAsJSON = localStorage.getItem(
        '@pomodoro:cycles-state-1.0.0',
      )
      return storageStateAsJSON ? JSON.parse(storageStateAsJSON) : emptyCycleState
    }
  )

  const { cycles, activeCycleId } = cyclesState || emptyCycleState

  const activeCycle =  cycles.find(
    (cycle) => cycle.id === activeCycleId
  )

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPast(seconds)
  }

  const [amountSecondsPast, setAmountSecondsPast] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  function createNewCycle(data: CreateCycleDate) {

    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      minutes: data.minutes,
      task: data.task,
      startDate: new Date(),
      interruptionDate: new Date(),
    }
    dispatch(createNewCycleAction(newCycle))
  }

  function interruptCurrentCycle() {
    dispatch(interruptCycleAction())
  }

  function markCurrentCycleAsFinished() {
    dispatch(finishCycleAction())
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState, null, 2)
    localStorage.setItem('@pomodoro:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPast,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
