const searchFunction = (searchQuery, data, searchFor) => {
  const filteredData = data.filter((singleData) => {
    return singleData[searchFor === "recipe" ? "recipeName" : "title"]
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return filteredData;
};

export default searchFunction;
