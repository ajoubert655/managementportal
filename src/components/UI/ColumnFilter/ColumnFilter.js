import React from 'react'

import classes from './ColumnFilter.module.css';

const ColumnFilter = ({column}) => {
  const {filterValue, setFilter} = column
  return (
    <span>
      <input
        className={classes.ColumnFilter}
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}

export default ColumnFilter;