import Card from "../../Components/Card/Card";

const RecipesPage = () => {
  return (
    <div className="my-container my-20">
      <div>
        <h1 className="uppercase text-6xl font-bold text-colorOne">Recipes</h1>
      </div>
      <div className="lg:grid grid-cols-3 gap-x-4 gap-y-8 mt-8">
        {[1, 2, 3, 4, 5, 6].map((index, el) => (
          <Card key={index} itemType={"recipe"}></Card>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;
