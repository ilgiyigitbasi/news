import React, {Component} from 'react';
import styles from './header.css'

class Header extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <img className={styles.logo} src={require('@/assets/logo.png')} alt=""/>
        <div className={styles.searchContainer}>
          <input className={styles.searchInput} type="text"/>
          <div className={styles.searchButton}>ARA</div>
        </div>
      </div>
    );
  }
}

export default Header;
