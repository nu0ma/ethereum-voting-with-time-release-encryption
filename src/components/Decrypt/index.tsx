import React, { useState, useEffect } from 'react';
import { Form, Button, Message, Segment, Header } from 'semantic-ui-react';
import axios from 'axios';

const Decrypt = () => {
  const [enc, setEnc] = useState('');
  const [rP, setrP] = useState('');
  const [decrpytedVote, setdecrpytedVote] = useState('');
  const [timeKey, setTimekey] = useState('');
  const [load, setLoad] = useState(true);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    getTimekey();
  }, []);

  const getTimekey = async () => {
    const res = await axios.get(
      `http://localhost:5000/timeserver/${process.env.REACT_APP_DECRYPTION_TIME}`
    );
    // console.log(res.data.sHT0)
    setTimekey(res.data.sHT0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(false);

    // ipfsからデータを取ってくる
    const enc_res = await axios.get(`https://ipfs.io/ipfs/${enc}`); // QmTZQt72cLAWur8KMVKhD4k1UVgvNLoZcFgSgbpXM4SSVN
    const rP_res = await axios.get(`https://ipfs.io/ipfs/${rP}`); // QmZYLgyitYrFjiD73iwj4vDidMxgoNc4Emzh1ftFNWvc8N
    console.log(enc_res.data);
    console.log(rP_res.data);
    // console.log(enc_res.data.slice(3))
    // console.log(timeKey)

    const res = await axios.post('http://localhost:5000/decrypt', {
      Enc: enc_res.data.slice(3), // ipfsでは数値のみの文字列がintとして認識されるので付けた"Enc"を削除
      rP: rP_res.data,
      sHT0: timeKey
    });
    // console.log(res.data)
    setEnd(true);
    console.log('sHT0', res.data.sHT0);

    await setdecrpytedVote(res.data);
  };

  const handleEncChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnc(e.target.value);
  };

  const handlerPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setrP(e.target.value);
  };

  return (
    <div>
      <Header> Decrypt Page </Header>
      <Segment>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label> Enc(m) Form </label>
            <input
              placeholder="Encrypted vote"
              value={enc}
              onChange={handleEncChange}
            />
          </Form.Field>
          <Form.Field>
            <label> rP Form </label>
            <input placeholder="rP" value={rP} onChange={handlerPChange} />
          </Form.Field>
          <Button type="submit"> Submit </Button>
        </Form>
        {load ? <> </> : <Message as="h3">Uploading...</Message>}
        {end ? <Message positive> End </Message> : <></>}
        <Message> Decrypted vote: {decrpytedVote} </Message>
      </Segment>
    </div>
  );
};

export default Decrypt;
