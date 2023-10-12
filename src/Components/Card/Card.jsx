const Card = () => {
  return (
    <div>
      <div className="w-full h-[22rem]  rounded-2xl ">
        <img
          className="w-full h-full rounded-2xl object-cover"
          src="https://i.ibb.co/CMW27Zb/food3.jpg"
          alt=""
        />
      </div>
      <div className="px-3  ">
        <div className="flex justify-between">
          <p>like</p>
          <p>save</p>
        </div>

        <div className="text-colorTwo mt-2">
          <h2 className="text-lg leading-5 font-semibold">
            Lorem ipsum dolor, sit amet consectetur{" "}
          </h2>
          <p>20 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
