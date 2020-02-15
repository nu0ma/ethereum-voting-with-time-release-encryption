import React, { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { rootReducer, RootState } from './reducer/reducer';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import Voting from './contractJson/Voting.json';

import { Provider } from 'react-redux';
import Home from './pages/Home';
import DecryptPage from './pages/DecryptPage';
import OrganizerPage from './pages//OrganizerPage';
import VoterPage from './pages/VoterPage';
import ResultPage from './pages/ResultPage';
import CheckPage from './pages/CheckPage';
import Spinner from './components/Common/Spinner';

import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import * as serviceWorker from './serviceWorker';

const web3 = new Web3('ws://localhost:8545');

const store = createStore(rootReducer, composeWithDevTools());

const contractSelector = (state: RootState) => state.contract;

console.log(store.getState());

const Root = () => {
  const contractState = useSelector(contractSelector);
  const dispatch = useDispatch();
  let history = useHistory();

  const setContract = useCallback(async () => {
    const instance: Contract = new web3.eth.Contract(
      Voting.abi as AbiItem[],
      //  if you use ganache, networkId = 5777
      Voting.networks[5777].address as string,
      {
        from: web3.eth.defaultAccount as string
      }
    );
    console.log('instance', instance);
    dispatch({ type: 'SET_CONTRACT', currentContract: instance });
  }, [dispatch]);

  useMemo(() => {
    setContract();
    history.push('/home');
  }, [history, setContract]);

  return contractState.isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/organizer" component={OrganizerPage} />
      <Route path="/voter" component={VoterPage} />
      <Route path="/result" component={ResultPage} />
      <Route path="/decrypt" component={DecryptPage} />
      <Route path="/check" component={CheckPage} />
    </Switch>
  );
};

const RootWithRouter = withRouter(Root);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithRouter />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
