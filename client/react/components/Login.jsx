/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/


/*eslint-disable require-jsdoc*/
export class Login extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='login'>
            <img src='/public/img/clementine_150.png' />
            <br />
            <p className='clementine-text'>A Clementine Based <br /> MERN Application Template</p>
            <a href='/auth/github'>
              <div className='btn' id='login-btn'>
                <img src='/public/img/github_32px.png' alt='github logo' />
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
