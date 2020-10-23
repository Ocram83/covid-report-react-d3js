import axios from "axios";

import _ from "lodash";

export const LOADING_DATA = "LOADING_DATA";
export const LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS";

export const LOAD_HISTOGRAM_LOADING = "LOAD_HISTOGRAM_LOADING";
export const LOAD_HISTOGRAM_SUCCESS = "LOAD_HISTOGRAM_SUCCESS";
export const LOAD_HISTOGRAM_ERROR = "LOAD_HISTOGRAM_ERROR";

export const LOAD_TABLE_LOADING = "LOAD_TABLE_LOADING";
export const LOAD_TABLE_SUCCESS = "LOAD_TABLE_SUCCESS";
export const LOAD_TABLE_ERROR = "LOAD_TABLE_ERROR";

export const loadData = () => dispatch => {
  dispatch({ type: LOADING_DATA });

  axios
    .get(
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json"
    )
    .then(function(response) {
      dispatch({ type: LOAD_DATA_SUCCESS, response });
      dispatch(loadHistogram());
      dispatch(loadTable());
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

export const loadHistogram = () => (dispatch, getState) => {
  dispatch({ type: LOAD_HISTOGRAM_LOADING });

  const state = getState().row_data;

  const raw_data = state.data.map(v => {
    return {
      data: v.data,
      nuovi_positivi: v.nuovi_positivi,
      regione: v.denominazione_regione
    };
  });
  const histogram = Object.entries(_.groupBy(raw_data, "data")).map(val => {
    return {
      x: val[0].substring(0, 10),
      y: val[1].reduce((sum, value) => sum + value.nuovi_positivi, 0).toString()
    };
  });

  dispatch({ type: LOAD_HISTOGRAM_SUCCESS, histogram });
};

export const loadTable = () => (dispatch, getState) => {
  dispatch({ type: LOAD_TABLE_LOADING });

  const state = getState().row_data;

  const raw_data = state.data.map(v => {
    return {
      data: v.data,
      nuovi_positivi: v.nuovi_positivi,
      regione: v.denominazione_regione
    };
  });

  const regions = Object.entries(_.groupBy(raw_data, "regione")).map(region => {
    return [
      region[0],
      region[1].reduce((sum, value) => sum + value.nuovi_positivi, 0).toString()
    ];
  });

  dispatch({ type: LOAD_TABLE_SUCCESS, regions });
};

export const loadHistogramFromTable = regionSelected => (
  dispatch,
  getState
) => {
  dispatch({ type: LOAD_HISTOGRAM_LOADING });

  const state = getState().row_data;

  const raw_data = state.data.map(v => {
    return {
      data: v.data,
      nuovi_positivi: v.nuovi_positivi,
      regione: v.denominazione_regione
    };
  });

  const histogram = Object.entries(_.groupBy(raw_data, "regione"))
    .find(region => region[0] === regionSelected)[1]
    .map(region => {
      return { x: region.data.substring(0, 10), y: region.nuovi_positivi };
    });
  dispatch({ type: LOAD_HISTOGRAM_SUCCESS, histogram, regionSelected });
};
