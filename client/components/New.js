import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Container, Table, Input, Button } from 'semantic-ui-react';
import axios from 'axios';

import Listing from './Listing';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      people: [ { name: '', quantity: 1 } ],
      completed: {
        status: false,
        id: -1,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.submit = this.submit.bind(this);
  }
  onChange(event, data, field, index) {
    const { people } = this.state;
    people[index][field] = data.value;
    if (index === people.length - 1) people.push({ name: '', quantity: 1 });
    this.setState({ people });
  }
  onChangeTitle(event, data) {
    this.setState({ title: data.value });
  }
  onDelete(index) {
    const { people } = this.state;
    people.splice(index, 1);
    this.setState({ people });
  }
  submit() {
    let { title, people } = this.state;
    people = people.slice(0, people.length-1); //remove last empty entry
    axios.post('/api/new', { title, people })
      .then(response => {
        this.setState({ completed: { status: true, id: response.data.id } });
      });
  }
  render() {
    const { people, completed } = this.state;
    if (completed.status) {
      return <Redirect push to={`/results/${completed.id}`} />;
    }
    return (
      <Container>
        <Header as="h1">Create A New Random Drawing</Header>
        <Input label="Drawing Title" placeholder="(optional)" onChange={this.onChangeTitle} />
        <Header as="h3">Enter the names below:</Header>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Remove</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {people.map((data, i) => {
              data.index = i;
              data.last = i === people.length - 1;
              return <Listing key={i} data={data} onChange={this.onChange} onDelete={this.onDelete} page="new" won={false} />;
            })}
          </Table.Body>
        </Table>
        <Button onClick={this.submit} positive content="Create!" />
      </Container>
    );
  }
}

export default New;