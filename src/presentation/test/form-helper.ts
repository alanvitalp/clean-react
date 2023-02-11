import { faker } from '@faker-js/faker'
import { fireEvent, screen, waitFor } from '@testing-library/react'

export const testChildCount = (field: string, count: number): void => {
  expect(screen.getByTestId(field).children).toHaveLength(count)
}

export const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  isDisabled ? expect(screen.getByTestId(fieldName)).toBeDisabled() : expect(screen.getByTestId(fieldName)).toBeEnabled()
}

export const testStatusForField = (fieldName: string, validationError: string = ''): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(fieldName)
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field).toHaveProperty('title', validationError)
  expect(label).toHaveProperty('title', validationError)
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

export const simulateValidSignUp = async (name = faker.name.fullName(), email = faker.internet.email(), password = faker.internet.password(), passwordConfirmation = password): Promise<void> => {
  populateField('name', name)
  populateField('email', email)
  populateField('password', password)
  populateField('passwordConfirmation', passwordConfirmation)

  const form = screen.getByTestId('form')

  fireEvent.submit(form)
  await waitFor(() => form)
}

export const testElementExists = (fieldName: string): void => {
  expect(screen.queryByTestId(fieldName)).toBeInTheDocument()
}

export const testElementText = (fieldName: string, text: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}
