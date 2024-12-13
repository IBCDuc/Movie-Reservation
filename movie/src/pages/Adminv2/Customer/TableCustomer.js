import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Popconfirm,
  message,
  notification,
  Badge
} from "antd";

import {DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import "./tableCustomer.scss";
// import { callGetAllCustomer, callUpdateStatusCustomer, callDeleteCustomer } from "../../../services/api";
import InputSearchCus from "./InputSearchCus";
import { callGetAllCustomer, callDeleteCustomer } from "~/services/api";

const TableCustomer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [listCustomer, setListCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusCustomer,setStatusCustomer] = useState("");
 

  const [searchQuery, setSearchQuery] = useState("");
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const formatDate = (isoDate) => {
    return isoDate.split('T')[0].split('-').reverse().join('/');
  };

  //Delete
  const handleDeleteCustomer = async (id) => {
    //console.log('id',id);
    const idDelete = {
      "id":id
    }

    
    const res = await callDeleteCustomer(idDelete);
    if (res && res.status === "success") {
      if (res.message == "delete thanh cong" ) {
        message.success("Delete successfully!");
        await fetchCustomerWithPaginate();
    } else {
        notification.error({
          message: "Something gone wrong!!!",
          description: "Something gone wrong!!!",
          duration: 3,
        });
    }
     //console.log('check res delete =>',res);
    };
  }

  // Change status
  const handleChangeStatus = async(id, currentStatus) => {
    let statusCus = "0"
    if (currentStatus === 1){
            statusCus = "0"
         }else if(currentStatus === 0){
            statusCus = "1"
         }

        // console.log('current',currentStatus);
        // console.log('after set',statusCus);

        // const res = await callUpdateStatusCustomer(id, statusCus)
        // console.log(res)
        // if(res && res?.data){
        //   setStatusCustomer(res.data.status)
        //  // console.log('object',res);
        // }

  }

  const columns = [
    {
      title: "ID",
      dataIndex: "user_id",
      key: "user_id",
     
      render: (text, record, index) => {
        return (
          <a
            href="#"
            key={index}
            onClick={() => {
              // console.log("record", record);
              // setDataViewUser(record);
              // setOpenViewModal(true);
            }}
           
          >
            {record?.user_id}
          </a>
        );
      },
    },
    {
      title: "Display Name",
      dataIndex: "user_name",
      key: "user_name",
    
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
     
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
     
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    // {
    //     title: "Status",
    //     dataIndex: "status",
    //     key:'status',
    //     render: (text, record, index) => {
    //       return (
    //         <>
    //           {record?.status === 1 ? (
    //             <Badge status="success" text="Public" />
    //           ) : (
    //             <Badge status="warning" text="UnPublic" />
    //           )}
    //         </>
    //       );
    //     },
    // },
    {
      title: "Create At",
      dataIndex: "create_at",
      key: "create_at",
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString('vi-VN'); 
      }
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
              onConfirm={() => handleDeleteCustomer(record?.user_id)}
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
              onConfirm={() => handleChangeStatus(record?.id, record?.status)}
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

  // Customer -- /api/v2/customer/index?page=1&perpage=5&search=1%20ng%C6%B0%C6%A1%CC%80i

  const fetchCustomerWithPaginate = async () => {
    setIsLoading(true);
    let query = `index?page=${currentPage}&perpage=${pageSize}`;
    if(searchQuery){
      query+=searchQuery;
    }
    const res = await callGetAllCustomer();

    if (res && res?.data) {

       setListCustomer(res.data);
       setTotal(res.total);
      
    }
    setIsLoading(false);
    //console.log('resDataUser >>>', res)
   };

    console.log('listCustomer >>>', listCustomer)
   
  useEffect(() => {
    fetchCustomerWithPaginate();
  }, [currentPage, pageSize]);

  const onChange = (pagination, filters, sorter, extra) => {
    //  console.log('params', pagination.current);
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };

  const handleQuerySearch = (searchQr) => {
      //console.log(searchQr);
      setSearchQuery(searchQr);
  }


  return (
    <>
      <Row className="table-user">
        <Col span={24}>
        <InputSearchCus handleQuerySearch={handleQuerySearch}/>
          <Table
            rowKey={(record) => record.id}
            title={() => {
              return (
                <>
                
                  <div className="header-table">
                    <div className="title-table">Customer Manager</div>
                    
                  </div>
                </>
              );
            }}
           
            columns={columns}
            dataSource={listCustomer}
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
        </Col>
      </Row>
      
    </>
  );

};

export default TableCustomer;
