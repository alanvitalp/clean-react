import React from 'react'
import { SurveyContext } from '../contexts/context'

import styles from './error-styles.scss'

export const Error: React.FC = () => {
  const { state, setState } = React.useContext(SurveyContext)

  const reload = (): void => {
    setState({
      surveys: [],
      error: '',
      reload: !state.reload
    })
  }

  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">
        {state.error}
      </span>
      <button onClick={reload} data-testid="reload">Tentar novamente</button>
    </div>
  )
}
