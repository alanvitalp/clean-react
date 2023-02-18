import * as Helper from '../support/http-mocks'
import faker from 'faker'

export const mockInvalidCredentialsError = (): void => {
  cy.intercept('POST', /login/).as('request')
  Helper.mockInvalidCredentialsError(/login/)
}

export const mockUnexpectedError = (): void => {
  cy.intercept('POST', /login/).as('request')
  Helper.mockUnexpectedError('POST', /login/)
}

export const mockOk = (): void => {
  cy.intercept('POST', /login/).as('request')
  Helper.mockOk('POST', /login/, {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  })
}


