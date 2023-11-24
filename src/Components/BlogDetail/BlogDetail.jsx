import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";

import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import axios from "axios";
import DOMPurify from "dompurify";
import HTMLReactParser from "html-react-parser";
import "./BlogDetail.css";

import { useState } from "react";
import { useQuery } from "react-query";
import { Avatar } from "@mui/material";
import useAuthContext from "../../hooks/useAuthContext";
import DetailSkeleton from "../DetailSkeleton";

const BlogDetail = () => {
  const { user } = useAuthContext();
  const [blogDetail, setBlogDetail] = useState({});
  console.log(blogDetail);
  const { isLoading, data, error } = useQuery(
    "blogDetail",
    async () => {
      const result = axios.get(
        `${import.meta.env.VITE_BASEURL}singleBlog/656045e36d0fca6ff6c70fd3`
      );
      return result;
    },
    {
      onSuccess: (data) => {
        setBlogDetail(data.data);
      },
    }
  );

  return isLoading ? (
    <div className="my-container lg:px-24 mt-20  ">
      <DetailSkeleton itemType={"Blog"} />
    </div>
  ) : (
    <div className="my-container lg:px-24 mt-20  text-colorTwo">
      {/* blog & creator info */}
      <div className="space-y-5">
        <h1 className="text-4xl md:text-5xl font-bold">{blogDetail?.title}</h1>
        <div className="flex items-center gap-1">
          <Avatar
            sx={{ width: 40, height: 40 }}
            src={
              blogDetail?.creatorInfo?.photoURL ||
              "https://i.ibb.co/Twp960D/default-profile-400x400.png"
            }
          />
          <h3 className="text-[1.40rem] ">{blogDetail?.creatorInfo?.name}</h3>
        </div>
        <div className="flex justify-between ">
          {/* like and save button */}
          <div className="flex gap-6 md:gap-14 items-center">
            <p>
              <button className="cursor-pointer p-1">
                <FavoriteBorderOutlinedIcon
                  sx={{ color: "#4B5365", fontSize: 28 }}
                />{" "}
              </button>
              123
            </p>
            <button className="cursor-pointer p-1">
              <BookmarkBorderOutlinedIcon
                sx={{ color: "#4B5365", fontSize: 28 }}
              />{" "}
            </button>
          </div>
          {/* edit , share, options button */}
          <div className="flex gap-6 items-center">
            {user?.email === blogDetail?.creatorInfo?.email && (
              <button className="cursor-pointer p-1">
                <DriveFileRenameOutlineOutlinedIcon
                  sx={{ color: "#4B5365", fontSize: 30 }}
                />
              </button>
            )}
            <button className="cursor-pointer p-1">
              <ShareOutlinedIcon sx={{ color: "#4B5365", fontSize: 28 }} />
            </button>
            <button className="cursor-pointer p-1">
              <MoreHorizOutlinedIcon sx={{ color: "#4B5365", fontSize: 28 }} />
            </button>
          </div>
        </div>
      </div>

      {/* blog body */}
      <div id="blog-body" className="mt-10 ">
        {HTMLReactParser(DOMPurify.sanitize(blogDetail?.blogBody))}
      </div>
    </div>
  );
};

export default BlogDetail;
