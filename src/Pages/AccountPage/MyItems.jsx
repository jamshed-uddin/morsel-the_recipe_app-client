import Card from "../../Components/Card/Card";

const MyItems = ({ MyItems, activeTab }) => {
  //   const itemType = `${activeTab === "myRecipes" ? "recipe" : "blog"} `;
  //   console.log(activeTab);
  //   console.log(itemType);

  if (activeTab === "savedItems") {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 py-8">
        {MyItems?.map((savedItem) => (
          <Card
            item={savedItem.item}
            itemType={savedItem?.itemType}
            key={savedItem._id}
          ></Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 py-8">
      {MyItems.map((singleItem) => (
        <Card
          item={singleItem}
          itemType={activeTab === "myRecipes" ? "recipe" : "blog"}
          key={singleItem._id}
        ></Card>
      ))}
    </div>
  );
};

export default MyItems;
