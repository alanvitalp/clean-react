import React from 'react'

import styles from './error-styles.scss'

type Props = { 
  error: string
  reload: () => void
}

export const Error: React.FC<Props> = ({ error, reload }) => {
  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">
        {error}
      </span>
      <button onClick={reload} data-testid="reload">Tentar novamente</button>
    </div>
  )
}
