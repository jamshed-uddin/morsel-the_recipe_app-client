import { PieChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";

const Pie = ({ stateData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let id = 0;
    const prepData = [];
    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    for (const key in stateData) {
      if (key !== "total") {
        const obj = {
          id: id,
          value: stateData[key],
          label: `${capitalizeFirstLetter(key)}: ${stateData[key]}`,
        };
        prepData.push(obj);
      }

      id++;
    }

    setData(prepData);
  }, [stateData]);

  return (
    <div>
      <PieChart
        series={[
          {
            data,
            innerRadius: 10,
            paddingAngle: 2,
            cornerRadius: 4,
          },
        ]}
        margin={{ left: -15 }}
        width={310}
        height={150}
        tooltip={{ trigger: "none" }}
      />
    </div>
  );
};

const PieChartComp = React.memo(Pie);

export default PieChartComp;
