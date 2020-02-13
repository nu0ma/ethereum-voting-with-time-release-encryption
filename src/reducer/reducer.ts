import { combineReducers } from 'redux';
import { Contract } from 'web3-eth-contract';

// type State = {
//   currentContract: any;
//   isLoading: boolean;
//   isEnd: boolean;
// };

export type Action =
  | {
      type: 'SET_CONTRACT';
      currentContract: Contract;
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

export const contractSelector = (state: RootState) => state.contract;

export const rootReducer = combineReducers({
  contract: contract_reducer
});

export type RootState = ReturnType<typeof rootReducer>;
