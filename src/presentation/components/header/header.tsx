import { Logo } from '../logo/logo'
import React, { memo } from 'react'
import Styles from './header-styles.scss'
import { useLogout } from '@/presentation/hooks'

import { useRecoilValue } from 'recoil'
import { currentAccountState } from '../atoms/atoms'

export const Header: React.FC = memo(() => {
  const logout = useLogout()

  const { getCurrentAccount } = useRecoilValue(currentAccountState)

  const buttonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" onClick={buttonClick} href="#">Sair</a>
        </div>
      </div>
    </header>
  )
})
