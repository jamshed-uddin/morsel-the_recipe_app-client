import { BarChart } from "@mui/x-charts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const PostedChart = ({ recipes, blogs }) => {
  const getLastSixMonth = () => {
    const lastSixMonths = [];
    for (let i = 5; i >= 0; i--) {
      const month = (new Date().getMonth() - i + 12) % 12;
      lastSixMonths.push(months[month]);
    }
    return lastSixMonths;
  };

  const lastSixMonthData = (data) => {
    const lastSix = data?.filter((singleData) => {
      const sixMonthAgo = new Date();
      sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
      return new Date(singleData.createdAt) >= sixMonthAgo;
    });
    return lastSix;
  };
  const lastSixMonthBlogs = lastSixMonthData(blogs);
  const lastSixMonthRecipes = lastSixMonthData(recipes);

  const groupByMonth = (data) => {
    const monthGroup = {};
    data?.map((singleData) => {
      const monthIndex = new Date(singleData.createdAt).getMonth();

      monthGroup[months[monthIndex]] =
        (monthGroup[months[monthIndex]] || 0) + 1;
    });
    return monthGroup;
  };

  const monthlySortedBlogs = groupByMonth(lastSixMonthBlogs);
  const monthlySortedRecipes = groupByMonth(lastSixMonthRecipes);

  const prepareData = (recipe, blog) => {
    const series = { recipes: [], blogs: [] };
    const lastSixMonths = getLastSixMonth();
    for (let i = 0; i < lastSixMonths.length; i++) {
      series.recipes.push(recipe[lastSixMonths[i]] || 0);
      series.blogs.push(blog[lastSixMonths[i]] || 0);
    }

    return series;
  };

  const series = prepareData(monthlySortedRecipes, monthlySortedBlogs);
  console.log(series);

  return (
    <div>
      <h1 className="text-3xl ">
        Recipes and blogs data{" "}
        <span className="text-base opacity-90">(Last 6 months)</span>
      </h1>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: getLastSixMonth(),
          },
        ]}
        series={[
          { data: series.recipes, label: "Recipe", id: "recipe" },
          { data: series.blogs, label: "Blog", id: "blog" },
        ]}
        width={500}
        height={300}
      ></BarChart>
    </div>
  );
};

export default PostedChart;
