import { useHistory } from "react-router-dom"
import { ApiContext } from "../contexts"
import React, { useContext } from 'react'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  const handleLogout = (): void => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return handleLogout
}