import { testHttpCallsCount, testInputStatus, testLocalStorageItem, testMainError, testUrl } from '../support/form-helper'
import faker from 'faker'
import { mockEmailInUseError, mockInvalidData, mockOk, mockUnexpectedError } from '../support/signup-mocks'

const populateFields = (): void => {
  const password = faker.random.alphaNumeric(5)
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('name').focus().type(faker.name.findName())
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly')
    testInputStatus('name', 'Campo obrigatório')
    cy.getByTestId('email').should('have.attr', 'readOnly')
    testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    testInputStatus('passwordConfirmation', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('name', 'Valor inválido')
    cy.getByTestId('email').focus().type(faker.random.word())
    testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'Valor inválido')
    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
    testInputStatus('passwordConfirmation', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName())
    testInputStatus('name')

    cy.getByTestId('email').focus().type(faker.internet.email())
    testInputStatus('email')

    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').focus().type(password)
    testInputStatus('password')

    cy.getByTestId('passwordConfirmation').focus().type(password)
    testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUse on 403', () => {
    mockEmailInUseError()
    simulateValidSubmit()

    testMainError('Este email já está em uso')
    testUrl('/signup')
  })

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente em breve.')
    testUrl('/signup')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    mockInvalidData()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente em breve.')
    testUrl('/signup')
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    mockOk()
    simulateValidSubmit()
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    testUrl('/')
    testLocalStorageItem('account')
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
