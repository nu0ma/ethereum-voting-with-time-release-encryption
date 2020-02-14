import React, { useEffect, useState, useCallback } from 'react';
import { Segment, Header, Message, Button } from 'semantic-ui-react';
import AddressForm from '../Common/AddressForm';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import GetVotingEndSign from '../Common/GetVotingEndSign';
import { useSelector } from 'react-redux';
import { contractSelector } from '../../reducer/reducer';

const web3 = new Web3('ws://localhost:8545');

const Organizer = () => {
  const [account, setAccount] = useState('');
  const [errors, setErrors] = useState([]);

  const contractState = useSelector(contractSelector);

  const setInitialAccount = useCallback(async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    console.log('Your Account : ', account);
  }, [account]);

  useEffect(() => {
    // console.log(contractInstance);
    setInitialAccount();
  }, [setInitialAccount]);

  // 運営者アドレスで実行
  const setVoterAddress = async (voterAddress: string) => {
    try {
      await contractState.currentContract.methods
        .setVoterAddress(voterAddress)
        .send({ from: account });
    } catch (err) {
      setErrors(errors.concat(err));
      console.log(err);
    }
  };

  // 運営者アドレスで実行
  //　使わない
  // const setInspectorAddress = async (inspectorAddress: string) => {
  //   try {
  //     await state.currentContract.methods
  //       .setInspectorAddress(inspectorAddress)
  //       .send({ from: account });
  //   } catch (err) {
  //     setErrors(errors.concat(err));
  //     console.log(err);
  //   }
  // };

  const endVoting = async () => {
    try {
      //TODO: コントラクトのendをtrueにする処理を書く
      await contractState.currentContract.methods
        .endVoting()
        .send({ from: account });
      const result = await contractState.currentContract.methods.getEndSign
        .call()
        .call();
      console.log(result);
      console.log('end');
    } catch (err) {
      setErrors(errors.concat(err));

      console.log(err);
    }
  };

  // const displayErrors = (_errors) => _errors.map((text,i) => <p key={i}>{text}</p>)

  return (
    <Segment.Group className="container">
      <Header>
        Organizer Page
        <GetVotingEndSign />
      </Header>

      <Message className="item">
        <Message.Header>Are you Organizer ?</Message.Header>
        <p>
          If you aren't Organizer, Go to <Link to={'/'}>Voter Page</Link>.
          <br />
          You cannot do anything in this page because your address is not
          Organizer Address.
        </p>
      </Message>

      <Segment className="item">
        <AddressForm role="Voter" setAddress={setVoterAddress} />
      </Segment>

      {/* <Segment>
        <AddressForm role="Inspector" setAddress={setInspectorAddress}/>
      </Segment> */}

      <Segment className="item">
        <Message negative className="end">
          <p className="endMessage">
            If you want to end Voting click this button.
          </p>
          <Button color="red" onClick={endVoting}>
            END VOTE
          </Button>
        </Message>
      </Segment>
      {/* <Message>
        {errors.length > 0 && (
          <Message>
            {displayErrors(errors)}
          </Message>
        )}
      </Message> */}
    </Segment.Group>
  );
};

export default Organizer;
