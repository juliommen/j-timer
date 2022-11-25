import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from './../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <header>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput
          type="text"
          id="task"
          placeholder="Dê um nome para o seu projeto"
          list="task-suggestions"
          {...register('task')}
          disabled={!!activeCycle}
        />
        <datalist id="task-suggestions">
          <option value="Projeto 1" />
          <option value="Projeto 2" />
          <option value="Projeto 3" />
        </datalist>
        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput
          type="number"
          id="minutesAmount"
          placeholder="0"
          step="1"
          max="60"
          min="1"
          {...register('minutes', { valueAsNumber: true })}
          disabled={!!activeCycle}
        />
        <span>minutos.</span>
      </header>
    </FormContainer>
  )
}
