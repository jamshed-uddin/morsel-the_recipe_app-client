import Card from "../../Components/Card/Card";

const SearchResult = ({ data }) => {
  return (
    <>
      {data?.map((item) => (
        <Card
          item={item}
          itemType={item.title ? "blog" : "recipe"}
          key={item._id}
        ></Card>
      ))}
    </>
  );
};

export default SearchResult;
