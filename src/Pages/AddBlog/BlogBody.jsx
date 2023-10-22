import DOMPurify from "dompurify";
import HTMLReactParser from "html-react-parser";

import { useEffect, useState } from "react";

const BlogBody = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const blogBody = localStorage.getItem("body");
    if (blogBody) {
      const sanitizedHTML = DOMPurify.sanitize(blogBody);
      setBlog(sanitizedHTML);
    }
  }, []);

  return <div>{HTMLReactParser(`${blog}`)}</div>;
};

export default BlogBody;
