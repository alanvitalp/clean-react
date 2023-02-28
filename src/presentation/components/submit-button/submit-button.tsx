import React from 'react'

type Props = {
  text: string
  state: any
}

export const SubmitButtonBase: React.FC<Props> = ({ text, state }) => {
  return (
    <button data-testid="submit" disabled={state.isFormInvalid} type="submit">{text}</button>
  )
}
