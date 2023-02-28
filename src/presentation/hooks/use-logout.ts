import { useHistory } from "react-router-dom"
import React  from 'react'

import { useRecoilValue } from 'recoil'
import { currentAccountState } from "../components"

type ResultType = () => void

export const useLogout = (): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useRecoilValue(currentAccountState)

  const handleLogout = (): void => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return handleLogout
}