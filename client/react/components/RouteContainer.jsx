/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/


export class RouteContainer extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
  );
  }
}

RouteContainer.propTypes = {
  children: React.PropTypes.array,
};

export default RouteContainer;
