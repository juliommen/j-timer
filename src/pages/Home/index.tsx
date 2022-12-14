import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { HomeContainer } from './styles'
import { NewCycleForm } from './components/NewCycleForm/index'
import {
  StartCountdownButton,
  StopCountdownButton,
} from './components/Countdown/styles'
import { Countdown } from './components/Countdown/index'
import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { CyclesContext } from './../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutes: zod.number().min(5, 'O mínimo é 1').max(60, 'O máximo é 60'),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CyclesContext)

  const newCycleFormFunctions = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })
  const { handleSubmit, watch, formState, reset } = newCycleFormFunctions

  // console.log(formState.errors)

  const task = watch('task')
  const minutes = watch('minutes')
  const isSubmitDisabled = !task || !minutes

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleFormFunctions}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {!activeCycle ? (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        ) : (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
