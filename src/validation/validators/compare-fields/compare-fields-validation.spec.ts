import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('RequiredFieldValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return salsy if compare is valid', () => {
    const valueToCompare = faker.random.word()
    const sut = makeSut(valueToCompare)
    const error = sut.validate(valueToCompare)
    expect(error).toBeFalsy()
  })
})
