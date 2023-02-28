import { InputBase } from '@/presentation/components'
import React from 'react'

import { useRecoilState } from 'recoil'
import { loginState } from './atoms'

type Props = {
  type: string
  name: string
  placeholder: string
}

export const Input: React.FC<Props> = ({
  type,
  name,
  placeholder,
}) => {
  const [state, setState] = useRecoilState(loginState)
  return (
    <InputBase state={state} setState={setState} type={type} name={name} placeholder={placeholder} />
  )
}
