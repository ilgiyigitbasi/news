import React, {Component} from 'react';
import styles from './index.css'
import {connect} from 'dva'
import moment from 'moment'

class NewsDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let newsDetail= this.props.newsAPIModel?.selectedNews
    return (
      <div className={styles.detailMainContainer}>
        <img className={styles.imageDetail} src={newsDetail.urlToImage} alt=""/>
        <div className={styles.title}>{newsDetail.title}</div>
        <div className={styles.infoAuthor}>{newsDetail.author} {moment(newsDetail.publishedAt).format('DD-MMMM-YYYY HH:MM')}</div>
        <div className={styles.content}>{newsDetail.description}</div>
      </div>
    );
  }
}

const mapStateToProps = models => {
  return {
    newsAPIModel: models.newsAPIModel,
  };
};
export default connect(mapStateToProps) (NewsDetails);
