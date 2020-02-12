import { combineReducers } from 'redux';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type State = {
//   currentContract: any;
//   isLoading: boolean;
//   isEnd: boolean;
// };

export type Action =
  | {
      type: 'SET_CONTRACT';
      currentContract: any;
      isLoading: boolean;
      isEnd: boolean;
    }
  | {
      type: 'SET_ISEND';
      isEnd: boolean;
    };

const initialContractState = {
  currentContract: null,
  isLoading: true,
  isEnd: false
};

// const contractModules = createSlice({
//   name: 'contract',
//   initialState: initialContractState,
//   reducers: {
//     setContract: (state: State, action: PayloadAction<any>) => {
//       return {
//         ...state,
//         currentContract: action.payload,
//         isLoading: false,
//         isEnd: false
//       };
//     },
//     endVoting: (state: State) => {
//       return {
//         ...state,
//         isEnd: true
//       };
//     }
//   }
// });

export const contract_reducer = (
  state: State = initialContractState,
  action: Action
) => {
  switch (action.type) {
    case 'SET_CONTRACT':
      return {
        ...state,
        currentContract: action.currentContract,
        isLoading: false,
        isEnd: false
      };
    case 'SET_ISEND':
      return {
        ...state,
        isEnd: true
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  contract: contract_reducer
});

// export default rootReducer;

// export default store;

// const Store = React.createContext(initialState);

// const Provider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
//   );
// };

// export { Store, Provider };
