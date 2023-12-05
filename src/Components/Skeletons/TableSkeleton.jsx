const TableSkeleton = () => {
  return (
    <div className="space-y-5 p-10">
      <div className="flex space-x-10">
        <p className="w-20 h-7 bg-slate-200 animate-pulse"></p>
        <p className="w-20 h-7 bg-slate-200 animate-pulse"></p>
        <p className="w-20 h-7 bg-slate-200 animate-pulse"></p>
        <p className="w-20 h-7 bg-slate-200 animate-pulse"></p>
      </div>
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
  );
};

export default TableSkeleton;
