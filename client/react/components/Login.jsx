/*----------Modules----------*/
import React, {Component} from 'react';

/*----------Components----------*/


/*eslint-disable require-jsdoc*/
export class Login extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='login'>
            <br />
            <p className='clementine-text'>A Clementine Based <br /> MERN Application Template</p>
            <a href='/auth/github'>
              <div className='btn' id='login-btn'>
                <p>LOGIN WITH GITHUB</p>
              </div>
            </a>
          </div>
        </div>
      </div>
  );
  }
}

export default Login;
