import React, { memo } from 'react'
import { Logo } from '../logo/logo'
import styles from './login-header-styles.scss'

const LoginHeaderComponent: React.FC = () => {
  return (
    <header className={styles.headerWrap}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
}

export const LoginHeader = memo(LoginHeaderComponent)
