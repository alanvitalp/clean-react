import faker from 'faker'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept({
    method: 'POST',
    url
  }, {
    statusCode: 401,
    body: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockUnexpectedError = (method: string, url: RegExp): void => {
  cy.intercept({
    method,
    url
  }, {
    statusCode: faker.helpers.randomize([404, 404, 500]),
    body: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockOk = (method: string, url: RegExp, response: any): void => {
  cy.intercept({
    method,
    url
  }, {
    statusCode: 200,
    body: response
  }).as('request')
}
