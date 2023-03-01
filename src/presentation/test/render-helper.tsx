import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { render } from '@testing-library/react'
import { MemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { RecoilRoot, RecoilState } from 'recoil'
import { currentAccountState } from '../components'

import React from 'react'

type Params = {
  Page: React.FC
  history: MemoryHistory
  account?: AccountModel
  states?: Array<{ atom: RecoilState<any>, value: any }>
}

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void
}

export const renderWithHistory = ({ account = mockAccountModel(), Page, history, states = [] }: Params): Result => {
  const setCurrentAccountMock = jest.fn()
  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account
  }

  const initializeState = ({ set }: any) => {
    [...states, { atom: currentAccountState, value: mockedState }].forEach(state => set(state.atom, state.value))
  }

  render(
    <RecoilRoot initializeState={initializeState}>
      <Router history={history}>
        <Page />
      </Router>
    </RecoilRoot>
  )

  return {
    setCurrentAccountMock
  }
}