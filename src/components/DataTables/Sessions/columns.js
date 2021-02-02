import ColumnFilter from '../../UI/ColumnFilter/ColumnFilter';

export const COLUMNS = [
  {
    Header: 'Session ID',
    accessor: 'itemId',
    Filter: ColumnFilter
  },
  {
    Header: 'Org ID',
    accessor: 'sessionOrgId',
    Filter: ColumnFilter
  },
  {
    Header: 'Test ID',
    accessor: 'sessionTestId',
    Filter: ColumnFilter
  },
  {
    Header: 'Test Name',
    accessor: 'description',
    Filter: ColumnFilter
  },
  {
    Header: 'User ID',
    accessor: 'id',
    Filter: ColumnFilter
  },
  {
    Header: 'User First Name',
    accessor: 'firstName',
    Filter: ColumnFilter
  },
  {
    Header: 'User Last Name',
    accessor: 'lastName',
    Filter: ColumnFilter
  },
  {
    Header: 'Email',
    accessor: 'email',
    Filter: ColumnFilter
  },
  {
    Header: 'Date',
    accessor: 'created',
    Filter: ColumnFilter
  }
];