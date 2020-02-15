import React from 'react';
import Check from '../components/Check';

// import styled from '@emotion/styled';
import styled from 'styled-components';

const CheckPage = () => {
  return (
    <Container>
      <Check />
    </Container>
  );
};

const Container = styled.div`
  margin: 50;
`;

export default CheckPage;
