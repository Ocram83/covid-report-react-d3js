import React, { useRef, useEffect } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./App.css";
import { loadHistogram, loadTable } from "./thunk";

import Histogram from "./components/Histogram/Histogram";
import Table from "./components/Table/Table";

function Header(props) {
  return <span>Report {props.name}</span>;
}

function onClickHandler(event, refs = [], dispatch) {
  let clickoutside = true;
  refs.forEach(ref => {
    if (ref.current && ref.current.contains(event.target)) {
      clickoutside = false;
    }
  });
  if (clickoutside) {
    dispatch(loadHistogram());
    dispatch(loadTable());
  } else {
  }
}

function App(props) {
  const histogram = useSelector(state => state.histogram);
  const table = useSelector(state => state.table);
  const regionSelected = useSelector(state => state.histogram.regionSelected);

  const dispatch = useDispatch();

  const wrapperRefHistogram = useRef(null);
  const wrapperRefTable = useRef(null);
  const refArray = [wrapperRefHistogram, wrapperRefTable];

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Header name="COVID-19" />
        </p>
      </header>

      <div
        className="App-body"
        onClick={event => onClickHandler(event, refArray, dispatch)}
      >
        <div ref={wrapperRefHistogram}>
          <Histogram
            width={1500}
            height={700}
            title={"COVID-19 Positive Cases"+(regionSelected?" - "+regionSelected:"")}
            data={histogram.data}
          ></Histogram>
        </div>
        <div ref={wrapperRefTable}>
          <Table header={table.header} data={table.data}></Table>
        </div>
      </div>
    </div>
  );
}

export default App;
