import React, {Component} from 'react';
import styles from './header.css';
import {connect} from 'dva'
import {SEARCH_ARTICLES, SEARCH_NEWSPAPERS} from "@/utils/constants";
import {router} from "umi";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsPapersFav: []
    }
    this.newsPapers = [
      {name: 'Sabah', domain: 'sabah.com.tr'},
      {name: 'Sözcü', domain: 'sozcu.com.tr'},
      {name: 'Hürriyet', domain: 'hurriyet.com.tr'},
      {name: 'Milliyet', domain: 'milliyet.com.tr'},
      {name: 'New York Times', domain: 'nytimes.com'},
      {name: 'USA Today', domain: 'wsj.com'},
      {name: 'The Wall Street Journal', domain: 'usatoday.com'},
      {name: 'Dainik Bhaskar', domain: 'bhaskar.com'},
      {name: 'The Asahi Shimbun', domain: 'ashai.com'},
      {name: 'The Washington Post', domain: 'washingtonPost.com'},
      {name: 'The Daily Telepgraph', domain: 'telegraph.co.uk'},
    ]
  }

  componentDidMount() {
    if(localStorage.getItem('favs-news') !== null) {
      this.setState({
        newsPapersFav:  JSON.parse(localStorage.getItem('favs-news')).favorites
      })
    }

  }

  search = async () => {
    this.props.dispatch({
      type: 'newsAPIModel/updateState',
      payload: {loading: true}
    })
    router.push('/')
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
    router.push('/')
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

  selectFav = (item)=> {
    let arr = this.state.newsPapersFav.concat(item)
    if(this.state.newsPapersFav.find(i => i.name === item.name) ){
      return
    } else {
      this.setState({
        newsPapersFav: arr
      })
    }
    this.props.dispatch({
      type: 'newsAPIModel/updateState',
      payload: {showModal: false}
    })
    let favorites= this.state.newsPapersFav
    localStorage.setItem("favs-news", JSON.stringify({
      favorites
    }))


  }

  render() {
    console.log(this.props.newsAPIModel.showModal)
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
        <div className={styles.list} onClick={()=> this.props.dispatch({
          type:'newsAPIModel/updateState',
          payload: {showModal: true}
        })}> Tüm Gazate Listesi
        </div>
        <div className={this.props.newsAPIModel.showModal ? styles.listModal: styles.hidden}>
          {this.newsPapers.map(item => <div onClick={()=> this.selectFav(item)}  className={styles.itemContainer}>{item.name}</div>)}
        </div>
        <div className={styles.menu}>
          <div className={styles.menuItems}>Favoriler:</div>
          {this.state.newsPapersFav.length !== 0  ? this.state?.newsPapersFav?.map(item =>
            <div className={styles.menuItems} style={{cursor:'pointer'}} onClick={() => this.searchNewsPapers(item.domain)}>
              {item.name}
            </div>
          ): <div className={styles.menuItems} style={{color:'lightslategray'}}> Favori eklemek için lütfen tüm gazeteler listesinden gazete seçiniz...</div>}
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
