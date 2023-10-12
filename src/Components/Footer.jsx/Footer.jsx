const Footer = () => {
  return (
    <div className="flex justify-center items-end min-h-[80vh]">
      <div className="">
        <div className="flex  justify-center mx-20">
          <div className="text-colorTwo space-y-3 text-center">
            <h3 className="text-xl font-semibold">
              Get fresh recipes, cooking tips and more!
            </h3>
            <div className="flex items-center rounded-xl shadow-lg">
              <input
                type="email"
                className="text-colorTwo text-lg py-3 rounded-l-xl px-8 outline-none"
                placeholder="Enter Email "
                required
              />
              <button className="text-xl px-2 font-semibold bg-colorOne text-white py-3 rounded-r-xl ">
                Subscribe
              </button>
            </div>
            <div className="space-x-6  text-lg font-semibold pt-4">
              <span>Facebook</span>
              <span>Twitter</span>
              <span>Instagram</span>
            </div>
          </div>
        </div>
        <div className=" overflow-hidden ">
          <h1 className="text-[19rem] text-center  text-colorOne font-bold  leading-[0.9] ">
            MORSEL
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
