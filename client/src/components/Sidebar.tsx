import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { removeAll } = useAuthStore();
  const logOut = () => {
    removeAll();
    navigate("/");
  };
  return (
    <>
      Sidebar
      <button onClick={logOut}>Log Out</button>
    </>
  );
};
