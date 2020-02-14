import React, { useContext, useEffect, useState, useCallback } from 'react';
import Web3 from 'web3';
// import { Store } from '../../reducers/store';
import VoteList from './VoteList';
import { Segment, Button, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { contractSelector } from '../../reducer/reducer';

const web3 = new Web3('ws://localhost:8545');

const Result = () => {
  // const { state } = useContext(Store);

  const ContractState = useSelector(contractSelector);

  const [result, setResult] = useState([]);

  const viewResult = useCallback(async () => {
    try {
      const result = await ContractState.currentContract.methods.viewResult
        .call()
        .call();
      setResult(result);
      // console.log('Voting result', result);
      // console.log('Result button clicked');
    } catch (err) {
      console.log(err);
    }
  }, [ContractState.currentContract.methods.viewResult]);

  useEffect(() => {
    setInitialAccount();
    viewResult();
  }, [viewResult]);

  const setInitialAccount = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Result Page</h1>
      {/* <Button onClick={viewResult}>View Result</Button> */}
      <Segment.Group>
        <VoteList result={result} />
      </Segment.Group>
    </div>
  );
};

export default Result;
