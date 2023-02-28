import { SurveyResultAnswerModel, SurveyResultModel } from '@/domain/models'
import React from 'react'


import styles from './answer-styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

export const Answer = ({ answer }: Props) => {
  const activeClassName = answer.isCurrentAccountAnswer ? styles.active : ''
  return (
    <li
      data-testid="answer-wrap"
      className={[styles.answerWrap, activeClassName].join(' ')}
    >
      { answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} /> }
      <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
    </li>
  )
}
