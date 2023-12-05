const DashboardSkeleton = () => {
  return (
    <div className="flex gap-6">
      <div className="w-1/6 space-y-9 mt-20 ml-10 hidden md:block">
        <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
        <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
        <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
        <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
        <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
      </div>
      <div className=" flex-grow mt-5 px-4 md:px-0 md:pr-8 space-y-5">
        <p className="w-48 h-10 bg-slate-200 animate-pulse mb-"></p>
        <div className="space-y-6 ">
          <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
          <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
          <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
          <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
          <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
          <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
          <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
          <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
          <p className="w-full h-7 bg-slate-200 animate-pulse"></p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
