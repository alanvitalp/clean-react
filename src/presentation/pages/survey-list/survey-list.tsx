import { Footer } from '@/presentation/components'
import { Header } from '@/presentation/components/header/header'
import { ThumbsDown } from 'phosphor-react'
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
              <div className={[Styles.iconWrap, Styles.green].join(' ')}>
                <ThumbsDown size={24} className={Styles.icon} />
              </div>
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
