import React from "react";
import { Card } from "antd";
import { useDispatch } from "react-redux";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const handlleAddToCard = () => {
    dispatch({
      type: "UpdateCart",
      payload: { ...item, quantity: 1 },
    });
  };

  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{
          width: 240,
          marginBottom: 20,
        }}
        cover={
          <img alt={item.name} src={item.image} style={{ height: "250px" }} />
        }
      >
        <Meta title={item.name} />
        <button
          onClick={() => handlleAddToCard()}
          type="button"
          class="btn btn-primary"
        >
          Add to Cart
        </button>
      </Card>
    </div>
  );
};

export default ItemList;
