import { fireEvent, waitFor, screen } from '@testing-library/react'
import { Login } from './login'
import { ValidationStub, AuthenticationSpy, Helper, renderWithHistory } from '@/presentation/test'
import { createMemoryHistory } from 'history'

import { faker } from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'



type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: Authentication.Model) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError

  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => (
      Login({ validation: validationStub, authentication: authenticationSpy })
    ),
  })

  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (email = faker.internet.password(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)

  const form = screen.getByTestId('form')

  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('Should show enable submit button if form is valid', () => {
    makeSut()

    Helper.populateField('email')
    Helper.populateField('password')
    Helper.testButtonIsDisabled('submit', false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()

    const email = faker.internet.password()
    const password = faker.internet.password()

    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })

    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit()

    Helper.testElementText('main-error', error.message)
    Helper.testChildCount('error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', async () => {
    makeSut()
    const register = screen.getByTestId('signup')

    fireEvent.click(register)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
