import styles from './index.css';
import Header from "@/components/header";
import React from "react";
import 'moment/locale/tr'
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import {connect} from 'dva'

function BasicLayout(props) {
  if (props.location.pathname === '/NewsDetails') {
    return <div className={styles.mainContainer}>
      <Header/>
      {props.children}
      <Footer/>
    </div>
  }
  return (
    <>
      <Loading show={props.loading}/>
      <div className={props?.newsApiModel?.showModal  ? "background-Modal" : "none"} onClick={()=>props.dispatch({
        type: 'newsAPIModel/updateState',
        payload: {showModal: false}
      })}/>
    <div className={styles.mainContainer}>
      <Header/>
      {props.children}
      <Footer/>
    </div>
    </>
  );
}
const mapStateToProps = models => {
  return {
    loading: models.newsAPIModel.loading,
    newsApiModel: models.newsAPIModel
  };
};
export default connect(mapStateToProps) (BasicLayout);
