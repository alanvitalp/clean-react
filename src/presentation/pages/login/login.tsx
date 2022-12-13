import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState, useEffect } from 'react'
import styles from './login-styles.scss'

import { Validation } from '@/presentation/protocols/validation'
import Context from '@/presentation/contexts/form-context'

type Props = {
  validation?: Validation
}

export const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    validation.validate('email', state.email)
  }, [state.email])

  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])

  return (
    <div className={styles.login}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
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
