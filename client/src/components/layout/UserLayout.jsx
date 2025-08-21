// layouts/UserLayout.jsx
import UserNav from "../UserNav.jsx";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserNav />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default UserLayout;
