import {Table, Badge, Select, Button, Popconfirm, message, Form } from "antd";
import {
    RedoOutlined,
    DeleteTwoTone,
    EditTwoTone,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./TableManage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { callGetCinema, callGetMovieSearch, callGetSeat } from "~/services/api";
import InputSearchRT from "./InputSearchRT";
 import ModalCreateRoom from "./ModalCreateDate";
// import ModalCreateTour from "./ModalCreateTour";
// import ModalUpdateRoom from "./ModalUpdateRoom";
// import ModalUpdateTour from "./ModalUpdateTour";
// import ModalDeleteTR from "./ModalDeleteTR";
// import ModalViewDetail from "./ModalViewDetail";


const TableMovie = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [typeRT, setTypeRT] = useState("&type_room[]=room&type_room[]=tour")
    const [querySearch, setQuerySearch  ] = useState("")
    const [listRoomTour, setListRoomTour] = useState([])
    

    const [openCreateRoom, setOpenCreateRoom] = useState(false)
    const [openUpdateRoom, setOpenUpdateRoom] = useState(false)
    const [dataUpdateRoom, setDataUpdateRoom] = useState({})


    const [openCreateTour, setOpenCreateTour] = useState(false)
    const [openUpdateTour, setOpenUpdateTour] = useState(false)
    const [datacate, SetDataCate] = useState([])
  
    
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const [openViewModal, setOpenViewModal] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState({});

  //Table Component--------------------------
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width:'200px',
      render: (text, record, index) => {
        return (
          <>
          <div 
            style={{display:'flex', gap:'15px', alignItems:'center', cursor:'pointer'}}
            onClick={()=>{
              setDataViewDetail(record)
              setOpenViewModal(true)
            }}
          >
            <a>{record?.slot_id}</a>

          </div>
          
          </>
        );
      },
    },
    {
      title: "Seat Number",
      dataIndex: "seat_number", // Tên thuộc tính chứa URL của hình ảnh
      key: "seat_number",
      // render: (url) => {
      //   return <img src={url} alt="Image" style={{ width: 200, height: 120, objectFit: "cover" }} />;
      // }
    },
    
    {
      title: "Row",
      dataIndex: "row",
      key: "row",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   width:'400px',
      
    // },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    
    {
      title: "Cinema Name",
      dataIndex: "cinemaRoom", // Đảm bảo bạn đang sử dụng đúng key của object
      render: (cinemaRoom, record) => {
        return <span>{cinemaRoom ? cinemaRoom.name : 'N/A'}</span>;
      }
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Not Available" : "Available"),
    },
    

    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              title="User removal comfirmation"
              placement="leftTop"
              description="Are you sure you want to delete this user?"
              // onConfirm={() => handleDeleteCustomer(record?.id)}
              okText={"Comfirm"}
              cancelText={"Cancel"}
              key={index}
            >
              <DeleteTwoTone
                twoToneColor="#eb2f96"
                style={{ cursor: "pointer" }}
              />
            </Popconfirm>

            <Popconfirm
              title="Update comfirmmation"
              placement="leftTop"
              description="Are you sure you want to update this user?"
              // onConfirm={() => handleChangeStatus(record?.id, record?.status)}
              okText={"Comfirm"}
              cancelText={"Cancel"}
              key={`${index}-key`}
            >
              <EditTwoTone
              twoToneColor="#3cc41a"
              style={{ cursor: "pointer", marginLeft: "20px" }}
            />

            </Popconfirm>
          </>
        );
      },
    },
  
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys >>> ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //pagination

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };

  // Selected
  const handleChange = (value) => {
    setTypeRT(value)
  };

  //Search
  const handleQuerySearch = (searchInput) => {
      setQuerySearch(searchInput)
  }

  //----------------------------------------------------------

  useEffect(() => {
    fetchGetRoomTour();
  }, [querySearch]);


  const fetchGetRoomTour = async () => {
    setIsLoading(true);
    // let queryRT= `index?page=${currentPage}&perpage=${pageSize}`
    // if(typeRT){
    //   queryRT += typeRT
    // }
    // let queryRT = ``
    // if(querySearch){
    //   queryRT += querySearch  
    // }

    const res = await callGetSeat();
    const res2 = await callGetCinema()
    if (res2?.data && res?.data) {
      setListRoomTour(res.data);
      setTotal(res.total)
      SetDataCate(res2.data)
     // console.log("resAll",res);
    }

    setIsLoading(false);
  };
  
  //console.log('dataListRT',listRoomTour);


//Confirm Delete
const handleDelete = async() => {
  setOpenDeleteModal(true)
};

  return (
    <>
      <div className="container-table-cate">
        
        <div className="header-table">
          <div className="title-table">
            <InputSearchRT handleQuerySearch = {handleQuerySearch}/>
          </div>
         
            {typeRT === "&type_room[]=room"?
            
            <Button
            type="primary"
            onClick={() => {
               setOpenCreateRoom(true)
            }}
            > New </Button>
            : 
            <Button
            type="primary"
            onClick={() => {
              setOpenCreateTour(true)
            }}
            >New </Button>
            }
        </div>
        <div
          style={{
            marginLeft: 8,
          }}
        >
          {/* selectedRowKeys la array gom cac phan tu da select */}
          <span>
            {selectedRowKeys.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginBottom: "20px",
                  cursor:'pointer'
                }}
              >
                <span style={{ padding: "5px 8px", border: "1px solid black", borderRadius:'5px' }}>
                  {`Selected ${selectedRowKeys.length} items`}
                </span>               
                  <Button danger onClick={()=>handleDelete()}>Delete Item</Button>
              
              </div>
            ) : (
              ""
            )}
          </span>
        </div>
        <Table
        rowKey={(record) => record.id} // fix select one but select all
          title={() => {
            return (
              <div className="selected-status" style={{display:"flex", justifyContent:'space-between'}}>
                <span>
                  Movie Manager
                </span>
                <span>
                <Select
                  defaultValue="All"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: '&type_room[]=room&type_room[]=tour', label: 'All' },
                    { value: '&type_room[]=room', label: 'Room' },
                    { value: '&type_room[]=tour', label: 'Tour' },
                  ]}
                />
                </span>
              </div>
            );
          }}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={listRoomTour}
            
            onChange={onChange}
            loading={isLoading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              pageSizeOptions: ["5", "10", "15", "20"],
              showSizeChanger: true,
              total: total,
              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]}- {range[1]} / Trên {total}
                  </div>
                );
              },
            }}
        />
      </div>
        
      {/* {typeRT === "&type_room[]=room"?"New Room" : "New Tour"} */}


       <ModalCreateRoom 
        open = {openCreateTour}
        setOpen = {setOpenCreateTour}
        dataView2 = {datacate}
        fetchGetRoomTour = {fetchGetRoomTour}
        setTypeRT = {setTypeRT}
      />

      {/*<ModalUpdateRoom
        dataUpdateRoom = {dataUpdateRoom} 
        setDataUpdateRoom = {setDataUpdateRoom}
        open = {openUpdateRoom}
        setOpen = {setOpenUpdateRoom}
        fetchGetRoomTour = {fetchGetRoomTour}
        setTypeRT = {setTypeRT}

      />

     <ModalCreateTour
       open = {openCreateTour}
       setOpen = {setOpenCreateTour}
       fetchGetRoomTour = {fetchGetRoomTour}
       setTypeRT = {setTypeRT}
     />

     <ModalUpdateTour
        dataUpdateTour = {dataUpdateTour} 
        setDataUpdateTour = {setDataUpdateTour}
        open = {openUpdateTour}
        setOpen = {setOpenUpdateTour}
        fetchGetRoomTour = {fetchGetRoomTour}
        setTypeRT = {setTypeRT}
     />

     <ModalDeleteTR
       open = {openDeleteModal}
       setOpen = {setOpenDeleteModal}
       fetchGetRoomTour = {fetchGetRoomTour}
       selectedRowKeys = {selectedRowKeys}
     />

     <ModalViewDetail
        open = {openViewModal}
        setOpen = {setOpenViewModal}
        dataView = {dataViewDetail}
        setDataView = {setDataViewDetail}
     /> */}
    </>
  );
};

export default TableMovie;
