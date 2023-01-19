import { EmailValidation } from "../email/email-validation"
import { MinLengthValidation } from "../min-length/min-length-validation"
import { RequiredFieldValidation } from "../required-field/required-field-validation"
import { ValidationBuilder as sut } from "./validation-build"

describe('ValidationBuilder', () => {
  test('Should return RequitedFieldValidation', () => {
    const validations = sut.field('any_field').required().build()

    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Should return EmailValidation', () => {
    const validations = sut.field('any_field').email().build()

    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  test('Should return MinLengthValidation', () => {
    const validations = sut.field('any_field').minLength(5).build()

    expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
  })
})