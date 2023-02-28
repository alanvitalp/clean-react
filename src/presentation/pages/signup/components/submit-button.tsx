import React from 'react'
import { SubmitButtonBase } from '@/presentation/components'
import { signUpState } from './atoms'

import { useRecoilState} from 'recoil'

type Props = {
  text: string
}

export const SubmitButton: React.FC<Props> = ({ text }) => {
  const [state] = useRecoilState(signUpState)

  return (
    <SubmitButtonBase text={text} state={state} />
  )
}
