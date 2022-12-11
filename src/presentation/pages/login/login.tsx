import { Footer } from '@/presentation/components/footer/footer'
import { LoginHeader } from '@/presentation/components/login-header/login-header'
import { Spinner } from '@/presentation/components/spinner/spinner'
import React from 'react'
import styles from './login-styles.scss'

export const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />

      <form className={styles.form}>
        <h2>Login</h2>

        <div className={styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={styles.status}>🔴</span>
        </div>

        <div className={styles.inputWrap}>
          <input type="password" name="password" placeholder="Digite sua senha" />
          <span className={styles.status}>🔴</span>
        </div>

        <button className={styles.submit} type="submit">Entrar</button>

        <span className={styles.link}>Criar conta</span>

        <div className={styles.errorWrap}>
          <Spinner className={styles.spinner}/>
          <span className={styles.error}>Erro</span>
        </div>

      </form>

      <Footer />
    </div>
  )
}
