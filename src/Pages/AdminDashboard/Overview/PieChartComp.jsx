import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

const PieChartComp = ({ stateData }) => {
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
        // console.log(obj);
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

export default PieChartComp;

// data: [
//     { id: 0, value: 10, label: 'series A' },
//     { id: 1, value: 15, label: 'series B' },
//     { id: 2, value: 20, label: 'series C' },
//   ],
