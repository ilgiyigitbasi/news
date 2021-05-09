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
  getTopHeadlines = async ()=> {
    this.props.dispatch({
      type:'newsAPIModel/updateState',
      payload:{loading:true}
    })
    await this.props.dispatch({
      type: GET_TOPHEADLINES
    })
    this.props.dispatch({
      type:'newsAPIModel/updateState',
      payload:{loading:false}
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
