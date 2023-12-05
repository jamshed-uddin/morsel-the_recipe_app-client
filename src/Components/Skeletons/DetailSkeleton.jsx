const DetailSkeleton = ({ itemType }) => {
  return (
    <div className="space-y-5">
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
        <div className="lg:flex gap-4">
          {/* image skeleton */}
          <div className="lg:w-1/2 mb-5 lg:mb-0">
            <p className="w-full h-56 bg-slate-200 rounded-xl animate-pulse"></p>
          </div>

          {/* creator info skeleton */}
          <div className="lg:w-1/2 space-y-6">
            {/* title */}
            <div className="space-y-3">
              <p className="rounded h-4  w-full bg-slate-200 bg-opacity-50 animate-pulse "></p>
              <p className="rounded h-4  w-4/5 bg-slate-200 bg-opacity-50 animate-pulse "></p>
            </div>
            {/* creator name */}
            <div className="space-y-4">
              <div className="flex gap-1 items-center">
                <p className="w-9 h-9 rounded-full bg-slate-200 animate-pulse"></p>
                <h3 className="h-4 w-1/2 bg-slate-200 rounded-full animate-pulse"></h3>
              </div>
              {/* others */}
              <div className="flex gap-6">
                <p className="rounded h-4  w-8 bg-slate-200 bg-opacity-50 animate-pulse "></p>
                <p className="rounded h-4  w-8 bg-slate-200 bg-opacity-50 animate-pulse "></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* body */}
      <div className="space-y-5 pt-6">
        {[1, 2, 3, 4].map((el, index) => (
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
