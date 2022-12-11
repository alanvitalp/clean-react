import React, { memo } from 'react'
import styles from './footer-styles.scss'

const FooterComponent: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <h1>hello</h1>
    </footer>
  )
}

export const Footer = memo(FooterComponent)
