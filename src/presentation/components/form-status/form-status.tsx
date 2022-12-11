import React, { useContext } from 'react'
import styles from './form-status-styles.scss'
import { Spinner } from '../spinner/spinner'
import Context from '@/presentation/contexts/form-context'

export const FormStatus: React.FC = () => {
  const { state } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      { state.isLoading && <Spinner className={styles.spinner} /> }
      { state.mainError && <span className={styles.error}>{state.mainError}</span> }
    </div>
  )
}
