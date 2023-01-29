import { RenderResult } from '@testing-library/react'

export const testChildCount = (sut: RenderResult, field: string, count: number): void => {
  const element = sut.getByTestId(field)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatusDiv = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatusDiv.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatusDiv.textContent).toBe(validationError ? '🔴' : '🟢')
}
