import React from 'react';
import Organizer from '../components/Organizer';
import styled from '@emotion/styled';

const OrganizerPage = () => {
  return (
    <Container>
      <Organizer />
    </Container>
  );
};

const Container = styled.div`
  margin: 50;
`;

export default OrganizerPage;
