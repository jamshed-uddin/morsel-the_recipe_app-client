import Card from "../../Components/Card/Card";

const ItemsComp = ({ items, itemsType }) => {
  return (
    <>
      {items?.map((item, index) => (
        <Card
          itemType={itemsType === "blogs" ? "blog" : "recipe"}
          item={item}
          key={index}
        ></Card>
      ))}
    </>
  );
};

export default ItemsComp;
