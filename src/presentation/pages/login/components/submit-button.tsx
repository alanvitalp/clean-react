import React from 'react'
import { SubmitButtonBase } from '@/presentation/components'
import { loginState } from './atoms'

import { useRecoilState} from 'recoil'

type Props = {
  text: string
}

export const SubmitButton: React.FC<Props> = ({ text }) => {
  const [state] = useRecoilState(loginState)

  return (
    <SubmitButtonBase text={text} state={state} />
  )
}
