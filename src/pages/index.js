import React, {Component} from 'react';
import styles from './index.css'
import Header from "@/components/header";
import {connect} from 'dva'
import {GET_TOPHEADLINES} from "@/utils/constants";
import NewsBox from "@/components/newsBox";

class Index extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.getTopHeadlines()
  }
  getTopHeadlines = ()=> {
    this.props.dispatch({
      type: GET_TOPHEADLINES
    })
  }


  render() {
    let topHeadlines = this.props?.newsAPIModel?.topHeadlines
    return (

        <div className={styles.topHeadLinesContainer}>
          {topHeadlines && topHeadlines?.articles?.map((item,i)=> <NewsBox index={i} details={item}/>)}
        </div>

    );
  }
}

const mapStateToProps = models => {
  return {
    newsAPIModel: models.newsAPIModel,
  };
};

export default connect(mapStateToProps) (Index);
