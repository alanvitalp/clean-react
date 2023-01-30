import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form-context'

type Props = {
  text: string
}

export const SubmitButton: React.FC<Props> = ({ text }) => {
  const { state } = useContext(Context)

  return (
    <button data-testid="submit" disabled={state.isFormInvalid} type="submit">{text}</button>
  )
}
