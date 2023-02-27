import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components'
import React from 'react'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router-dom'
import { Answer } from '../answer/answer'

import styles from './result-styles.scss'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

export const Result = ({ surveyResult }: Props) => {
  const { goBack } = useHistory()
  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={styles.answerList}>
        <>
          {surveyResult.answers.map(answer => (
            <Answer key={answer.answer} answer={answer} />
          ))}
        </>
      </FlipMove>
      <button className={styles.button} onClick={goBack} data-testid="back-button">Voltar</button>
    </>
  )
}
