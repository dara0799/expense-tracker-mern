//mengambil state dan action dr global state
export default (state, action) => {
    //mengembalikan hasil state dan transaction(dispatch) ke global state
    switch (action.type) {
        case 'GET_TRANSACTIONS':
            return {
              ...state,
              loading: false,
              //payload: data from response in GlobalState
              transactions: action.payload
            }
          case 'DELETE_TRANSACTION':
            return {
              ...state,
              //payload: data from response in GlobalState
              transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
          case 'ADD_TRANSACTION':
            return {
              ...state,
              //payload: data from response in GlobalState
              transactions: [...state.transactions, action.payload]
            }
          case 'TRANSACTION_ERROR':
            return {
              ...state,
              //payload: data from response in GlobalState
              error: action.payload
            }
          default:
            return state;
    }
}