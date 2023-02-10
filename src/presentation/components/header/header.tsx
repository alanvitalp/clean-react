import { Logo } from '../logo/logo'
import React, { memo } from 'react'
import Styles from './header-styles.scss'

export const Header: React.FC = memo(() => {
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>John Doe</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  )
})
