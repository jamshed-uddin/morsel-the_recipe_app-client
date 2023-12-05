import useSingleUser from "../../../hooks/useSingleUser";
import AccountPage from "../../AccountPage/AccountPage";

const AdminAccount = () => {
  const { currentUserLoading } = useSingleUser();

  if (currentUserLoading) {
    return (
      <div className="flex items-center gap-5 p-8">
        {/* profile photo */}
        <div>
          <p className="w-36 h-36 rounded-full bg-slate-200 animate-pulse"></p>
        </div>

        {/* name  and bio */}
        <div className="space-y-4">
          <p className="w-80 h-8 bg-slate-200 animate-pulse"></p>
          <div className="space-y-2">
            <p className="w-96 h-4 bg-slate-200 animate-pulse"></p>
            <p className="w-80 h-4 bg-slate-200 animate-pulse"></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <AccountPage></AccountPage>
    </div>
  );
};

export default AdminAccount;
