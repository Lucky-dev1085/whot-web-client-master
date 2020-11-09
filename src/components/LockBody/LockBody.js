import React, { Component } from 'react';

class LockBody extends Component {
  state = {
    top: window.scrollY
  };

  componentDidMount() {
    document.body.style.top = `-${this.state.top}px`;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  }

  componentWillUnmount() {
    document.body.style.top = 'initial';
    document.body.style.position = 'static';
    document.body.style.width = 'initial';

    window.scrollTo(0, this.state.top);
  }

  render() {
    return <>{this.props.children}</>;
  }
}

export default LockBody;
