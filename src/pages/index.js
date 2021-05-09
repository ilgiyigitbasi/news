import React, {Component} from 'react';
import styles from './index.css'
import Header from "@/components/header";
import {connect} from 'dva'
import {GET_TOPHEADLINES} from "@/utils/constants";

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
    return (
      <div className={styles.mainContainer}>
        <Header/>
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
