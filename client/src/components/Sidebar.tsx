import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth";
import { trpc } from "../utils/trpc";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { removeAll } = useAuthStore();

  const logOut = () => {
    mutate();
  };

  const { mutate, isSuccess, error, data, isError } =
    trpc.auth.logOut.useMutation();

  if (isSuccess) {
    if (data.status) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    removeAll();
    navigate("/");
  }

  if (isError) {
    toast.error(error.message);
    if (error.data?.code === "UNAUTHORIZED") {
      removeAll();
      navigate("/");
    }
  }

  return (
    <>
      Sidebar
      <button onClick={logOut}>Log Out</button>
    </>
  );
};
