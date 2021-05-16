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
      {name: 'Sabah', domain: 'sabah.com.tr', isFav: false},
      {name: 'Sözcü', domain: 'sozcu.com.tr', isFav: false},
      {name: 'Hürriyet', domain: 'hurriyet.com.tr', isFav: false},
      {name: 'Milliyet', domain: 'milliyet.com.tr', isFav: false},
      {name: 'New York Times', domain: 'nytimes.com', isFav: false},
      {name: 'USA Today', domain: 'wsj.com', isFav: false},
      {name: 'The Wall Street Journal', domain: 'usatoday.com', isFav: false},
      {name: 'Dainik Bhaskar', domain: 'bhaskar.com', isFav: false},
      {name: 'The Asahi Shimbun', domain: 'ashai.com', isFav: false},
      {name: 'The Washington Post', domain: 'washingtonPost.com', isFav: false},
      {name: 'The Daily Telepgraph', domain: 'telegraph.co.uk', isFav: false},
    ]
  }

  componentDidMount() {
    if(localStorage.getItem('favs-news') !== null) {
      this.setState({
        newsPapersFav:  JSON.parse(localStorage.getItem('favs-news')).newsPapersFav
      }, ()=> this.state.newsPapersFav.sort(function(a,b){return a.isFav-b.isFav}).reverse())

    } else {
      this.setState({
        newsPapersFav: this.newsPapers
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
    this.props.dispatch({
      type: 'newsAPIModel/updateState',
      payload: {showModal: false}
    })
    await this.props.dispatch({
      type: SEARCH_NEWSPAPERS,
      articles
    })
    this.props.dispatch({
      type: 'newsAPIModel/updateState',
      payload: {loading: false}
    })

  }

  selectFav = (i, value)=> {
    let newsPapersFav = [...this.state.newsPapersFav];
    let item = {...newsPapersFav[i]};
    item.isFav = value;
    newsPapersFav[i] = item;
    this.setState({newsPapersFav}, ()=>  localStorage.setItem("favs-news", JSON.stringify({
      newsPapersFav
    })));

  }

  render() {
    console.log(this.state)
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
          {this.state.newsPapersFav.map((item, i) => <div className={styles.itemContainer}><div onClick={() => this.searchNewsPapers(item.domain)}>{item.name}</div>
            {item.isFav ? <div style={{justifySelf:'center'}} onClick={()=> this.selectFav(i, false)} ><img src={require('@/assets/star.png')} style={{height:'13px', justifySelf:'center'}} alt='' /></div> :<div className={styles.fav} style={{justifySelf:'center'}} onClick={()=> this.selectFav(i, true)}><img src={require('@/assets/star.svg')} style={{height:'13px'}} alt='' /></div>}
          </div>)}
        </div>
       {/* <div className={styles.menu}>
          <div className={styles.menuItems}>Favoriler:</div>
          {this.state.newsPapersFav.length !== 0  ? this.state?.newsPapersFav?.map(item =>
            <div className={styles.menuItems} style={{cursor:'pointer'}} onClick={() => this.searchNewsPapers(item.domain)}>
              {item.name}
            </div>
          ): <div className={styles.menuItems} style={{color:'lightslategray'}}> Favori eklemek için lütfen tüm gazeteler listesinden gazete seçiniz...</div>}
        </div>*/}
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
