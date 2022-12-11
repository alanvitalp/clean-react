import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState } from 'react'
import styles from './login-styles.scss'

import Context from '@/presentation/contexts/form-context'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

export const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={styles.login}>
      <LoginHeader />

      <Context.Provider value={state}>
        <form className={styles.form}>
          <h2>Login</h2>

          <Input name="email" type="email" placeholder="Digite seu e-mail" />

          <Input name="password" type="password" placeholder="Digite sua senha" />

          <button data-testid="submit" disabled className={styles.submit} type="submit">Entrar</button>

          <span className={styles.link}>Criar conta</span>

          <FormStatus />

        </form>

        <Footer />
      </Context.Provider>

    </div>
  )
}
