import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Icon, IconName } from '@/presentation/components'
import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar } from '../../../../components/calendar/calendar'

import Styles from './survey-item-styles.scss'

type Props = {
  survey: LoadSurveyList.Model
}

export const SurveyItem: React.FC<Props> = ({ survey }) => {
  const iconName = survey.didAnswer ? IconName.THUMBS_UP : IconName.THUMBS_DOWN
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>
        <Link to={`/surveys/${survey.id}`} data-testid="link">
          Ver resultado
        </Link>
      </footer>
    </li>
  )
}
