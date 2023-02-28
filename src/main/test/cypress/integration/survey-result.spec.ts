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
  describe('load', () => {
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
  
    it('Should present surveys result', () => {
      mockSuccess()
      cy.visit('/surveys/any_id')
      cy.getByTestId('question').should('have.text', 'Question 1')
      cy.getByTestId('day').should('have.text', '03')
      cy.getByTestId('month').should('have.text', 'fev')
      cy.getByTestId('year').should('have.text', '2018')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'Answer 1')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
        assert.equal(li.find('[data-testid="percent"]').text(), '100%')
      })
  
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'Answer 2')
        assert.equal(li.find('[data-testid="percent"]').text(), '30%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })
  
    it('Should go to SurveyList on back button click', () => {
      mockSuccess()
      cy.visit('')
      cy.visit('/surveys/any_id')
      cy.getByTestId('back-button').click()
      Helper.testUrl('/')
    })
  })

  describe('save', () => {
    beforeEach(() => {
      cy.fixture('account').then(account => {
        Helper.setLocalStorageItem('account', account)
      })
      mockSuccess()
      cy.visit('/surveys/any_id')
    })

    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.visit('/surveys/any_id')
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    })

    it('Should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.visit('/surveys/any_id')
      cy.get('li:nth-child(2)').click()
      Helper.testUrl('/login')
    })

    it('Should present error on InvalidParamError', () => {
      mockSuccess()
      cy.visit('/surveys/any_id')
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    })

    it('Should present survey result', () => {
      mockSuccess()
      cy.visit('/surveys/any_id')
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('question').should('have.text', 'Question 1')
      cy.getByTestId('day').should('have.text', '03')
      cy.getByTestId('month').should('have.text', 'fev')
      cy.getByTestId('year').should('have.text', '2018')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'Answer 1')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
        assert.equal(li.find('[data-testid="percent"]').text(), '100%')
      })

      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'Answer 2')
        assert.equal(li.find('[data-testid="percent"]').text(), '30%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })

    it('Should go to SurveyList on back button click', () => {
      mockSuccess()
      cy.visit('/surveys/any_id')
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('back-button').click()
      Helper.testUrl('/')
    })
  })
})
