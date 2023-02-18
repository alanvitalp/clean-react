import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState, useEffect, useContext } from 'react'
import styles from './signup-styles.scss'

import Context from '@/presentation/contexts/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { SubmitButton } from '@/presentation/components/submit-button/submit-button'
import apiContext from '@/presentation/contexts/api/api-context'

interface SignUpProps {
  validation: Validation
  addAccount: AddAccount
}

export const SignUp: React.FC<SignUpProps> = ({ validation, addAccount }) => {
  const { setCurrentAccount } = useContext(apiContext)
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    isFormInvalid: true,
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)
    setState(old => ({
      ...old,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }

      setState({ ...state, isLoading: true })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

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
    <div className={styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Cadastrar-se</h2>

          <Input name="name" type="text" placeholder="Digite seu nome" />
          <Input name="email" type="email" placeholder="Digite seu e-mail" />
          <Input name="password" type="password" placeholder="Digite sua senha" />
          <Input name="passwordConfirmation" type="password" placeholder="Repita sua senha" />

          <SubmitButton text="Cadastrar" />

          <Link data-testid="login-link" replace to="/login" className={styles.link}>Voltar para Login</Link>

          <FormStatus />

        </form>

        <Footer />
      </Context.Provider>

    </div>
  )
}
