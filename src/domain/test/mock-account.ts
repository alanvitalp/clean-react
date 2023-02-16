import { faker } from '@faker-js/faker'
import { AddAuthentication } from 'domain/usecases/authentication'
import { AccountModel } from '../models'

export const mockAuthentication = (): AddAuthentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.fullName()
})

export const mockAuthenticationModel = (): AddAuthentication.Model => mockAccountModel()
