import { faker } from '@faker-js/faker'
import { SurveyModel } from '../models'
import { LoadSurveyList } from '../usecases/load-survey-list'

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.lorem.sentence(),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent(),
})

export const mockSurveyListModel = (): LoadSurveyList.Model[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])
