import CountUp from 'react-countup';
import { Col, Row, Statistic, Card } from 'antd';
import './dash.scss';
import { callAllMovies, callGetAllCustomer, callGetAllPrice, callGetAllPriceRe, callGetAllReservation, callGetAllStats, callGetCinema, callGetSeat, callGetShowTimeDate, callGetShowTimeHour, getTopMoviesByReservations } from '../../../services/api';
import { ResponsiveContainer, BarChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell } from 'recharts';

import { useEffect, useState } from 'react';
const COLORS = ['#0088FE', '#FF8042'];
const DashBoard = () => {
    const formatter = (value) => <CountUp end={value} separator="," />;
    const [chartData, setChartData] = useState({})
    const [pieDatas, setPieData] = useState({})
    const [datas, setData] = useState([]);
    useEffect(()=>{
        fetchGetInfoDash()
        
    },[])

    const fetchGetInfoDash = async() => {
        const res = await callAllMovies();
        const res2 = await callGetCinema()
        const res2Re = await callGetShowTimeDate()
        const res3 = await callGetShowTimeHour()
        const res4 = await callGetAllCustomer()
        const res4Re = await callGetSeat()
        const res5 = await callGetAllReservation()
        const res6 = await callGetAllStats() 
        
        // const revenue = res4 - res4Re
        console.log("res>>>",res);
        if(res && res.data){
            // setChartData(res.data)
            setChartData({
                customer: res4.total,
                movies: res.total,
                cinema: res2.total,
                reservations: res5.total,
                showtimedate: res2Re.total,
                showtime: res3.total,
                available_seats: res4Re.total,
                revenue: res5.totalPrice,
                reservations_pending: res6?.data.pending || 0,
                reservations_completed: res6?.data.complete || 0,
                reservations_cancled: res6?.data.cancled || 0,
                receipt_pending: res5[2]?.receiptCount || 0,
                receipt_cancel: res5[0]?.receiptCount || 0,
            })
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await getTopMoviesByReservations();
            if (res && res.data) {
                const pieData = res.data.map((item) => ({
                    name: item.movieName,
                    value: item.reservationCount,
                }));
                setPieData(pieData);
                setData(res.data)
            }
        };

        fetchData();
    }, []);
   
    const data = [
        {
          "name": "pending",
          "op": chartData?.reservations_pending,
        },
        {
          "name": "completed",
          "oa": chartData?.reservations_completed,
         
        },
        {
          "name": "cancled",
          "oe": chartData?.reservations_cancled,
        },

        
      ]
    const pieData = chartData?.data?.map((item, index) => ({ name: item.movie_name, value: item.total }));
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Màu sắc cho từng phần

    
    return ( 
        <>
            <div className='dashboard-container'>
                <div className="header-dash">
                
                <Row gutter={5} style={{display:'flex', gap:'70px'}}>
                    <Col span={4}>
                        <Card bordered={false}>
                        
                            <Statistic title="Customer" value={chartData?.customer} formatter={formatter} />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic title="Movies" value={chartData?.movies} formatter={formatter} />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic title="Cinema" value={chartData?.cinema} formatter={formatter} />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic title="Reservations" value={chartData?.reservations} formatter={formatter} />
                        </Card>
                    </Col>

                </Row>
                <Row gutter={5} style={{display:'flex', gap:'70px',  marginTop: '60px'}}>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic title="ShowTimeDate" value={chartData?.showtimedate} formatter={formatter} />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic title="ShowTimeHours" value={chartData?.showtime} formatter={formatter} />
                        </Card>
                    </Col>
                    <Col span={4}  >
                        <Card bordered={false}>
                            <Statistic title="Available Seats" value={chartData?.available_seats} formatter={formatter}  />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic title="Revenue (VNĐ)" value={chartData?.revenue} formatter={formatter} />
                        </Card>
                    </Col>
                </Row>
                </div>
                <div className="chart-dash">
                    
                    <ResponsiveContainer width="50%" height={400}>
                            <BarChart  data={data} >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="op" fill="#84add8" />
                                <Bar dataKey="oa" fill="#3ae414" />
                                <Bar dataKey="oe" fill="#f89728" />
                                <Bar dataKey="oc" fill="#e41414" />
                                <Bar dataKey="opc" fill="#e414d6" />
                            </BarChart>
                    </ResponsiveContainer>    
                    <ResponsiveContainer width="50%" height={400}>
                        <PieChart>
                            
                        <Pie
                            data={pieDatas}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label={(entry) => `${entry.name}: ${entry.value}`}
                        >
                            {datas.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                            
                            <Legend verticalAlign="bottom" height={36} />
                            
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>


                </div>
           
            
        </>
     );
}
 
export default DashBoard;