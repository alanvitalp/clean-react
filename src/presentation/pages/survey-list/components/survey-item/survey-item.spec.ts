import { mockSurveyModel } from '@/domain/test'
import { fireEvent, screen } from '@testing-library/react'
import { SurveyItem } from './survey-item'
import { createMemoryHistory, MemoryHistory } from 'history'
import { renderWithHistory } from '@/presentation/test'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  renderWithHistory({
    history,
    Page: () => SurveyItem({ survey })
  })

  return {
    history
  }
}

describe('SurveyItem', () => {
  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), { didAnswer: true, date: new Date('2020-01-10T00:00:00') })
    makeSut(survey)
    expect(screen.getByTestId('thumbs-up')).toBeInTheDocument()
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), { didAnswer: false, date: new Date('2019-05-03T00:00:00') })
    makeSut(survey)
    expect(screen.getByTestId('thumbs-down')).toBeInTheDocument()
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })

  it('Should go to SurveyResult', () => {
    const survey = mockSurveyModel()
    const { history } = makeSut(survey)
    fireEvent.click(screen.getByTestId('link'))
    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
