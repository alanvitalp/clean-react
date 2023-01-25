import React from 'react'
import { render } from '@testing-library/react'

import { Input } from './input'
import FormContext from '@/presentation/contexts/form-context'

describe('Input component', () => {
  test('Should begin with readOnly', () => {
    const { getByTestId } = render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name="field" />
    </FormContext.Provider>
    )
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})