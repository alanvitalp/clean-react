import { faker } from '@faker-js/faker'
import { SurveyModel } from '../models'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.lorem.sentence(),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.lorem.sentence()
  },
  {
    answer: faker.lorem.sentence()
  }]
})

export const mockSurveyListModel = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])
