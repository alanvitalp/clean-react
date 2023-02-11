import { ThumbsDown, ThumbsUp } from 'phosphor-react'
import React from 'react'
import Styles from './icon-styles.scss'

export enum IconName {
  THUMBS_DOWN = 'thumbs-down',
  THUMBS_UP = 'thumbs-up'
}

type Props = {
  iconName: IconName
  className?: string
}

export const Icon: React.FC<Props> = ({ iconName, className }: Props) => {
  const iconColor = iconName === IconName.THUMBS_DOWN ? Styles.red : Styles.green
  return (
    <div className={[Styles.iconWrap, iconColor, className].join(' ')}>
      {
        iconName === IconName.THUMBS_DOWN
          ? <ThumbsDown data-testid="thumbs-down" size={24} weight="fill" />
          : <ThumbsUp data-testid="thumbs-up" size={24} weight="fill" />
      }
    </div>
  )
}
