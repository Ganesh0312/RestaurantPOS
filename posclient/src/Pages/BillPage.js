import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { Modal, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";

function BillPage() {
  const [billsData, setBillsData] = useState([]);
  const [popupModel, setPopupModel] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllBills();
  }, []);

  const getAllBills = async () => {
    try {
      dispatch({
        type: "Show_Loading",
      });
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      console.log(data);
      dispatch({
        type: "Hide_LOADING",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { title: "Id", dataIndex: "_id" },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    { title: "Contact", dataIndex: "contact" },
    { title: "SubTotal", dataIndex: "subTotal" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            onClick={() => {
              setPopupModel(true);
              setSelectedBill(record);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h1>Invoice List</h1>
        </div>
        <Table columns={columns} dataSource={billsData} bordered />
        {popupModel && (
          <Modal
            title="Invoice Details"
            visible={popupModel}
            onCancel={() => {
              setPopupModel(false);
            }}
            footer={null}
          >
            <p>Customer Name: {selectedBill?.customerName}</p>
            <p>Contact: {selectedBill?.contact}</p>
            <p>SubTotal: {selectedBill?.subTotal}</p>
            <p>Tax: {selectedBill?.tax}</p>
            <p>Total Amount: {selectedBill?.totalAmount}</p>
            {/* Add more details as needed */}
          </Modal>
        )}
      </DefaultLayout>
    </>
  );
}

export default BillPage;
