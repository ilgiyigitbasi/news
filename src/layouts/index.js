import styles from './index.css';
import Header from "@/components/header";
import React from "react";
import 'moment/locale/tr'

function BasicLayout(props) {
  if (props.location.pathname === '/NewsDetails') {
    return <div className={styles.mainContainer}>
      <Header/>
      {props.children}
    </div>
  }
  return (
    <div className={styles.mainContainer}>
      <Header/>
      {props.children}
    </div>
  );
}

export default BasicLayout;
