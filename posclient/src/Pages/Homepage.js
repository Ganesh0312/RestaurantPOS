import React, { useState, useEffect } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import ItemList from "../Components/ItemList";
import { useDispatch } from "react-redux";
const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectCategory, setSelectCategory] = useState("drinks");
  const catagories = [
    {
      name: "drinks",
      imageUrl:
        "https://img.freepik.com/free-photo/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai_188544-12370.jpg?w=900&t=st=1713766895~exp=1713767495~hmac=2c99ff8285e17c530437e89a7b3a6a871ac519c0e06d1dfad11eccf29c6c4166",
    },
    {
      name: "rice",
      imageUrl: "https://picsum.photos/id/237/200/300",
    },
    {
      name: "Noodles",
      imageUrl: "https://picsum.photos/id/237/200/300",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "Show_Loading",
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);
  return (
    <div>
      <DefaultLayout>
        <div className="d-flex">
          {catagories.map((catagory) => (
            <div
              key={catagory.name}
              className={`d-flex category ${
                selectCategory === catagory.name && "catagory-active"
              }`}
              onClick={() => setSelectCategory(catagory.name)}
              style={{
                border: "2px solid gray",
                marginRight: "25px",
                marginBottom: "10px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              <h4>{catagory.name}</h4>
              <img
                src={catagory.imageUrl}
                alt={catagory.name}
                height="60"
                width="80"
                style={{ margineleft: "10px" }}
              />
            </div>
          ))}
        </div>
        <Row>
          {itemsData
            .filter((i) => i.category === selectCategory)
            .map((item) => (
              <Col xs={24} lg={6} md={12} sm={6}>
                <ItemList key={item.id} item={item} />
              </Col>
            ))}
        </Row>
      </DefaultLayout>
    </div>
  );
};

export default Homepage;
