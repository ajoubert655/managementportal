import React from 'react';

import classes from './ManageTests.module.css';
import TestTable from '../../components/DataTables/Tests/TestTable';

function ManageTests() {
  return (
    <main className={classes.main}>
      <h1 className={classes.header}>Manage Tests</h1>
      <div className={classes.tableWrap}>
        <TestTable />
      </div>
    </main>
  );
}

export default ManageTests;