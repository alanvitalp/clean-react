import * as Helper from '../utils/form-helper'

describe('Login', () => {
  it('should logout if survey-list has no token', () => {
    cy.visit('');
    Helper.testUrl('/login');
  });
})