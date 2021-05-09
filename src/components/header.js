import React, {Component} from 'react';
import styles from './header.css';
import {connect} from 'dva'
import {SEARCH_ARTICLES} from "@/utils/constants";

class Header extends Component {
  constructor(props) {
    super(props);

  }

  search = ()=> {
    let articles ={
      text: this.state.searchText
    }
    this.props.dispatch({
      type:SEARCH_ARTICLES,
      articles
    })
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <img className={styles.logo} src={require('@/assets/logo.png')} alt=""/>
        <div className={styles.searchContainer}>
          <input className={styles.searchInput} onChange={(e)=> this.setState({searchText:e.target.value})} type="text"/>
          <div className={styles.searchButton} onClick={()=> this.search()}>ARA</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = models => {
  return {
    newsAPIModel: models.newsAPIModel,
  };
};

export default connect(mapStateToProps) (Header);
