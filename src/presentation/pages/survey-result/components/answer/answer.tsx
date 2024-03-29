import { SurveyResultAnswerModel } from '@/domain/models'
import React from 'react'

import { useRecoilValue } from 'recoil'

import styles from './answer-styles.scss'
import { onSurveyAnswerState } from '../atoms/atoms'

type Props = {
  answer: SurveyResultAnswerModel
}

export const Answer = ({ answer }: Props) => {
  const activeClassName = answer.isCurrentAccountAnswer ? styles.active : ''
  const { onAnswer } = useRecoilValue(onSurveyAnswerState)
  
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
