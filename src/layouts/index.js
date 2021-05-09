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
  console.log(props)
  return (
    <>
      <Loading show={props.loading}/>
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
    loading: models.newsAPIModel.loading ,
  };
};
export default connect(mapStateToProps) (BasicLayout);
