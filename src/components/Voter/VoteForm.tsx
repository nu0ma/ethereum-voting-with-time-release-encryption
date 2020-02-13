import React, { useState, useEffect, FC } from 'react';
import { Form, Button, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';
import ipfs from '../../utils/ipfs/ipfs';

type VoteFormProps = {
  address: any;
  setVote: any;
  error: any;
};

const VoteForm: FC<VoteFormProps> = ({ setVote, error }) => {
  const [vote, setBallot] = useState('');
  const [load, setLoad] = useState(true);
  const [end, setEnd] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(false);
    // console.log(process.env.REACT_APP_DECRYPTION_TIME);
    const res = await axios.post('http://localhost:5000/encrypt', {
      m: vote,
      time: process.env.REACT_APP_DECRYPTION_TIME
    });
    // resからEnc(m)とrPを取り出す
    const Enc = 'Enc' + res.data.Enc; // ipfsでは数値のみの文字列がintとして認識されるのでprefixをつけている
    const rP = res.data.rP;

    // ipfsに送信するためのcontent作成
    const content_Enc = ipfs.Buffer.from(Enc);
    const content_rP = ipfs.Buffer.from(rP);
    // console.log('contents:', content_Enc, content_rP);

    // add
    const results_Enc = await ipfs.add(content_Enc);
    const results_rP = await ipfs.add(content_rP);
    // console.log('add', results_Enc, results_rP);

    // hashを取得
    const Enc_hash = await results_Enc[0].hash;
    const rP_hash = await results_rP[0].hash;

    // ipfsのハッシュ値をチェーンに記録
    try {
      await setVote(Enc_hash, rP_hash);
      setEnd(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBallot(e.target.value);
  };

  const handleError = (endsign: boolean, err: boolean) => {
    if (endsign === true && err === true)
      return <Message positive> End </Message>;
    if (err === false) return <Message negative> Error</Message>;
    return <></>;
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label> VoteForm </label>
            <input
              placeholder="Input candicate name"
              value={vote}
              onChange={handleChange}
            />
          </Form.Field>
          <Button type="submit"> Submit </Button>
        </Form>
        <Segment> Your Vote: {vote} </Segment>
        {load ? <> </> : <Message as="h3">Uploading...</Message>}
        <div>{handleError(end, error)}</div>
      </div>
    </>
  );
};

export default VoteForm;
