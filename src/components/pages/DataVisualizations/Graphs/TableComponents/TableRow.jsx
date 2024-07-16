import React from 'react';
import TableInnerSquare from './TableInnerSquare';
import SubTable from './SubTable';

function TableRow(props) {
  const { columns, row, tableWidth, rowHeight } = props;

  return (
    <div
      className="table-row"
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: tableWidth,
        overflow: 'hidden',
      }}
    >
      {columns.map((property, idx) => {
        if (row) {
          if (typeof row[property] === 'object' && row[property] !== null) {
            return (
              <SubTable
                key={idx}
                dataObject={row[property]}
                rowHeight={rowHeight} // so for the SubTablesTable the row should be an object of objects
              />
            );
          } else {
            return (
              <div key={idx} style={{ overflow: 'hidden', flex: '1' }}>
                <TableInnerSquare
                  innerData={row[property]}
                  rowHeight={rowHeight}
                />
              </div>
            );
          }
        }
        return null; // Ensure a value is returned
      })}
    </div>
  );
}

export default TableRow;
