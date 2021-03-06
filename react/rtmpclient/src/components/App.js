import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamIndex from './streams/StreamIndex';
import StreamShow from './streams/StreamShow';
import StreamDelete from './streams/StreamDelete';
import Header from './Header';
import history from '../history';

export default function App() {
  return (
    <div className="ui container">
      <Router history={history}>
        <div className="">
          <Header />
          <Switch>
            <Route path="/" exact component={StreamIndex} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/:id" exact component={StreamShow} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
