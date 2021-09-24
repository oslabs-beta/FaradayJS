import { TEST_REQUEST,TEST_SUCCESS, TEST_FAILURE } from "./constants"

export default testResultsReducer = (state=[], action) => {
  switch(action.type){
    case TEST_REQUEST:
      return {loading:true, results:[]}
    case TEST_SUCCESS:
      return {loading:false, results: action.payload.results}
    case TEST_FAILURE:
      return {loading: false, error: action.payload}
    default:
      return state;
  }
}