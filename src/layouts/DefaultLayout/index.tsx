import { Header } from '../../components/Header'
import { Outlet } from 'react-router-dom'
import { LayoutContainer } from './styles'

// Definir um layout padrão é útil quando a aplicação tem alguma estrutura padrão para várias páginas.
// Para isso utiliza-se o componente Outlet do React-Router, um 'placeholder', que será substituído pelas páginas de cada rota.
export function DefaulLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}
