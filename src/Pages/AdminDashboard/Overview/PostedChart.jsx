import { Box, Tooltip } from "@mui/material";
import {
  BarChart,
  BarPlot,
  ChartsAxisHighlight,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  ResponsiveChartContainer,
} from "@mui/x-charts";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";

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

  return (
    <div>
      <h1 className="text-3xl leading-5">
        Recipes and blogs data{" "}
        <span className="text-base opacity-90">(Last 6 months)</span>
      </h1>
      <Box sx={{ width: "100%", maxWidth: 700 }}>
        <ResponsiveChartContainer
          yAxis={[{ id: "quantity" }]}
          xAxis={[
            {
              scaleType: "band",
              data: getLastSixMonth(),
              id: "x-axis-id",
            },
          ]}
          series={[
            {
              type: "bar",
              data: series.recipes,
              label: "Recipe",
              id: "recipe",
            },
            { type: "bar", data: series.blogs, label: "Blog", id: "blog" },
          ]}
          height={300}
          margin={{ left: 45, right: 45 }}
        >
          <ChartsAxisHighlight x="band" y="none" />
          <ChartsTooltip />
          <ChartsLegend slotProps={{ legend: { hidden: false } }} />
          <BarPlot />
          <ChartsYAxis axisId="quantity" label="Quantity" />
          <ChartsXAxis label="Months" position="bottom" axisId="x-axis-id" />
        </ResponsiveChartContainer>
      </Box>
    </div>
  );
};

export default PostedChart;
