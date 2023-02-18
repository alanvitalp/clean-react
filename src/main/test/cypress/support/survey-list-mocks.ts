import * as Helper from '../support/http-mocks'

export const mockUnexpectedError = (): void => {
  Helper.mockServerError('GET', /survey/)
}

export const mockAccessDeniedError = (): void => {
  Helper.mockForbiddenError('GET', /survey/)
}

