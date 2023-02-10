import { Footer, Icon, IconName } from '@/presentation/components'
import { Header } from '@/presentation/components/header/header'
import React from 'react'
import Styles from './survey-list-styles.scss'

export const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
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
        </ul>
      </div>
      <Footer />
    </div>
  )
}
