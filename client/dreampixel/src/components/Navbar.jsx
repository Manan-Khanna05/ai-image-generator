import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.js";
import axios from "axios";
export const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, token, setShowLogin, setToken } =
    useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCredits = async () => {
      if (user && token) {
        try {
          const response = await axios.post(
            "/api/user/credits",
            {},
            { headers: { Authorization: token } }
          );
          if (response.data.sucess && response.data.credits !== undefined) {
            setUser({ ...user, creditBalance: response.data.credits });
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchCredits();
  }, [user, token, setUser]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700">
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits Left: {user.creditBalance ?? 10}
              </p>
            </button>
            <div
              className="relative flex items-center"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}>
              <img
                className="w-10 drop-shadow-sm"
                src={assets.profile_icon}
                alt=""
              />
              <p className="text-gray-600 max-sm:hidden pl-4">
                Hey, {user.name ?? "User"}
              </p>
              <div
                className={`absolute ${
                  dropdownOpen ? "block" : "hidden"
                } top-full right-0 z-10 bg-white text-black rounded pt-2 mt-2`}>
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li
                    className="py-1 px-2 cursor-pointer pr-10"
                    onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
