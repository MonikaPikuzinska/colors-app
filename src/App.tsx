import React from 'react';
import styles from './App.module.scss';
import AddColor from './containers/StartPage/AddColor';

function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.header}>Add your color!</h1>
      <AddColor/>
    </div>
  );
}

export default App;
