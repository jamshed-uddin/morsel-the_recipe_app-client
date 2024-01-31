import Card from "../../Components/Card/Card";

const ItemsComp = ({ items, itemsType }) => {
  return (
    <>
      {items?.map((item) => (
        <Card
          itemType={itemsType === "blogs" ? "blog" : "recipe"}
          item={item}
          key={item._id}
        ></Card>
      ))}
    </>
  );
};

export default ItemsComp;
