import React, { useContext } from 'react'
import styles from './form-status-styles.scss'
import { Spinner } from '../spinner/spinner'
import Context from '@/presentation/contexts/form-context'

export const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = state

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      { isLoading && <Spinner className={styles.spinner} /> }
      { mainError && <span data-testid='main-error' className={styles.error}>{state.mainError}</span> }
    </div>
  )
}
