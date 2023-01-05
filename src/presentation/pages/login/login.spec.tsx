import React from 'react'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import { Login } from './login'
import { ValidationStub } from '@/presentation/test'

import { faker } from '@faker-js/faker'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Login validation={validationStub} />
  )

  return {
    sut,
    validationStub
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({validationError})
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()

    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

  })

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()

    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should show enable submit button if form is valid', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })


    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(false)
  })

  // test('Should show spinner on submit', () => {
  //   const { sut } = makeSut()
    
  //   const passwordInput = sut.getByTestId('password')
  //   const emailInput = sut.getByTestId('email')

  //   fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
  //   fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

  //   const submitButton = sut.getByTestId('submit')

  //   fireEvent.click(submitButton)

  //   const spinner = sut.getByTestId('spinner')

  //   expect(spinner).toBeTruthy()
  // })

  // test('Should call Authentication with correct values', () => {
  //   const { sut, authenticationSpy } = makeSut()

  //   const passwordInput = sut.getByTestId('password')
  //   const emailInput = sut.getByTestId('email')

  //   const email = faker.internet.password()

  //   fireEvent.input(passwordInput, { target: { value:  email} })

  //   const password = faker.internet.password()

  //   fireEvent.input(emailInput, { target: { value:  password} })

  //   const submitButton = sut.getByTestId('submit')

  //   fireEvent.click(submitButton)

  //   expect(authenticationSpy.params).toEqual({
  //     email,
  //     password
  //   })
  // })
})