import React, { useContext } from 'react'
import styles from './input-styles.scss'
import Context from '@/presentation/contexts/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const inputRef = React.useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]

  return (
    <div className={styles.inputWrap}>
      <input ref={inputRef} data-testid={props.name} {...props} placeholder=" " readOnly onFocus={e => { e.target.readOnly = false }} onChange={e => { setState({ ...state, [e.target.name]: e.target.value }) }} />
      <label onClick={() => { inputRef.current.focus() }}>{props.placeholder}</label>
      <span data-testid={`${props.name}-status`} title={error || 'Tudo certo'} className={styles.status}>{error ? '🔴' : '🟢'}</span>
    </div>
  )
}
