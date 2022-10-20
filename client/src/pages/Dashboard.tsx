import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <>
      Dashboard<Link to="/admin/users">Users</Link>
    </>
  );
};
