export interface LoadSurveyResult  {
  load: () => Promise<LoadSurveyList.Model>
}

export namespace LoadSurveyList {
  export type Model = {
    question: string
    date: Date
    answers: [{
      image?: string
      answer: string
      count: number
      percent: number
    }]
  }
}