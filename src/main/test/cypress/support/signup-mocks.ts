import * as Helper from '../support/http-mocks'

export const mockEmailInUseError = (): void => {
  Helper.mockEmailInUseError(/signup/)
}

export const mockUnexpectedError = (): void => {
  cy.intercept('POST', /signup/).as('request')
  Helper.mockUnexpectedError('POST', /signup/)
}
