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
    nameError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name)
    })
  }, [state.name])

  return (
    <div className={styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form className={styles.form}>
          <h2>Cadastrar-se</h2>

          <Input name="name" type="text" placeholder="Digite seu nome" />
          <Input name="email" type="email" placeholder="Digite seu e-mail" />
          <Input name="password" type="password" placeholder="Digite sua senha" />
          <Input name="passwordConfirmation" type="password" placeholder="Repita sua senha" />

          <button data-testid="submit" disabled className={styles.submit} type="submit">Cadastrar</button>

          <span className={styles.link}>Voltar para Login</span>

          <FormStatus />

        </form>

        <Footer />
      </Context.Provider>

    </div>
  )
}
