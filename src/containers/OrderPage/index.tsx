import React, { useEffect, useState } from "react";

import "./orderPageStyle.scss";
import BackButton from "../../components/BackButton";
import { Card, CardSubtitle, CardTitle } from "@progress/kendo-react-layout";
import { ReactComponent as LocationPin } from "assets/location-pin.svg";
import {
  ListView,
  ListViewFooter,
  ListViewHeader,
} from "@progress/kendo-react-listview";
import { IMenuItemType, IOrderedItemType } from "util/interfaces";
import { formatRupiah } from "util/utils";

const OrderPage: React.FC = () => {
  const localCartKey = `WHITE_TENT-CART`;
  const [orderItemObjList, setOrderItemObjList] = useState<
    IOrderedItemType[]
  >();

  useEffect(() => {
    let orderData = localStorage.getItem(localCartKey);
    if (orderData) {
      const orderDataObj = JSON.parse(orderData);
      const orderItemList = [];
      for (const productId in orderDataObj) {
        // const {
        //   original_price,
        //   discount_price,
        //   name,
        //   orderAmount,
        //   information,
        // } = orderDataObj[productId];
        // const mockObj = {
        //   product_name: name,
        //   product_id: productId,
        //   total_amount: orderAmount,
        // };
        orderItemList.push(orderDataObj[productId]);
      }
      setOrderItemObjList(orderItemList);
      // setOrderItemObjList(JSON.parse(orderData));
    }
  }, [localCartKey]);
  console.log(orderItemObjList);

  const itemRender = (props: any) => {
    const dataItem: IMenuItemType = props.dataItem;
    console.log(dataItem);
    const {
      orderAmount,
      name,
      information,
      discount_price,
      original_price,
    } = dataItem;
    let idx = 0;

    return (
      <div className="order-item" key={`${name};${idx++}`}>
        <div className="left">{orderAmount}x</div>
        <div className="middle">{name}</div>
        <div className="right">
          {discount_price
            ? formatRupiah(discount_price)
            : formatRupiah(original_price)}
        </div>
      </div>
    );
  };

  const header = () => {
    return (
      <ListViewHeader
        className="menu-header"
        style={{ textTransform: "capitalize", margin: "1rem 0 0" }}
      >
        Order Summary
      </ListViewHeader>
    );
  };

  const footer = () => {
    return (
      <ListViewFooter style={{ boxShadow: "none", border: "none" }}>
        <div className="top-footer">
          <div className="subtotal-row">
            <p>Subtotal</p>
            <p className="price">{formatRupiah(100000)}</p>
          </div>
          <div className="subtotal-row">
            <p>Order fee</p>
            <p className="price">{formatRupiah(10000)}</p>
          </div>
        </div>
        <div className="total-row">
          <p>Total</p>
          <p className="price">{formatRupiah(10000)}</p>
        </div>
      </ListViewFooter>
    );
  };

  return (
    <div className="order-page-container">
      <BackButton />
      <Card orientation={"horizontal"} className="store-card">
        <div className="icon-wrap">
          <LocationPin />
        </div>
        <div className="order-middle">
          <CardTitle>Pick Up Location</CardTitle>
          <CardSubtitle className="middle-subtitle">Jelambar Jaya</CardSubtitle>
        </div>
        <div className="order-right">
          <a href="/">Set</a>
        </div>
      </Card>
      {orderItemObjList && (
        <ListView
          data={orderItemObjList}
          style={{ border: "none" }}
          item={itemRender}
          header={header}
          footer={footer}
        />
      )}
      <div className="bottom-footer">Place Order</div>
    </div>
  );
};

export default OrderPage;
