import React from 'react';
import { useTable } from 'react-table';
import fakeData from "./MOCK_DATA.json"; 
import './DataTable.css';

const DataTable = () => {
    const data = React.useMemo(
        () => fakeData, []
    );
    const columns = React.useMemo(
        () => [
            {
                Header: "Company",
                accessor: "id",
            },
            {
                Header: "Job Title",
                accessor: "first_name",
            },
            {
                Header: "Location",
                accessor: "last_name",
            },
            {
                Header: "Link",
                accessor: "email",
            },
        ]
    , []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className='table-container'>
        <div className="data-container">
            <table {...getTableBodyProps}>
                <thead>
                    {headerGroups.map((headerGroup) => 
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => 
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            )}      
                        </tr>
                    )}
                </thead>
                <tbody>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default DataTable