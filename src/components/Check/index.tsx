import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Segment, Message } from 'semantic-ui-react';

const Check = () => {
  const [timeKey, setTimeKey] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    setTime(process.env.REACT_APP_DECRYPTION_TIME as string);
  }, []);

  const getTimekey = async () => {
    const res = await axios.get(
      `http://localhost:5000/timeserver/${process.env.REACT_APP_DECRYPTION_TIME}`
    );
    // console.log(res.data.sHT0);
    return res;
  };

  const handleSubmit = async () => {
    // const timeKeyResponce = await getTimekey();
    // setTimeKey(timeKeyResponce.data.sHT0);
    const res = await axios.post('http://localhost:5000/check', {
      Q: timeKey,
      T: process.env.REACT_APP_DECRYPTION_TIME
    });
    console.log(res);
    setResult(res.data);
  };

  const handleTimeKey = async () => {
    const res = await getTimekey();
    console.log(res);
    setTimeKey(res.data.sHT0);
    console.log(timeKey);
  };

  return (
    <div className="container">
      <Segment.Group>
        <Segment>
          <Message as="h3">Decryption Time : {time}</Message>
        </Segment>
        <Segment>
          <Button onClick={handleTimeKey}>View Time Key</Button>
        </Segment>
        <Segment>
          <>{timeKey}</>
        </Segment>
        <Segment>
          <p>左辺 = e(Q,P) = e(sH(T), P)</p>
          <p> 右辺 = e(H(T),sP)　で比較する</p>
        </Segment>
        <Segment>
          <Button onClick={handleSubmit}>Check Time Key is correct </Button>
        </Segment>
        <Segment>{result}</Segment>
      </Segment.Group>
    </div>
  );
};

export default Check;
