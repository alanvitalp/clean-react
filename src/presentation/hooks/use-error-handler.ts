import { AccessDeniedError } from "@/domain/errors"
import { useLogout } from "./use-logout"

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: ResultType): ResultType => {
  const logout = useLogout()

  const handleError = (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logout()
    } else {
      callback(error)
    }
  }

  return handleError
}