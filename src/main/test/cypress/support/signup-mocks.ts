import * as Helper from '../support/http-mocks'
import faker from 'faker'

export const mockEmailInUseError = (): void => {
  Helper.mockEmailInUseError(/signup/)
}

export const mockUnexpectedError = (): void => {
  cy.intercept('POST', /signup/).as('request')
  Helper.mockUnexpectedError('POST', /signup/)
}

export const mockOk = (): void => {
  cy.intercept('POST', /signup/).as('request')
  Helper.mockOk('POST', /signup/, {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  })
}
