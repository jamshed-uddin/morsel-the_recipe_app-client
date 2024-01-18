import PieChartComp from "./PieChartComp";

const propsItems = ["Recipes", "Blogs", "Users"];
const Totals = ({ overviewStates, overviewStatesLoading }) => {
  if (overviewStatesLoading) {
    return (
      <div className="md:flex items-center gap-2 my-2 ">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className={`h-44 flex-grow  bg-slate-200 rounded-xl animate-pulse mb-2 md:mb-0 ${
              index === 2 ? "hidden md:block" : ""
            }`}
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex  mb-4 ">
      <div className="md:flex gap-1 w-full">
        {Object.entries(overviewStates || {})?.map((arr, index) => (
          <div key={index} className="shadow-md rounded-lg p-2 ">
            <div className="flex justify-between items-center">
              <h3 className="text-lg">{propsItems.at(index)}</h3>{" "}
              <h3>Total: {arr.at(1).total}</h3>
            </div>
            <div className="flex justify-center">
              <PieChartComp stateData={arr.at(1)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Totals;
