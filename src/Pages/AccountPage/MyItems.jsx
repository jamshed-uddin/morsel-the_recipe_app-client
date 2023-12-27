import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";
import CardSkeleton from "../../Components/Skeletons/CardSkeleton";

const MyItems = ({ isLoading, myItems, activeTab }) => {
  // isLoading here is the loading status in the tabItem(recipe/blog/savedItem) fetching
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 ">
        {[1, 2, 3].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (activeTab === "myRecipes" && myItems?.length === 0) {
    return (
      <div className="grid place-items-center h-48">
        <div>
          <p className="text-2xl font-semibold text-colorTwo">
            No recipe created!
          </p>
          <p className="text-xl text-colorOne text-center">
            <Link to={"/addrecipe"}>Create a recipe +</Link>
          </p>
        </div>
      </div>
    );
  }
  if (activeTab === "myBlogs" && myItems?.length === 0) {
    return (
      <div className="grid place-items-center h-48">
        <div>
          <p className="text-2xl font-semibold text-colorTwo">
            No blog created!
          </p>
          <p className="text-xl text-colorOne text-center ">
            <Link to={"/addblog"}>Create a blog +</Link>
          </p>
        </div>
      </div>
    );
  }

  if (activeTab === "savedItems") {
    return myItems?.length === 0 ? (
      <div className="grid place-items-center h-48">
        <div>
          <p className="text-2xl font-semibold text-colorTwo">No item saved</p>
          <p className="text-xl text-colorOne text-center ">
            <Link to={"/recipes"}>Go to recipes</Link>
          </p>
        </div>
      </div>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 ">
        {myItems?.map((savedItem) => (
          <Card
            item={savedItem?.item}
            itemType={savedItem?.itemType}
            key={savedItem._id}

            // the unique of the item is inside item property of savedItem
          ></Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 ">
      {myItems.map((singleItem) => (
        <Card
          item={singleItem}
          itemType={activeTab === "myRecipes" ? "recipe" : "blog"}
          key={singleItem._id}
          placedIn={"account-tab"}
        ></Card>
      ))}
    </div>
  );
};

export default MyItems;
