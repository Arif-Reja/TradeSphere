
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    useState(false);
  const [user, setUser] = useState(null);

  const profileRef = useRef(null);

 
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("user");
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch (error) {
        console.error("Unable to read user information:", error);
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);

    return () => window.removeEventListener("storage", loadUser);
  }, []);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Dashboard", path: "/" },
    { label: "Orders", path: "/orders" },
    { label: "Holdings", path: "/holdings" },
    { label: "Positions", path: "/positions" },
    { label: "Funds", path: "/funds" },
    { label: "Apps", path: "/apps" },
  ];

  const displayName =
    user?.fullName ||
    user?.name ||
    user?.username ||
    user?.firstName ||
    user?.email?.split("@")[0] ||
    "User";

  const initials = displayName
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsProfileDropdownOpen(false);

    
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className="menu-container">
      <Link
        to="/"
        className="dashboard-logo"
        aria-label="Go to Dashboard"
      >
        <img
          src="/logo.png"
          alt="Zerodha"
          className="dashboard-logo"
        />
      </Link>

      <div className="menus">
        <ul>
          {menuItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`menu-link ${isActive ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="profile-wrapper" ref={profileRef}>
          <button
            type="button"
            className="profile"
            onClick={() =>
              setIsProfileDropdownOpen((previous) => !previous)
            }
            aria-expanded={isProfileDropdownOpen}
            aria-label="Open account menu"
          >
            <span className="avatar">{initials || "U"}</span>
            <span className="username">{displayName}</span>
            <span aria-hidden="true">▾</span>
          </button>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <strong>{displayName}</strong>
                {user?.email && <span>{user.email}</span>}
              </div>

              <hr />

              <button
                type="button"
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  navigate("/profile");
                }}
              >
                Profile
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  navigate("/settings");
                }}
              >
                Settings
              </button>

              <hr />

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
