import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from './survey-list'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { mockAccountModel, mockSurveyListModel } from '@/domain/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import ApiContext from '@/presentation/contexts/api/api-context'
import { Router } from 'react-router-dom'

import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'

import { RecoilRoot } from 'recoil'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    this.callsCount++
    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/login'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <RecoilRoot>
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
        <Router history={createMemoryHistory()}>
          <SurveyList loadSurveyList={loadSurveyListSpy} />
        </Router>
      </ApiContext.Provider>
    </RecoilRoot>
  )
  return {
    loadSurveyListSpy,
    history,
    setCurrentAccountMock
  }
}
describe('SurveyList component', () => {
  it('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  it('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  it('Should render SurveyItems on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  it('Should render error on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)
  })

  it('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).toHaveTextContent(error.message)

    fireEvent.click(screen.getByTestId('reload'))
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))

    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  it('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())

    const { history, setCurrentAccountMock } = makeSut(loadSurveyListSpy)

    await waitFor(() => screen.getByRole('heading'))
    
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
