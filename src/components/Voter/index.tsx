import React, { useEffect, useState, useCallback, FC } from 'react';
import VoteForm from './VoteForm';
import Web3 from 'web3';
import AddressViewer from '../Common/AddressViewer';
import { Segment, Header, Button } from 'semantic-ui-react';
import GetVotingEndSign from '../Common/GetVotingEndSign';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { contractSelector } from '../../reducer/reducer';

const web3 = new Web3('ws://localhost:8545');

const Voter: FC = () => {
  const [vote, showVote] = useState('');
  const [account, setAccount] = useState('');
  const [error, setError] = useState(true);

  const contract = useSelector(contractSelector);

  const history = useHistory();

  // 投票者アドレスでないといけない
  const setVote = useCallback(
    async (vote, rP) => {
      try {
        await contract.currentContract.methods.setVote(vote, rP).send({
          from: account,
          gas: 300000 // change gas
        });
        showVote(vote);
      } catch (err) {
        console.log(err);
        setError(false);
      }
    },
    [account, contract]
  );

  const setInitialAccount = useCallback(async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      console.log('Your Account : ', account);
    } catch (err) {
      console.log(err);
    }
  }, [account]);

  useEffect(() => {
    setInitialAccount();
  }, [setInitialAccount]);

  const toResultPage = () => {
    history.push('/result');
  };
  const toDecryptPage = () => {
    history.push('/decrypt');
  };

  return (
    <div>
      <Header>
        Voter Page <GetVotingEndSign />
      </Header>
      <Segment.Group>
        <Segment>
          <AddressViewer address={account} role="Your" />
        </Segment>
        <Segment>
          <VoteForm address={account} setVote={setVote} error={error} />
        </Segment>
        <Segment>
          <p>Your Encrypted Vote（ IPFS hash）: {vote} </p>
        </Segment>
        <Segment>
          <Button onClick={toResultPage}> Go to Result Page </Button>
        </Segment>
        <Segment>
          <Button onClick={toDecryptPage}> Go to Decrypt Page </Button>
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default Voter;
