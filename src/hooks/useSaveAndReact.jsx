import axios from "axios";
import React, { useState } from "react";
import useSingleUser from "./useSingleUser";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

const useSaveAndReact = ({ itemType, itemId, itemFectched }) => {
  const { currentUser } = useSingleUser();
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(false);

  const {
    isLoading: isLikedAndSavedLoading,
    data: isLikedAndSaved,
    error: errorMessage,
    refetch: reloadIslikedAndIsSaved,
  } = useQuery(
    "isSavedAndLiked",
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/isLikedAndSaved?userEmail=${
          currentUser?.email
        }&itemId=${itemId}&itemType=${itemType}`
      );
      setIsLiked(result?.data?.isLiked);
      setIsSaved(result?.data?.isSaved);
      return result;
    },
    { enabled: !!currentUser && itemFectched } // query enables when currentUser is available
  );

  const handleItemSave = async () => {
    if (!currentUser) {
      return toast.error("You are not signed in");
    }
    setIsSaved((prevState) => !prevState);

    const body = {
      userId: currentUser?._id,
      userEmail: currentUser?.email,
      itemType: itemType === "blog" ? "Blog" : "Recipe", //need the first letter in capital because it's given as refPath in DB schema.
    };
    // if item already saved call delete action
    if (isSaved) {
      setOptionsLoading(true);

      await axios
        .delete(
          `${
            import.meta.env.VITE_BASEURL
          }/deleteSavedItem?itemId=${itemId}&userEmail=${currentUser?.email}`
        )
        .then(() => {
          setOptionsLoading(false);
          reloadIslikedAndIsSaved();
          //  setOpen and message for snackbar alert for save/unsave
          toast(`${itemType === "blog" ? "Blog unsaved" : "Recipe unsaved"}`);
        })
        .catch(() => {
          setOptionsLoading(false);
          reloadIslikedAndIsSaved();
        });
      return;
    }
    setOptionsLoading(true);

    await axios
      .post(`${import.meta.env.VITE_BASEURL}/saveNewItem/${itemId}`, body)
      .then(() => {
        setOptionsLoading(false);
        reloadIslikedAndIsSaved();

        toast(`${itemType === "blog" ? "Blog saved" : "Recipe saved"}`);
      })
      .catch(() => {
        setOptionsLoading(false);
        reloadIslikedAndIsSaved();
      });
  };

  const handleReaction = async () => {
    setIsLiked((prevState) => !prevState);

    // if item already liked calls dislike action
    if (isLiked) {
      const body = {
        userId: currentUser?._id,
        action: "dislike",
        actionFrom: itemType,
      };
      await axios
        .patch(`${import.meta.env.VITE_BASEURL}/changeReaction/${itemId}`, body)
        .then(() => {
          reloadIslikedAndIsSaved();
          //   blogDetailRefetch();
        })
        .catch(() => {
          reloadIslikedAndIsSaved();
          //   blogDetailRefetch();
        });
      return;
    }

    // if item not liked yet
    const body = {
      userId: currentUser?._id,
      action: "like",
      actionFrom: itemType,
    };
    await axios
      .patch(`${import.meta.env.VITE_BASEURL}/changeReaction/${itemId}`, body)
      .then(() => {
        reloadIslikedAndIsSaved();
        // blogDetailRefetch();
      })
      .catch(() => {
        reloadIslikedAndIsSaved();
        // blogDetailRefetch();
      });
  };

  return {
    isLiked,
    setIsLiked,
    isSaved,
    setIsSaved,
    handleItemSave,
    handleReaction,
    optionsLoading,
  };
};

export default useSaveAndReact;
