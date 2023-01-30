import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation-build'

export const makeSignUpValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').required().minLength(5).build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build(),
    ...ValidationBuilder.field('passwordConfirmation').required().minLength(5).build()
  ])
}
