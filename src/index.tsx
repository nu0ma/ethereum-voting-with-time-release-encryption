import React, {
  useEffect,
  useContext,
  useCallback,
  useState,
  useMemo
} from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import './index.css';

import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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
// import web3 from './utils/web3/web3';

import Web3 from 'web3';

// import { rootReducer } from './reducer/reducer';
// import { setupStore } from './reducer/store';

// import contractModules from './reducer/reducer';

import { AbiItem } from 'web3-utils';

import { rootReducer } from './reducer/reducer';

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// const store = setupStore();

// declare const Voting: any;

// const web3: any = web3;

// const web3 = require('./utils/web3/web3');

const web3 = new Web3('ws://localhost:8545');
const store = createStore(rootReducer, composeWithDevTools());

// const abi = 'test';
// const abi: AbiItem[] = Voting.abi;

const contractSelector = (state: State) => state.currentContract;

const Root = () => {
  // const [c, setC] = useState<any>(null);
  const contract = useSelector(contractSelector);
  const dispatch = useDispatch();

  const setContract = useCallback(async () => {
    const instance = new web3.eth.Contract(
      Voting.abi as AbiItem[],
      web3.eth.defaultAccount as string,
      {
        from: web3.eth.defaultAccount as string
      }
    );
    console.log('instance', instance);
    dispatch({ type: 'SET_CONTRACT', currentContract: instance });
    console.log(contract);
    // setC(instance);
  }, [contract, dispatch]);

  // useEffect(() => {
  //   setContract();
  //   // props.history.push('/home');
  //   console.log(web3);
  //   // console.log(c);
  //   // console.log(contract);
  //   // console.log(instance);
  // }, [setContract]);
  useMemo(async () => {
    setContract();
  }, [setContract]);

  return contract ? (
    <Spinner />
  ) : (
    <Switch>
      <Route path="/home" component={Home} />{' '}
      <Route path="/organizer" component={OrganizerPage} />{' '}
      <Route exact path="/" component={VoterPage} />{' '}
      <Route path="/result" component={ResultPage} />{' '}
      <Route path="/decrypt" component={DecryptPage} />{' '}
      <Route path="/check" component={CheckPage} />{' '}
      {/* <Redirect path="/home"/> */}{' '}
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
