import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState, useEffect, useContext } from 'react'
import styles from './login-styles.scss'

import { Validation } from '@/presentation/protocols/validation'
import Context from '@/presentation/contexts/form-context'
import { Authentication } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import { SubmitButton } from '@/presentation/components/submit-button/submit-button'
import apiContext from '@/presentation/contexts/api/api-context'

type Props = {
  validation?: Validation
  authentication: Authentication
}

export const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(apiContext)
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    setState(old => ({
      ...old,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    }))
  }, [state.email, state.password])


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
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

      console.log(account)

      setCurrentAccount(account)
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

          <SubmitButton text="Entrar" />

          <Link to="/signup" data-testid="signup" className={styles.link}>Criar conta</Link>

          <FormStatus />

        </form>

        <Footer />
      </Context.Provider>

    </div>
  )
}
