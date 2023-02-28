import { faker } from '@faker-js/faker'
import { Authentication } from 'domain/usecases/authentication'
import { AccountModel } from '../models'

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.fullName()
})

export const mockAuthenticationModel = (): Authentication.Model => mockAccountModel()
