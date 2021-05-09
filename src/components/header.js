import React, {Component} from 'react';
import styles from './header.css';
import {connect} from 'dva'
import {SEARCH_ARTICLES, SEARCH_NEWSPAPERS} from "@/utils/constants";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.newsPapers = [
      {name: 'Sabah', domain: 'sabah.com.tr'},
      {name: 'Haber Türk', domain: 'haberturk.com.tr'},
      {name: 'Sözcü', domain: 'sozcu.com.tr'},
      {name: 'Hürriyet', domain: 'hurriyet.com.tr'},
      {name: 'Milliyet', domain: 'milliyet.com.tr'},
    ]
  }

  search = async () => {
    this.props.dispatch({
      type: 'newsAPIModel/updateState',
      payload: {loading: true}
    })
    let articles = {
      text: this.state.searchText,
    }
    await this.props.dispatch({
      type: SEARCH_ARTICLES,
      articles
    })
    this.props.dispatch({
      type: 'newsAPIModel/updateState',
      payload: {loading: false}
    })
  }

  searchNewsPapers = async (domain) => {
    this.props.dispatch({
      type: 'newsAPIModel/updateState',
      payload: {loading: true}
    })
    let articles = {
      domain: domain,
    }
    await this.props.dispatch({
      type: SEARCH_NEWSPAPERS,
      articles
    })
    this.props.dispatch({
      type: 'newsAPIModel/updateState',
      payload: {loading: false}
    })
  }

  render() {
    return (
      <>
        <div className={styles.mainContainer}>
          <img className={styles.logo} src={require('@/assets/logo.png')} alt=""/>
          <div className={styles.searchContainer}>
            <input className={styles.searchInput} onChange={(e) => this.setState({searchText: e.target.value})}
                   type="text"/>
            <div className={styles.searchButton} onClick={() => this.search()}>ARA</div>
          </div>
        </div>
        <div className={styles.menu}>
          {this.newsPapers.map(item =>
            <div className={styles.menuItems} onClick={() => this.searchNewsPapers(item.domain)}>
              {item.name}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = models => {
  return {
    newsAPIModel: models.newsAPIModel,
  };
};

export default connect(mapStateToProps)(Header);
