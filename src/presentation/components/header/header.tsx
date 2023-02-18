import { Logo } from '../logo/logo'
import React, { memo, useContext } from 'react'
import Styles from './header-styles.scss'
import { ApiContext } from '@/presentation/contexts'
import { useHistory } from 'react-router-dom'

export const Header: React.FC = memo(() => {
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()

    setCurrentAccount(undefined)

    history.replace('/login')
  }


  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" onClick={logout} href="#">Sair</a>
        </div>
      </div>
    </header>
  )
})
