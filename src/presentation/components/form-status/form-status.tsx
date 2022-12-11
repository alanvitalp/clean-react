import React, { useContext } from 'react'
import styles from './form-status-styles.scss'
import { Spinner } from '../spinner/spinner'
import Context from '@/presentation/contexts/form-context'

export const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      { state.isLoading && <Spinner className={styles.spinner} /> }
      { errorState.main && <span className={styles.error}>{errorState.main}</span> }
    </div>
  )
}
