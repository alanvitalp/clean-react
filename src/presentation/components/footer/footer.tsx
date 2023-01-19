import React, { memo } from 'react'
import styles from './footer-styles.scss'

const FooterComponent: React.FC = () => {
  return (
    <footer className={styles.footer}>
    </footer>
  )
}

export const Footer = memo(FooterComponent)
