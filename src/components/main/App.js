import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from './Header';
import BeersList from './../list/BeersList';
import BeerDetailsModal from './../details/BeerDetailsModal';
import './App.scss';

const App = () => (
  <Container>
    <Header />
    <BeersList />
    <Route path="/:id?" component={BeerDetailsModal} />
  </Container>
);

export default App;
