import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'

import { InputBase } from './input'
import { faker } from '@faker-js/faker'

const makeSut = (fieldName: string): RenderResult => {
  return render(
      <InputBase name={fieldName} state={{}} setState={null} />
  )
}

describe('Input component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.random.word()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const field = faker.random.word()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })

  test('Should focus input on label click', () => {
    const field = faker.random.word()
    const sut = makeSut(field)
    const input = sut.getByTestId(field)
    const label = sut.getByTestId(`${field}-label`)
    fireEvent.click(label)
    fireEvent.focus(input)
    expect(document.activeElement).toBe(input)
  })
})
