import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header } from 'semantic-ui-react';
import styled from '@emotion/styled';

// import './Home.css';

const Home = () => {
  return (
    <Container>
      <Segment.Group className="container">
        <Header>Home</Header>
        <Segment className="item">
          <Link to={'/voter'}>Go to Voter Page</Link>
        </Segment>
        <Segment className="item">
          <Link to={'/organizer'}>Go to Organizer Page</Link>
        </Segment>
        <Segment className="item">
          <Link to={'/check'}>Check Time Key </Link>
        </Segment>
      </Segment.Group>
    </Container>
  );
};

const Container = styled.div`
  margin: 50;
`;

export default Home;
