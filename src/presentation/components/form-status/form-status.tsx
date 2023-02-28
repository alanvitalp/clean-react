import React, { useContext } from 'react'
import styles from './form-status-styles.scss'
import { Spinner } from '../spinner/spinner'
import Context from '@/presentation/contexts/form-context'

type Props = {
  state: any
}

export const FormStatusBase: React.FC<Props> = ({ state }) => {
  const { isLoading, mainError } = state

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      { isLoading && <Spinner className={styles.spinner} /> }
      { mainError && <span data-testid="main-error" className={styles.error}>{mainError}</span> }
    </div>
  )
}
