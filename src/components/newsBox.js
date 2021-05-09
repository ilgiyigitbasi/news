import React, {Component} from 'react';
import styles from './newsBox.css'
import {router} from "umi";
import {connect} from 'dva'

class NewsBox extends Component {
  constructor(props) {
    super(props);
  }
  showDetails= (i)=> {
      console.log(i)
      let topHeadlines = this.props?.newsAPIModel?.topHeadlines
      let selectedNews= topHeadlines.articles[i]
      this.props.dispatch({
        type:'newsAPIModel/updateState',
        payload: {selectedNews: selectedNews}
      })
    router.push('/newsDetails')
  }
  render() {
    let newsDetail = this.props.details
    return (
      <div className={styles.mainBoxContainer}>
        <img src={newsDetail.urlToImage} className={styles.image} alt=""/>
        <div className={styles.newsHeader}>{newsDetail.title}</div>
        <div className={styles.newsDetail}>{newsDetail.description} </div>
        <div className={styles.newsLink} onClick={()=> this.showDetails(this.props.index)}>devamı için tıklayınız...</div>
      </div>
    );
  }
}

const mapStateToProps = models => {
  return {
    newsAPIModel: models.newsAPIModel,
  };
};

export default connect(mapStateToProps) (NewsBox);
