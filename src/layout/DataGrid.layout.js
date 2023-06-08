import React from 'react';
import { useTable } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './DataGrid.css';

function DataTable() {
  // Sample data
  const data = React.useMemo(
    () => [
      { id: 1, name: 'John Doe', age: 25, city: 'New York', progress: 80 },
      { id: 2, name: 'Jane Smith', age: 30, city: 'London', progress: 50 },
      // Add more data as needed
    ],
    []
  );

  // Define columns
  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'City', accessor: 'city' },
      {
        Header: 'Progress',
        accessor: 'progress',
        Cell: ({ value }) => (
          <div>
            {value}% <FontAwesomeIcon icon={faCheckCircle} />
          </div>
        ),
      },
    ],
    []
  );

  // Create a table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;
