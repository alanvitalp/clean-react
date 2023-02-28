import { SurveyResultAnswerModel, SurveyResultModel } from '@/domain/models'
import React, { useContext } from 'react'
import { SurveyResultContext } from '..'


import styles from './answer-styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

export const Answer = ({ answer }: Props) => {
  const activeClassName = answer.isCurrentAccountAnswer ? styles.active : ''
  const { onAnswer } = useContext(SurveyResultContext)
  
  const answerClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    if (event.currentTarget.classList.contains(styles.active)) {
      return
    } else {
      onAnswer(answer.answer)
    }
  }

  return (
    <li
      data-testid="answer-wrap"
      className={[styles.answerWrap, activeClassName].join(' ')}
      onClick={answerClick}
    >
      { answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} /> }
      <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
    </li>
  )
}
