import Card from "../../Components/Card/Card";
import CardSkeleton from "../../Components/CardSkeleton";

const MyItems = ({ isLoading, MyItems, activeTab }) => {
  // isLoading here is the loading status in the tabItem(recipe/blog/savedItem) fetching
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 py-8">
        {[1, 2, 3].map((index, el) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (activeTab === "savedItems") {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 py-8">
        {MyItems?.map((savedItem) => (
          <Card
            item={savedItem.item}
            itemType={savedItem?.itemType}
            key={savedItem._id}
            itemId={savedItem.item}
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
          itemId={singleItem._id}
        ></Card>
      ))}
    </div>
  );
};

export default MyItems;
