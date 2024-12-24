import React, { useState, useEffect } from 'react';
import { Card, Row, Col, DatePicker, Table, Statistic, Space } from 'antd';
import { BarChart, PieChart, ResponsiveContainer, Bar, Pie, Tooltip, Legend } from 'recharts';
import CountUp from 'react-countup';
import { callGetAllStats } from '../../../services/api';

const Report = () => {
    const [reportData, setReportData] = useState({});
    const [loading, setLoading] = useState(false);
    const { RangePicker } = DatePicker;

    const formatter = (value) => <CountUp end={value} separator="," />;

    const columns = [
        {
            title: 'Movie Name',
            dataIndex: 'movieName',
            key: 'movieName',
        },
        {
            title: 'Total Bookings',
            dataIndex: 'totalBookings',
            key: 'totalBookings',
            sorter: (a, b) => a.totalBookings - b.totalBookings,
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
            render: (value) => `${value.toLocaleString()} VNĐ`,
            sorter: (a, b) => a.revenue - b.revenue,
        }
    ];

    return (
        <div className="report-container">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Date Filter */}
                <Card>
                    <RangePicker onChange={(dates) => console.log(dates)} />
                </Card>

                {/* Summary Stats */}
                <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Statistic 
                                title="Total Revenue" 
                                value={reportData.totalRevenue} 
                                formatter={formatter}
                                suffix="VNĐ"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic 
                                title="Total Bookings" 
                                value={reportData.totalBookings} 
                                formatter={formatter}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic 
                                title="Success Rate" 
                                value={reportData.successRate} 
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic 
                                title="Average Ticket Price" 
                                value={reportData.avgPrice}
                                formatter={formatter}
                                suffix="VNĐ"
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Charts */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="Booking Status">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie 
                                        data={reportData.statusData} 
                                        dataKey="value"
                                        nameKey="name"
                                    />
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Revenue Trend">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={reportData.revenueData}>
                                    <Bar dataKey="revenue" fill="#8884d8" />
                                    <Tooltip />
                                    <Legend />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                </Row>

                {/* Detailed Table */}
                <Card title="Movie Performance">
                    <Table 
                        columns={columns} 
                        dataSource={reportData.movieStats}
                        loading={loading}
                    />
                </Card>
            </Space>
        </div>
    );
};

export default Report;