import { Helmet } from "react-helmet-async";

const ReactHelmet = ({ title, descriptionContent }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={descriptionContent || ""}></meta>
    </Helmet>
  );
};

export default ReactHelmet;
