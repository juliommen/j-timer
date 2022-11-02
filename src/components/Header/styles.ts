import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    border: 1px solid ${(props) => props.theme['gray-600']};
    border-radius: 8px;
    padding: 0.5rem;
    gap: 0.5rem;
    cursor: pointer;

    & > img {
      width: 3rem;
      height: auto;
    }
    & > h1 {
      font-size: 1.25rem;
      font-weight: bold;
      color: ${(props) => props.theme['gray-300']};
    }
  }

  nav {
    display: flex;
    gap: 0.5rem;
    border: 1px solid ${(props) => props.theme['gray-600']};
    border-radius: 8px;
    padding: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${(props) => props.theme['gray-100']};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      border-radius: 2px;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
        border-radius: 2px;
      }
    }
  }
`
