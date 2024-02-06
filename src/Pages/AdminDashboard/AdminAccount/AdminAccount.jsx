import ReactHelmet from "../../../Components/ReactHelmet/ReactHelmet";
import useSingleUser from "../../../hooks/useSingleUser";
import AccountPage from "../../AccountPage/AccountPage";

const AdminAccount = () => {
  const { currentUser } = useSingleUser();

  return (
    <div>
      <ReactHelmet
        title={`${currentUser?.name} - Morsel`}
        descriptionContent={currentUser?.bio}
      />
      <AccountPage></AccountPage>
    </div>
  );
};

export default AdminAccount;
