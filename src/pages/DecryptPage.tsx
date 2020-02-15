import React from 'react';
import Decrypt from '../components/Decrypt';
import styled from '@emotion/styled';

const DecryptPage = () => {
  return (
    <Container>
      <Decrypt />
    </Container>
  );
};

const Container = styled.div`
  margin: 50;
`;

export default DecryptPage;
