import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown, Space, message } from "antd";
import { DownOutlined } from "@ant-design/icons"
import { ThemeContext } from "~/UseContext";
 import { doLogoutAction } from "~/redux/account/accountSlice";
import styles from "./header.module.scss";
import imgReplace from "~/assets/avatarLogo.jpg";
const Header = () => {
  const { url, seturl } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const admin = useSelector((state) => state.account.admin);
  const user = useSelector((state) => state.account.user);
  const role = useSelector((state) => state.account.role);
  console.log('user la >>>> hehehe')
  console.log("Current state:", {
    admin,
    user,
    role,
    fullState: useSelector((state) => state.account)
  });
  const handleLogout = () => {
    dispatch(doLogoutAction());
    message.success("Đã đăng xuất thành công");
    navigate("/");
  };
  const items = [
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
          Đăng nhập
        </label>
      ),
      key: "login",
    },
  ]

  const menuItems = [
    {
      label: <Link to="/" className={url === "/" ? styles.active : ""}>HOME</Link>,
      key: "home",
    },
    {
      label: <Link to="/movie" className={url === "/movie" ? styles.active : ""}>MOVIE</Link>,
      key: "movie",
    },
    {
      label: <Link to="/show-time" className={url === "/show-time" ? styles.active : ""}>SHOWTIME</Link>,
      key: "showTime",
    },
    {
      label: <Link to="/history" className={url === "/show-time" ? styles.active : ""}>STATISTICS</Link>,
      key: "showTime",
    },
    {
      label: <Link to="/about-us">ABOUT US</Link>,
      key: "About us",
    },
  ];

  if (role === "user") {
    items.unshift(
      {
        label: (
          <label
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/personal/profile")}
          >
            Quản lý profile
          </label>
        ),
        key: "profile",
      },
      {
        label: (
          <label
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/personal/history")}
          >
            Lịch sử đặt hàng
          </label>
        ),
        key: "order",
      },
      {
        label: (
          <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
            Đăng xuất
          </label>
        ),
        key: "logout",
      }
    );
  }

  if (role === "admin") {
    menuItems.push({
      label: <span onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</span>,
      key: "logout",
    });
  }

  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <img src="https://i.imghippo.com/files/grryP1727434394.png" alt="Logo" />
        </div>
        <nav>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <li key={item.key} onClick={() => seturl(item.key)}>
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <div className="toggleNavbar">
            <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', height: '100%', marginTop: '1px' }}>
                    <Space align="center">
                        <Avatar
                          size={32}             
                            // src={user?.avatar || admin?.avatar || imgReplace}
                            src={user?.user?.avatar || admin?.avatar || imgReplace}
                            style={{ marginLeft: '35px' }}
                        />
                        <span style={{ fontSize: '17px', fontWeight: 'bold' }}>
                            {user?.user?.user_name || admin?.display_name || "Account"}
                        </span>
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
