import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import useAuthContext from "../hooks/useAuthContext";

export const RecipesAndBlogsDataContext = createContext(null);
const RecipesAndBlogsProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [unreadAvailable, setUnreadAvailable] = useState();
  const [bannerInView, setBannerInView] = useState(false);

  // notifications
  const {
    isLoading: notificationsLoading,
    refetch: notificationRefetch,
    data: notifications,
  } = useQuery(
    ["notifications"],
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/myNotifications/${user?.email}`
      );
      return result.data;
    },
    { enabled: !!user }
  );
  const { isLoading: trendingQuickVoicesLoading, data: trendingQuickVoices } =
    useQuery(["trendingQuickVoices"], async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/trendingQuickVoices`
      );
      return result.data;
    });

  useEffect(() => {
    //  setting notification beacon
    notifications?.find((notifi) => {
      if (notifi.read === false) {
        return setUnreadAvailable(true);
      } else {
        setUnreadAvailable(false);
      }
    });
  }, [notifications]);

  const recipesAndBlogsData = {
    trendingRecipes: trendingQuickVoices?.trending,
    quickRecipes: trendingQuickVoices?.quickAndEasyRecipes,
    morselVoices: trendingQuickVoices?.voices,
    trendingQuickVoicesLoading,
    notifications,
    notificationsLoading,
    unreadAvailable,
    setUnreadAvailable,
    notificationRefetch,
    bannerInView,
    setBannerInView,
  };

  return (
    <RecipesAndBlogsDataContext.Provider value={recipesAndBlogsData}>
      {children}
    </RecipesAndBlogsDataContext.Provider>
  );
};

export default RecipesAndBlogsProvider;
