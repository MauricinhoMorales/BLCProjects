import React from 'react';
require('./assets/raven.js');
import PropTypes from 'prop-types';

class NotificationCenter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <notification-center
          class={this.props.className}
          appId={this.props.appId}
          subscriberId={this.props.subscriberId}
        />
      </div>
    );
  }
}

NotificationCenter.propTypes = {
  appId: PropTypes.string,
  subscriberId: PropTypes.string,
  className: PropTypes.string,
};

NotificationCenter.defaultProps = {
  appId: 'u5O4GI0C8X',
  subscriberId: 'foo1',
  className: 'customClass',
};

export default NotificationCenter;
