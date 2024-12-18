import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    DatabaseOutlined,
    HeartTwoTone,
    FileDoneOutlined,
    TeamOutlined,
    UserOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, message } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './layout.scss';
import { useDispatch, useSelector } from 'react-redux';

import { doLogoutAction } from '../../redux/account/accountSlice';

const { Content, Footer, Sider } = Layout;


const items = [
    {
        label: <Link to='/admin'>Dashboard</Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined />
    },
    {
        label: <span>Manage Users</span>,
        // key: 'user',
        icon: <UserOutlined />,
        children: [
            {
                label: <Link to='/admin/customer'>Customer</Link>,
                key: 'customer',
                icon: <TeamOutlined />,
            },
            {
                label: <Link to='/admin/staff'>Staff</Link>,
                key: 'staff',
                icon: <TeamOutlined />,
            },
        ]
    },
    {
        label: <Link to='/admin/movies'>Movies</Link>,
        key: 'movie',
        icon: <DatabaseOutlined />
    },
    {
        label: <Link to='/admin/cinema'>Cinema</Link>,
        key: 'cinema',
        icon: <ExceptionOutlined />
    },
    {
        label: <Link to='/admin/seat'>Seat Slot</Link>,
        key: 'seat',
        icon: <ExceptionOutlined />
    },
    {
        label: <Link to='/admin/date'>ShowtimeDate</Link>,
        key: 'date',
        icon: <ExceptionOutlined />
    },
    {
        label: <Link to='/admin/hour'>ShowtimeHours</Link>,
        key: 'hour',
        icon: <ExceptionOutlined />
    },
    
    {
        label: <Link to='/admin/stock'>Reports</Link>,
        key: 'Reports',
        icon: <FileDoneOutlined />
    },

];

//fuck

const LayoutAdmin = () => {
    const userRole = useSelector(state => state.account.role);
    const userName = useSelector(state =>  state.account.admin.name )
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');

    const userAdmin = useSelector(state => state.account.admin);
    const role = userAdmin?.role;

   // console.log(userAdmin);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(doLogoutAction());
        message.success("Đã đăng xuất thành công")
        navigate('/');
    }

    const itemsDropdown = [
        {
            label: <label style={{ cursor: 'pointer' }}>Account Manager</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Log Out</label>,
            key: 'logout',
        },
    ];


    return (
        <Layout
            style={{ minHeight: '100vh' }}
            className="layout-admin"
        >
            <Sider
                theme='light'
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                    {userRole}
                </div>
                <Menu
                    defaultSelectedKeys={[activeMenu]}
                    mode="inline"
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)}
                />
            </Sider>

            <Layout>
                <div className='admin-header'>
                    <span>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </span>
                    <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Welcome {userName}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Content>
                    <Outlet />
                </Content>

            </Layout>
        
        </Layout>
    );
};

export default LayoutAdmin;