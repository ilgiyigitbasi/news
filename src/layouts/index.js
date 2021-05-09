import styles from './index.css';
import Header from "@/components/header";
import React from "react";
import 'moment/locale/tr'
import Footer from "@/components/footer";

function BasicLayout(props) {
  if (props.location.pathname === '/NewsDetails') {
    return <div className={styles.mainContainer}>
      <Header/>
      {props.children}
      <Footer/>
    </div>
  }
  return (
    <div className={styles.mainContainer}>
      <Header/>
      {props.children}
      <Footer/>
    </div>
  );
}

export default BasicLayout;
