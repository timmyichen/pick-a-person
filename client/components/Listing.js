import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'semantic-ui-react';

class Listing extends Component {
  render() {
    const { page, onChange, onDelete, data, won } = this.props;
    return (
      <Table.Row positive={won}>
        <Table.Cell>{data.index}</Table.Cell>
        <Table.Cell>
          { page === 'new' ?
            <Input fluid placeholder="Name" value={data.name} onChange={(e,d) => onChange(e,d,'name',data.index)} />
          :
            data.name
          }
        </Table.Cell>
        <Table.Cell>
          { page === 'new' ?
            <Input fluid type="number" placeholder="Quantity" value={data.quantity} onChange={(e,d) => onChange(e,d,'quantity',data.index)} />
          :
            data.quantity
          }
        </Table.Cell>
        { page === 'new' ?
          <Table.Cell>
            {!data.last ? <Button icon negative onClick={(e,d) => onDelete(data.index)}><Icon name="trash" /></Button> : '' }
          </Table.Cell>
        : null }
      </Table.Row>
    );
  }
}

export default Listing;