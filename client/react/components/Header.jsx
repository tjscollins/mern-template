/*----------Modules----------*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';

/*----------Components----------*/

/*----------Redux----------*/
import {setUser, errorLog} from 'actions';

export class Header extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
  const {dispatch} = this.props;
  /*istanbul ignore next*/
  $
    .get('/api/me')
    .done((user) => {
      if (user.github) {
        dispatch(setUser(user));
      }
    })
    .catch(() => {
      dispatch(errorLog(error));
    });
}
  render() {
    const {_id} = this.props.userSession;
    return (
      <nav className='navbar navbar-default'>
        <div className='container'>
          <div className='navbar-header'>
            <button
              type='button'
              className='navbar-toggle collapsed'
              data-toggle='collapse'
              data-target='#bs-example-navbar-collapse-1'
              aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <a className='navbar-brand' href='#'>MERN Template</a>
          </div>

          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>

            <ul className='nav navbar-nav navbar-right'>
              <li>
                <a href='/auth/github'>
                  <button className='btn btn-default login'>
                    <i className='fa fa-github' />
                    {_id
                      ? 'Logout'
                    : 'Login'}
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func,
  userSession: PropTypes.object,
};

export default connect((state) => state)(Header);
