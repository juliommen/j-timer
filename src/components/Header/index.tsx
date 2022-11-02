import { HeaderContainer } from './styles'
import logo from '../../assets/logo.png'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

// O componente NavLink, do React-Router-Dom é uma 'anchor' que faz o direcionamento para as rotas definidas em Router.
// Quando o usuário clica numa 'anchor', uma classe 'active' é adicionada a ela.
// O atributo 'end' é para que a classe 'active' saia do primeiro NavLink, quando o usuário clica no segundo NavLink.
// Isso ocorre pois o router entender o caminho '/' como genérico.
export function Header() {
  return (
    <HeaderContainer>
      <div>
        <img src={logo} alt="" />
        <h1>J-Timer</h1>
      </div>
      <nav>
        <NavLink to="/" end title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
