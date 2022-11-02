// @hookform/resolvers é uma biblio que permite integrar biblios de validação,
// como a Zod (ou Joi, ou Yup) ao Hook Form. Foi escolhida a Zod, pois há integração com o Typescript.
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// Hook Form é uma biblio de funcionalidades que podem ser
// 'enganxadas' aos forms para facilitar o trabalho com eles
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

// Método convencional de tipagem dos dados do formulário. Está correta, contudo Zod pode fazê-lo já a partir do schema.
// interface newCycleFormData {
//  task: string
//  minutes: number
// }

// Criação do objeto com o esquema de validação do formulário, usando a Zod
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutes: zod.number().min(5, 'O mínimo é 1').max(60, 'O máximo é 60'),
})

// Método de tipagem a partir da Zod.
type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CyclesContext)

  // O useForm do Hook Form retorna métodos úteis para forms
  // O 'resolver' com o zodResolver é usado para passar o esquema de validação para o form
  const newCycleFormFunctions = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })
  const { handleSubmit, watch, formState, reset } = newCycleFormFunctions

  // formState.errors é um objeto onde são guardados os erros de validação
  // console.log(formState.errors)

  // O método watch do Hook Form observa mudanças nos inputs em tempo real
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
        {/* o FormProvider do Form Hook pode ser usado para disponibilizar as variáveis do useForm */}
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
