import { RequiredFieldValidation } from "../required-field/required-field-validation"
import { ValidationBuilder as sut } from "./validation-build"

describe('ValidationBuilder', () => {
  test('Should return RequitedFieldValidation', () => {
    const validations = sut.field('any_field').required().build()

    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})