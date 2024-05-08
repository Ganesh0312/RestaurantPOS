import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPoup, setBillPopup] = useState(false);
  const { cartItem } = useSelector((state) => state.RootReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleIncreament = (record) => {
    dispatch({
      type: "Update_Q",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60"></img>
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncreament(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined className="mx-3" />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: "Delete_From_Cart",
              payload: record,
            })
          }
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItem.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItem]);

  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItem,
        subTotal,
        tax: Number((subTotal / 100).toFixed(2)),
        totalAmount: Number(
          Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
        ),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };

      await axios.post("/api/bills/bills", newObject);
      message.success("bill generated");
      navigate("/bills");
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItem} bordered />
      <div className="d-flex flex-column align-items-end">
        <hr />
        <h3>
          SUBTOTAL : $<b>{subTotal}</b>
        </h3>
        <Button type="primary" onClick={() => setBillPopup(true)}>
          Create Invoice
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        visible={billPoup}
        onCancel={() => setBillPopup(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="customerName" label="CustomerName">
            <Input />
          </Form.Item>
          <Form.Item name="contact" label="Contact">
            <Input />
          </Form.Item>
          <Form.Item name="paymentMode" label="Payment Mode">
            <Select>
              <Select.Option value="Card">Card</Select.Option>
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="UPI">UPI</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-it">
            <h5>
              Sub Total : <b>{subTotal}</b>
            </h5>
            <h5>
              Tax : <b>{(subTotal / 100).toFixed(2)}</b>
            </h5>
            <h5>
              GRAND TOTAL :{" "}
              <b>
                {Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))}
              </b>
            </h5>
          </div>

          <div className="d-flex justify-content-end ustify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setBillPopup(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Generate Bill
            </button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
