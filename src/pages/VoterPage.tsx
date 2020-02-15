import React from 'react';
import Voter from '../components/Voter';
import styled from '@emotion/styled';

const VoterPage = () => {
  return (
    <Container>
      <Voter />
    </Container>
  );
};

const Container = styled.div`
  margin: 50;
`;

export default VoterPage;
