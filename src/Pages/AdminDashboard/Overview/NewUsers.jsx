import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

const NewUsers = ({ users }) => {
  // const getNewUsers = ()=>{
  //   const exceptAdminAndRecent
  const [newUsers, setNewUsers] = useState();
  // }
  useEffect(() => {
    const newUsers = users?.filter((user) => {
      const timeDifference = new Date() - new Date(user.createdAt);
      const differenceInMonths = parseInt(
        timeDifference / (1000 * 60 * 60 * 24 * 30)
      );

      return differenceInMonths <= 2 && user.role !== "admin";
    });

    setNewUsers(newUsers);
  }, [users]);

  console.log(newUsers);

  return (
    <div>
      <h1 className="text-3xl ">New users</h1>
      <div className="space-y-2 mt-2">
        {newUsers?.map((user, index) => (
          <div key={index} className="flex items-center gap-2 ">
            <Avatar src={user?.photoURL} />
            <h4 className="text-lg">{user?.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewUsers;
