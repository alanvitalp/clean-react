import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState, useEffect } from 'react'
import styles from './login-styles.scss'

import { Validation } from '@/presentation/protocols/validation'
import Context from '@/presentation/contexts/form-context'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation?: Validation
  authentication?: Authentication
}

export const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState({
      ...state,
      isLoading: true
    })
    authentication.auth({
      email: state.email,
      password: state.password
    })
  }

  return (
    <div className={styles.login}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Login</h2>

          <Input name="email" type="email" placeholder="Digite seu e-mail" />

          <Input name="password" type="password" placeholder="Digite sua senha" />

          <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={styles.submit} type="submit">Entrar</button>

          <span className={styles.link}>Criar conta</span>

          <FormStatus />

        </form>

        <Footer />
      </Context.Provider>

    </div>
  )
}
