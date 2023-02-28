import * as Helper from '../utils/form-helper'
import * as Http from '../utils/http-mocks'

const path = /surveys/

export const mockUnexpectedError = (): void => {
  Http.mockServerError('GET', path)
}

export const mockAccessDeniedError = (): void => {
  Http.mockForbiddenError('GET', path)
}

export const mockSuccess = (): void => {
  cy.fixture('survey-result').then(surveyList => {
   Http.mockOk('GET', path, surveyList)
  })
}


describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account)
  })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })

  it('Should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.getByTestId('question').should('exist')
  })
})
