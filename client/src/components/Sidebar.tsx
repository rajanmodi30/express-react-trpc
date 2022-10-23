import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { trpc } from "../utils/trpc";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { removeAll } = useAuthStore();

  const logOut = () => {
    logOutUser.mutate();
    removeAll();
    navigate("/");
  };

  const logOutUser = trpc.auth.logOut.useMutation();
  return (
    <>
      Sidebar
      <button onClick={logOut}>Log Out</button>
    </>
  );
};
