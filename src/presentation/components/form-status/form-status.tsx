import React from 'react'
import styles from './form-status-styles.scss'
import { Spinner } from '../spinner/spinner'

export const FormStatus: React.FC = () => {
  return (
    <div className={styles.errorWrap}>
      <Spinner className={styles.spinner}/>
      <span className={styles.error}>Erro</span>
    </div>
  )
}
