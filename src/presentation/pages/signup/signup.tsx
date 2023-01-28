import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useState } from 'react'
import styles from './signup-styles.scss'

import Context from '@/presentation/contexts/form-context'

export const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })
  return (
    <div className={styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state }}>
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
