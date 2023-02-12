import React from 'react'
import { SurveyContext } from '../contexts/context'

import styles from './error-styles.scss'

export const Error: React.FC = () => {
  const { state } = React.useContext(SurveyContext)
  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">
        {state.error}
      </span>
      <button>Recarregar</button>
    </div>
  )
}
