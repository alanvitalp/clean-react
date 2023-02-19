import { mockSurveyModel } from '@/domain/test'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { SurveyItem } from './survey-item'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem', () => {
  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), { didAnswer: true })
    makeSut(survey)
    expect(screen.getByTestId('thumbs-up')).toBeInTheDocument()
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  it('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), { didAnswer: false })
    makeSut(survey)
    expect(screen.getByTestId('thumbs-down')).toBeInTheDocument()
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
