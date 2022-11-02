// a extensão d.ts indica que aqui só haverá código typescript propriamente dito
// arquivo criado para adicionar tipagem aos temas criados
import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
