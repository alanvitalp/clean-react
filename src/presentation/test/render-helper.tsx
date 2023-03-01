import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { render } from '@testing-library/react'
import { MemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { RecoilRoot } from 'recoil'
import { currentAccountState } from '../components'

import React from 'react'

type Params = {
  Page: React.FC
  history: MemoryHistory
  account?: AccountModel
}

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void
}

export const renderWithHistory = ({ account = mockAccountModel(), Page, history }: Params): Result => {
  const setCurrentAccountMock = jest.fn()
  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account
  }

  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router history={history}>
        <Page />
      </Router>
    </RecoilRoot>
  )

  return {
    setCurrentAccountMock
  }
}