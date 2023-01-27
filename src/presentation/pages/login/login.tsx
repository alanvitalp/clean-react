import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState, useEffect } from 'react'
import styles from './login-styles.scss'

import { Validation } from '@/presentation/protocols/validation'
import Context from '@/presentation/contexts/form-context'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation?: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

export const Login: React.FC<Props> = ({ saveAccessToken, validation, authentication }: Props) => {
  const history = useHistory()
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

    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }

      setState({
        ...state,
        isLoading: true
      })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={styles.login}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" onSubmit={handleSubmit} className={styles.form}>
          <h2>Login</h2>

          <Input name="email" type="email" placeholder="Digite seu e-mail" />

          <Input name="password" type="password" placeholder="Digite sua senha" />

          <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={styles.submit} type="submit">Entrar</button>

          <Link to="/signup" data-testid="signup" className={styles.link}>Criar conta</Link>

          <FormStatus />

        </form>

        <Footer />
      </Context.Provider>

    </div>
  )
}
