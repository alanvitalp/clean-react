import { mockSurveyModel } from '@/domain/test'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { SurveyItem } from './survey-item'

describe('SurveyItem', () => {
  it('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = true
    survey.date = new Date('2020-01-10T00:00:00')
    render(<SurveyItem survey={survey} />)
    expect(screen.getByTestId('thumbs-up')).toBeInTheDocument()
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
})
