import React,{useState} from 'react';
import { useTable } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './DataGrid.css';

function DataTable() {  
  const [highlightedRow, setHighlightedRow] = useState(null);
  // Sample data
  const data = React.useMemo(
    () => [
      { id: 1, title: 'John Doe', dueDate: 25, priority:'high', createdAt: '12-May-2023', status: 80 },
      { id: 2, title: 'Jane Smith', dueDate: 30, priority:'high', createdAt: '09-May-2023', status: 50 },
      // Add more data as needed
    ],
    []
  );

  // Define columns
  const columns = React.useMemo(
    () => [
      { Header: 'Serial no', accessor: 'id' },
      { Header: 'Title', accessor: 'title' },
      { Header: 'Due Date', accessor: 'dueDate' },
      { Header: 'Priority', accessor: 'priority' },
      { Header: 'Created On', accessor: 'createdAt' },
      {Header: 'Status', accessor: 'status' },
      {
        Header: 'Options',
        Cell: () => (
          <>
            <button className="option-button">
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
            <button className="option-button">
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
          </>
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
            <tr
              {...row.getRowProps()}
              className={highlightedRow === row ? 'highlight' :'' }
              onMouseEnter={() => {setHighlightedRow(row);console.log(row);}}
              onMouseLeave={() => setHighlightedRow(null)}>
            
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
