import React, { useContext } from 'react'
import styles from './input-styles.scss'
import Context from '@/presentation/contexts/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const inputRef = React.useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]

  return (
    <div data-testid={`${props.name}-wrap`} className={styles.inputWrap} data-status={error ? 'invalid' : 'valid'}>
      <input title={error} ref={inputRef} data-testid={props.name} {...props} placeholder=" " readOnly onFocus={e => { e.target.readOnly = false }} onChange={e => { setState({ ...state, [e.target.name]: e.target.value }) }} />
      <label data-testid={`${props.name}-label`} title={error} onClick={() => { inputRef.current.focus() }}>{props.placeholder}</label>
    </div>
  )
}
