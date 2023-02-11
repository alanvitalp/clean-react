import { Icon, IconName } from '@/presentation/components'
import React from 'react'

import Styles from './survey-item-styles.scss'

export const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={IconName.THUMBS_DOWN} />
        <time>
          <span className={Styles.day}>08</span>
          <span className={Styles.month}>02</span>
          <span className={Styles.year}>2023</span>
        </time>
        <p>Qual o seu framework favorito?</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  )
}
