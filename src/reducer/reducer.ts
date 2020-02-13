import { combineReducers } from 'redux';

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

// TODO: rootReducerの型を書く必要がある

export const contractSelector = (state: any) => state.contract;

export const rootReducer = combineReducers({
  contract: contract_reducer
});
