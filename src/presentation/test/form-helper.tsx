import { faker } from '@faker-js/faker'
import { fireEvent, RenderResult, waitFor } from '@testing-library/react'

export const testChildCount = (sut: RenderResult, field: string, count: number): void => {
  const element = sut.getByTestId(field)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError: string = ''): void => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`)
  const field = sut.getByTestId(fieldName)
  const label = sut.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

export const simulateValidSignUp = async (sut: RenderResult, name = faker.name.fullName(), email = faker.internet.email(), password = faker.internet.password(), passwordConfirmation = password): Promise<void> => {
  populateField(sut, 'name', name)
  populateField(sut, 'email', email)
  populateField(sut, 'password', password)
  populateField(sut, 'passwordConfirmation', passwordConfirmation)

  const form = sut.getByTestId('form')

  fireEvent.submit(form)
  await waitFor(() => form)
}

export const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

export const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}
