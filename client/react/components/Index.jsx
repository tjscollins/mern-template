/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/


/*eslint-disable require-jsdoc*/
export class Index extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div className='container'>
          <img src='/public/img/clementine_150.png' />
          <br />
          <p className='clementine-text'>MERN Template</p>
        </div>

        <div className='container'>
          <p>You have clicked the button <span id='click-nbr' /> times.</p>
          <br />
          <div className='btn-container'>
            <button type='submit' className='btn btn-add'>CLICK ME!</button>
            <button className='btn btn-delete'>RESET</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
