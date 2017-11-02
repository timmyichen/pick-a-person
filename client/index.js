import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ResultPage from './components/ResultPage';
import New from './components/New';

class Index extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Route exact path="/" component={New} />
          <Route path="/results/:id"
            render={(routerInfo) => 
              <ResultPage routerInfo={routerInfo} />
            }
          />
        </div>
      </BrowserRouter>
    );
  }
}

render(<Index />, document.getElementById('app'));