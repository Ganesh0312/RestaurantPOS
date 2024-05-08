import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select, Table, message } from "antd";

const ItemsPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [popupModel, setPopupModel] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      dispatch({
        type: "Show_Loading",
      });
      const { data } = await axios.get("/api/items/get-item");
      setItemsData(data);
      console.log(data);
      dispatch({
        type: "Hide_LOADING",
      });
    } catch (error) {
      console.log(error);
    }
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
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setPopupModel(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post("/api/items/add-item", value);
        message.success("Item Added Successfull");
        getAllItems();
        setPopupModel(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.put("/api/items/edit-item", {
          ...value,
          itemId: editItem._id,
        });
        message.success("Item Updated Successfull");
        getAllItems();
        setPopupModel(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("/api/items/delete-item", { itemId: record._id });
      message.success("Item Deleted Successfull");
      getAllItems();
      setPopupModel(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>ItemList</h1>
        <button
          type="button"
          onClick={() => setPopupModel(true)}
          className="btn btn-primary"
        >
          Add Item
        </button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />
      {popupModel && (
        <Modal
          title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
          visible={popupModel}
          onCancel={() => {
            setPopupModel(false);
            setEditItem(null);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="Drinks">Drinks</Select.Option>
                <Select.Option value="Noodles">Noodles</Select.Option>
                <Select.Option value="Rice">Rice</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end ustify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setPopupModel(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ItemsPage;
