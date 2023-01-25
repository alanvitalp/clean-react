import React from 'react'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation-build'
import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory'

import { Login } from '@/presentation/pages/login/login'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />
  )
}