import React, { Component } from 'react';
import styles from './loading.css'

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  render() {
    return (
      <>
        {this.props.show && <div className={styles.loading}>
          <div className={styles.loader} />
        </div>}
      </>
    );
  }
}

export default Loading;
