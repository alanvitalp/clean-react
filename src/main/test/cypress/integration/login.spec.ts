import faker from 'faker'
import { testHttpCallsCount, testInputStatus, testMainError, testUrl } from '../support/form-helper'
import { mockInvalidCredentialsError, mockInvalidData, mockOk, mockUnexpectedError } from '../support/login-mocks'

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('submit').click()
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    testInputStatus('email', 'Campo obrigatório')
    testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    testInputStatus('email')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()

    testMainError('Credenciais inválidas')

    testUrl('/login')
  })

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente em breve.')
    testUrl('/login')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    mockInvalidData()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente em breve.')
    testUrl('/login')
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    mockOk()
    simulateValidSubmit()
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    testUrl('/')
  })

  it('Should prevent multiple submits', () => {
    mockOk()
    populateFields()
    cy.getByTestId('submit').dblclick()
    testHttpCallsCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    testHttpCallsCount(0)
  })
})
