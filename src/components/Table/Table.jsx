import React from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { loadHistogramFromTable } from "../../thunk";

import "./Table.css";

const Table = props => {
  const loading = useSelector(state => state.table.loading);

  let { header, data } = props;

  if (!data) {
    return <div/>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {header.map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <Row key={row} row={row}></Row>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Row = props => {
  const dispatch = useDispatch();

  let { row } = props;

  return (
    <tr onClick={() => dispatch(loadHistogramFromTable(row[0]))}>
      {row.map(cell => (
        <td key={cell}>{cell}</td>
      ))}
    </tr>
  );
};

export default Table;
