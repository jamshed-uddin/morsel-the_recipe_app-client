const CardSkeleton = () => {
  return (
    <div className="bg-slate-100 rounded-2xl h-[27rem] pt-2">
      <div className="h-3/4 w-[95%] mx-auto bg-slate-200 bg-opacity-50 animate-pulse rounded-2xl"></div>

      <div className="space-y-2 px-3 mt-8">
        <p className="rounded h-4 w-full bg-slate-200 bg-opacity-50 animate-pulse "></p>
        <p className="rounded h-4 w-4/5 bg-slate-200 bg-opacity-50 animate-pulse"></p>
      </div>
    </div>
  );
};

export default CardSkeleton;
