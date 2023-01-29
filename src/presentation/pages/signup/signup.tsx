import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState, useEffect } from 'react'
import styles from './signup-styles.scss'

import Context from '@/presentation/contexts/form-context'
import { Validation } from '@/presentation/protocols/validation'

interface SignUpProps {
  validation: Validation
}

export const SignUp: React.FC<SignUpProps> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState({ ...state, isLoading: true })
  }

  return (
    <div className={styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Cadastrar-se</h2>

          <Input name="name" type="text" placeholder="Digite seu nome" />
          <Input name="email" type="email" placeholder="Digite seu e-mail" />
          <Input name="password" type="password" placeholder="Digite sua senha" />
          <Input name="passwordConfirmation" type="password" placeholder="Repita sua senha" />

          <button data-testid="submit" disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError} className={styles.submit} type="submit">Cadastrar</button>

          <span className={styles.link}>Voltar para Login</span>

          <FormStatus />

        </form>

        <Footer />
      </Context.Provider>

    </div>
  )
}
