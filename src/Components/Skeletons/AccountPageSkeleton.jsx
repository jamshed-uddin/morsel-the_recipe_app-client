const AccountPageSkeleton = () => {
  return (
    <div className="w-full lg:w-11/12 mx-auto">
      <div className="lg:flex items-center gap-5">
        {/* profile photo */}
        <div>
          <p className="w-36 h-36 rounded-full bg-slate-200 animate-pulse"></p>
        </div>

        {/* name  and bio */}
        <div className="space-y-4">
          <p className="w-80 h-8 bg-slate-200 animate-pulse"></p>
          <div className="space-y-2">
            <p className="w-96 h-4 bg-slate-200 animate-pulse"></p>
            <p className="w-80 h-4 bg-slate-200 animate-pulse"></p>
          </div>
        </div>
      </div>

      {/* tab skeleton */}
      <div className="mt-14 flex gap-12">
        <p className="w-20 h-8 bg-slate-200 animate-pulse"></p>
        <p className="w-20 h-8 bg-slate-200 animate-pulse"></p>
        <p className="w-20 h-8 bg-slate-200 animate-pulse"></p>
      </div>
      <p className="w-full h-[1px]  bg-slate-200 animate-pulse"></p>
    </div>
  );
};

export default AccountPageSkeleton;
