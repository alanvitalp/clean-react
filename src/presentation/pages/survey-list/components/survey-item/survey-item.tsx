import { SurveyModel } from '@/domain/models'
import { Icon, IconName } from '@/presentation/components'
import React from 'react'

import Styles from './survey-item-styles.scss'

type Props = {
  survey: SurveyModel
}

export const SurveyItem: React.FC<Props> = ({ survey }) => {
  const iconName = survey.didAnswer ? IconName.THUMBS_UP : IconName.THUMBS_DOWN
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} />
        <time>
          <span data-testid="day" className={Styles.day}>{survey.date.getDate().toString().padStart(2, '0')}</span>
          <span data-testid="month" className={Styles.month}>{survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}</span>
          <span data-testid="year" className={Styles.year}>{survey.date.getFullYear()}</span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}