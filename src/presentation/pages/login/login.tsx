import { currentAccountState, Footer, LoginHeader } from '@/presentation/components'
import React, { useEffect } from 'react'
import styles from './login-styles.scss'

import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import { FormStatus, Input, loginState } from './components'

import { useRecoilState, useRecoilValue } from 'recoil'
import { SubmitButton } from './components/submit-button'

type Props = {
  validation?: Validation
  authentication: Authentication
}

export const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const history = useHistory()
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(old => ({ ...old, isLoading: true }))
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={styles.login}>
      <LoginHeader />
        <form data-testid="form" onSubmit={handleSubmit} className={styles.form}>
          <h2>Login</h2>

          <Input name="email" type="email" placeholder="Digite seu e-mail" />

          <Input name="password" type="password" placeholder="Digite sua senha" />

          <SubmitButton text="Entrar" />

          <Link to="/signup" data-testid="signup" className={styles.link}>Criar conta</Link>

          <FormStatus />

        </form>

        <Footer />
    </div>
  )
}
