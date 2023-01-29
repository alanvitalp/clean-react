import React, { useContext } from 'react'
import styles from './input-styles.scss'
import Context from '@/presentation/contexts/form-context'

type Props = {
  text: string
}

export const SubmitButton: React.FC<Props> = ({ text }) => {
  const { state } = useContext(Context)

  return (
    <button data-testid="submit" disabled={state.isFormInvalid} className={styles.submit} type="submit">{text}</button>
  )
}
