import React, { FC, useEffect, useCallback } from 'react';
import { Message } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { contractSelector } from '../../reducer/reducer';

const GetVotingEndSign: FC = () => {
  const contract = useSelector(contractSelector);
  const dispatch = useDispatch();

  const getEndSign = useCallback(async () => {
    const res = await contract.currentContract.methods.getEndSign.call().call();
    console.log(res);
    console.log(contract.isEnd);
    if (res === true) {
      dispatch({ type: 'SET_ISEND' });
      console.log(contract.isEnd);
    }
  }, [contract.currentContract, contract.isEnd, dispatch]);

  useEffect(() => {
    console.log({ contract });
    if (contract.currentContract === undefined) {
      return;
    } else {
      getEndSign();
    }
  }, [contract, getEndSign]);

  return contract.isEnd ? (
    <Message negative>Voting is End. You can't send any transactions.</Message>
  ) : (
    <></>
  );
};

export default GetVotingEndSign;
