import React, { useRef } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./App.css";
import { loadHistogram, loadTable, loadHistogramFromTable } from "./thunk";

import Histogram from "./components/Histogram/Histogram";

function Header(props) {
  return <span>Report {props.name}</span>;
}

function onClickHandler(event, refs = [], dispatch) {
  let clickoutside = true;
  refs.forEach((ref) => {
    if (ref.current && ref.current.contains(event.target)) {
      clickoutside = false;
    }
  });
  if (clickoutside) {
    dispatch(loadHistogram());
  } else {
  }
}

function App(props) {
  const histogram = useSelector((state) => state.histogram);
  const table = useSelector((state) => state.table);
  const regionSelected = useSelector((state) => state.histogram.regionSelected);
  const headers = useSelector((state) => state.headers.data);

  const dispatch = useDispatch();

  const wrapperRefHistogram = useRef(null);
  const wrapperRefTable = useRef(null);
  const refArray = [wrapperRefTable];
  const wrapperRefSelect = useRef(null);

  const regions = table.data ? table.data.map((x) => x[0]) : [];

  return (
    <div className="App">
      <header className="App-top-header">
        <p>
          <Header name="COVID-19" />
        </p>
      </header>

      <div className="App-sub-header">
        {headers && regions
          ? renderHeaders(
              headers,
              regions,
              regionSelected,
              dispatch,
              wrapperRefSelect
            )
          : ""}
      </div>

      <div
        className="App-body"
        //nClick={(event) => onClickHandler(event, refArray, dispatch)}
      >
        <div ref={wrapperRefHistogram} className="HistogramWrapper">
          <Histogram
            width={(window.screen.width / 100) * 90}
            height={(window.screen.height / 100) * 60}
            title={"COVID-19 - Casi positivi"}
            data={histogram.data}
          ></Histogram>
        </div>
      </div>
    </div>
  );
}

function renderHeaders(
  headers,
  regions,
  regionSelected,
  dispatch,
  wrapperRefSelect
) {
  console.log(regions);

  return (
    <div className="sub-header-content">
      <div className="sub-header-box">
        <div className="sub-header-content-description">Data</div>
        <div className="sub-header-content-data">
          {renderDate(headers.date)}
        </div>
      </div>
      <div className="sub-header-box">
        <div className="sub-header-content-description"># casi</div>
        <div className="sub-header-content-data">{headers.histogram.y}</div>
      </div>
      <div className="sub-header-box">
        <div className="sub-header-content-description"># tamponi</div>
        <div className="sub-header-content-data">{headers.tamponi}</div>
      </div>
      <div className="sub-header-box">
        <div className="sub-header-content-description">
          {regionSelected ? "Regione" : "Nazione"}
        </div>

        <select
          ref={wrapperRefSelect}
          className="sub-header-content-data-select"
          onChange={(e) => {
            e.target.value == "Italia"
              ? dispatch(loadHistogram())
              : dispatch(loadHistogramFromTable(e.target.value));
          }}
        >
          <option
            className="sub-header-content-data-select-option"
            value="Italia"
          >
            Italia
          </option>
          {regions
            ? regions.map((region) => (
                <option
                  key={region}
                  value={region}
                  className="sub-header-content-data-select-option"
                >
                  {region}
                </option>
              ))
            : ""}
        </select>
      </div>
    </div>
  );
}

const handleSelectRegion = (e) => {};

function renderDate(d) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }

  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
}

export default App;
