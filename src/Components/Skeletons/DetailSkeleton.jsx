const DetailSkeleton = ({ itemType }) => {
  return (
    <div className="space-y-5 mt-0 lg-mt-16">
      {itemType === "Blog" ? (
        //blog detail skeleton
        <div className="space-y-7">
          {/* title */}
          <div className="space-y-5">
            <p className="rounded h-7 w-full bg-slate-200 bg-opacity-50 animate-pulse "></p>
            <p className="rounded h-7  w-4/5 bg-slate-200 bg-opacity-50 animate-pulse "></p>
          </div>
          {/* creator info */}
          <div className="flex gap-1 items-center">
            <p className="w-9 h-9 rounded-full bg-slate-200 animate-pulse"></p>
            <h3 className="h-4 w-2/5 bg-slate-200 rounded-full animate-pulse"></h3>
          </div>
          {/* others */}
          <div className="flex gap-6 md:gap-14 items-center">
            <p className="rounded h-4  w-8 bg-slate-200 bg-opacity-50 animate-pulse "></p>
            <p className="rounded h-4  w-8 bg-slate-200 bg-opacity-50 animate-pulse "></p>
          </div>
        </div>
      ) : (
        // recipe detail skeleton
        <div className="lg:flex items-center gap-4">
          {/* image skeleton */}
          <div className="md:w-[45%]  h-[60vh] md:h-[50vh] mb-5 lg:mb-0 ">
            <p className="w-full h-full bg-slate-200 rounded-xl animate-pulse"></p>
          </div>

          {/* creator info skeleton */}
          <div className="lg:w-1/2 space-y-4">
            {/* title */}
            <div className="space-y-3">
              <p className="rounded h-4  w-full bg-slate-200 bg-opacity-50 animate-pulse "></p>
              <p className="rounded h-4  w-4/5 bg-slate-200 bg-opacity-50 animate-pulse "></p>
            </div>

            <div className="flex justify-center">
              <div className="space-y-4 w-3/4 mx-auto">
                {/* creator name */}
                <div className="flex w-full gap-1 items-center">
                  <p className="w-10 h-9 rounded-full bg-slate-200 animate-pulse"></p>
                  <h3 className="h-4 w-full bg-slate-200 rounded-full animate-pulse"></h3>
                </div>
                {/* others */}
                <div className="flex gap-14">
                  <p className="rounded h-4  w-8 bg-slate-200 bg-opacity-50 animate-pulse "></p>
                  <p className="rounded h-4  w-8 bg-slate-200 bg-opacity-50 animate-pulse "></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* body */}
      <div className="space-y-6 pt-6">
        {[1, 2, 3, 4, 5, 6, 7].map((el, index) => (
          <p
            key={index}
            className="rounded h-4  w-full bg-slate-200 bg-opacity-50 animate-pulse "
          ></p>
        ))}
        <p className="rounded h-4  w-4/5 bg-slate-200 bg-opacity-50 animate-pulse "></p>
      </div>
    </div>
  );
};

export default DetailSkeleton;
