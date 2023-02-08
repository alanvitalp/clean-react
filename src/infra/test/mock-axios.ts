import axios from 'axios'
import { faker } from '@faker-js/faker'

export const mockHttpResponse = (): any => ({
  status: faker.datatype.number(),
  data: faker.datatype.json()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockHttpResponse())
  mockedAxios.get.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
