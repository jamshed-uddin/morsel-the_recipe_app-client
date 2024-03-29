const ErrorElement = ({ error, refetch }) => {
  return (
    <div className="my-container lg:px-24 mt-20  text-colorTwo h-[calc(100vh-90px)] flex justify-center items-center">
      <div className="space-y-2">
        <h1 className="text-3xl text-colorOne ">
          {error?.toLowerCase() === "network error"
            ? "Seems like you are offline"
            : "Something went wrong!"}
        </h1>
        <p className="text-center">
          <button
            onClick={() => refetch()}
            className="border-[1px] border-colorOne rounded-lg px-3 py-1"
          >
            Try again
          </button>
        </p>
      </div>
    </div>
  );
};

export default ErrorElement;
