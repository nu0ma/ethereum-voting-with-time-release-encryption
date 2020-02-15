import React from 'react';
import Result from '../components/Result';
import styled from '@emotion/styled';

const ResultPage = () => {
  return (
    <Container>
      <Result />
    </Container>
  );
};

const Container = styled.div`
  margin: 50;
`;

export default ResultPage;
