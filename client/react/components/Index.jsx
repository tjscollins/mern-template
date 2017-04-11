/*----------Modules----------*/
import React, {Component} from 'react';
import Markdown from 'markdown-to-jsx';

/*----------Components----------*/
import Header from 'Header';

const README = require('README.md');

export class Index extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <Markdown>
            {README}
          </Markdown>
        </div>
      </div>
    );
  }
}

export default Index;
