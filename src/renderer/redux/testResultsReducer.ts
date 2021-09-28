interface TestState{
  testsResults: boolean[]
}
const initialState={
  testResults: []
}

type Action = {type:"ADD_TESTS", payload: Array<boolean>}

export const testResultsReducer = (state:TestState=initialState, action: Action) => {
  switch(action.type){
    case "ADD_TESTS":
      return {...state, testResults: [...state.testsResults, action.payload]}
    default:
      return state;
  }
}