import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown, Space, message } from "antd";
import { DownOutlined } from "@ant-design/icons"
import { ThemeContext } from "~/UseContext";
 import { doLogoutAction } from "~/redux/account/accountSlice";
import styles from "./header.module.scss";

const Header = () => {
  const { url, seturl } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const role = useSelector((state) => state.account.role);

  const handleLogout = () => {
    dispatch(doLogoutAction());
    message.success("Đã đăng xuất thành công");
    navigate("/");
  };

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
      label: <Link to="/single-movie" className={url === "/single-movie" ? styles.active : ""}>SINGLE MOVIE</Link>,
      key: "singleMovie",
    },
    {
      label: <Link to="/show-time" className={url === "/show-time" ? styles.active : ""}>SHOWTIME</Link>,
      key: "showTime",
    },
    {
      label: <Link to="/top-rate">TOP RATED</Link>,
      key: "topRated",
    },
  ];

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
        <div className={styles.logWrapper}>
          <Dropdown overlay={{ items: menuItems }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar src={user?.avatar} />
                {user?.display_name || "Admin"}
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
