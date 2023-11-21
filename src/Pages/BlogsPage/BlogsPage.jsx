import Card from "../../Components/Card/Card";

const BlogsPage = () => {
  return (
    <div>
      <div className="my-container py-10 ">
        <div>
          <h1 className="uppercase text-6xl font-bold text-colorOne">Blogs</h1>
          <div className="flex gap-5 flex-wrap">
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
            <div>category</div>
          </div>
        </div>
        <div className="lg:grid grid-cols-3 gap-x-4 gap-y-8 mt-8">
          {[1, 2, 3, 4, 5, 6].map((index, el) => (
            <Card itemType="Blog" key={index}></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
