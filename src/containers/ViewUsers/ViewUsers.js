import React from 'react';

import classes from './ViewUsers.module.css';
import UserTable from '../../components/DataTables/Users/UserTable';

const ViewUsers = () => {
  return (
    <main className={classes.main}>
      <h1 className={classes.header}>View Users</h1>
      <div className={classes.tableWrap}>
        <UserTable />
      </div>
    </main>
  );
}

export default ViewUsers;