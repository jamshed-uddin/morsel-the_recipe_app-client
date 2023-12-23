const propsItems = ["Users", "Recipes", "Blogs"];
const Totals = (props) => {
  return (
    <div className="flex justify-center lg:justify-start mb-4">
      <div className="md:flex gap-2 w-full md:w-fit">
        {Object.keys(props).map((item, index) => (
          <div
            key={index}
            className="text-2xl text-center py-8 px-14 shadow rounded-lg "
          >
            <div>
              <p>{propsItems[index]} </p> <p>{props[item]?.length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Totals;
