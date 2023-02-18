import { AccessDeniedError } from "@/domain/errors"
import { useHistory } from "react-router-dom"
import { ApiContext } from "../contexts"
import React, { useContext } from 'react'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: ResultType): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  const handleError = (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      history.replace('/login')
    } else {
      callback(error)
    }
  }

  return handleError
}