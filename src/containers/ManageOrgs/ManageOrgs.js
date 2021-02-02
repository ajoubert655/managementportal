import React from 'react';

import classes from './ManageOrgs.module.css';
import OrgTable from '../../components/DataTables/Orgs/OrgTable';

function ManageOrgs() {

  return (
    <main className={classes.main}>
      <h1 className={classes.header}>Manage Organizations</h1>
      <div className={classes.tableWrap}>
        <OrgTable />
      </div>
    </main>
  );
}

export default ManageOrgs;