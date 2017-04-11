/*----------Modules----------*/
import React, {Component} from 'react';

/*----------Components----------*/


/*eslint-disable require-jsdoc*/
export class Profile extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='github-profile'>
            <p><span>ID: </span><span id='profile-id' className='profile-value' /></p>
            <p><span>Username: </span><span id='profile-username' className='profile-value' /></p>
            <p><span>Display Name: </span><span id='display-name' className='profile-value' /></p>
            <p><span>Repositories: </span><span id='profile-repos' className='profile-value' /></p>
            <a className='menu' href='/'>Home</a>
            <p id='menu-divide'>|</p>
            <a className='menu' href='/logout'>Logout</a>
          </div>
        </div>
      </div>
  );
  }
}

export default Profile;
