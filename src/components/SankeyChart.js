import React from "react";
import { Chart } from "react-google-charts";

const SankeyChart = (props) => {
  return (
    <Chart
      chartType="Sankey"
      width="70%"
      height="400px"
      style={{
        justifyContent: "center",
        display: "flex",
      }}
      data={props.data}
      options={props.options}
    />
  );
};

export default SankeyChart;
