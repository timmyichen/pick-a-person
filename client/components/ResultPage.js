import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Input, Table, Button } from 'semantic-ui-react';
import axios from 'axios';

import Listing from './Listing';

const HOST = require('../../config/clientConfig').host;

class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      people: [],
      winner: {},
    };
  }
  componentDidMount() {
    const { id } = this.props.routerInfo.match.params;
    axios.get(`/api/get-results/${id}`)
      .then(response => {
        this.setState(response.data);
      });
  }
  render() {
    const { people, title, winner, created } = this.state;
    const { name, index } = winner;
    const fullURL = HOST + this.props.routerInfo.location.pathname;
    return (
      <Container>
        <Button as={Link} to="/" primary content="Create New" icon="plus" labelPosition="right" />
        <Header as="h1">Results for: {title}</Header>
        <p>Created on: {new Date(created) + ''}</p>
        <p>Share this page: <a href={fullURL}>{fullURL}</a></p>
        <Header as="h2">Winner: {name} ({index})</Header>
        <Header as="h3">Full Entry List:</Header>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {people.map((data, i) => {
              data.index = i;
              data.last = i === people.length - 1;
              return <Listing key={i} data={data} page="results" won={index === i} />;
            })}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default ResultPage;