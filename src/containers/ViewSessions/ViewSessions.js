import React from 'react';

import classes from './ViewSessions.module.css';
import SessionTable from '../../components/DataTables/Sessions/SessionTable';

function ViewSessions() {
  return (
    <main className={classes.main}>
      <h1 className={classes.header}>View Sessions</h1>
      <div className={classes.tableWrap}>
        <SessionTable />
      </div>
    </main>
  );
}

export default ViewSessions;