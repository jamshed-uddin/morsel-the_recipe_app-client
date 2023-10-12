import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import Card from "../../../Components/Card/Card";

const Recipes = () => {
  return (
    <div className=" my-container lg:flex">
      <div className="text-colorTwo  pb-6 lg:sticky top-0 lg:h-screen  w-[60%] grid place-items-center">
        <div>
          <h1 className=" font-bold md:text-3xl lg:text-8xl text-left tracking-tight">
            <span>COOK</span> <span>SOMETHING</span> <span>QUICK</span>
          </h1>
          <button className="pt-6 pl-3 hidden lg:block text-colorOne text-2xl space-x-1 hover:space-x-3 ">
            <span>Take me to the recipes</span>
            <span className="transition-all duration-500">
              <EastOutlinedIcon />
            </span>
          </button>
        </div>
      </div>
      <div className="lg:overflow-y-auto space-y-3  w-[40%] lg:pt-32 lg:pb-28 ">
        {[1, 2, 3, 4, 5].map((el, index) => (
          <Card key={index}></Card>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
