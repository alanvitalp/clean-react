import { faker } from '@faker-js/faker'
import { AddAccount } from '../usecases'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()

  return {
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
    name: faker.name.fullName()
  }
}
