import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const NotificationIcon = ({ clickFunction, unreadAvailable }) => {
  return (
    <div onClick={clickFunction} className="link relative w-fit cursor-pointer">
      <NotificationsOutlinedIcon sx={{ fontSize: 28 }} />
      {unreadAvailable && (
        <div className="absolute top-1 right-0 pl-[1.5px] pt-[1.6px]   w-3 h-3 rounded-full bg-white">
          <p className="w-2 h-2 rounded-full bg-colorTwo"></p>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
