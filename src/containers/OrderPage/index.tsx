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
import { useHistory, useParams } from "react-router-dom";
import { getShopDetail } from "util/FirebaseAPI";
import { createOrder } from "util/FirebaseAPI";
import { LOCAL_CART_KEY, LOCAL_CART_SHOP_KEY } from "util/constants";

const OrderPage: React.FC = () => {
  const SHOP_FEE = 3000;
  const [orderItemObjList, setOrderItemObjList] = useState<
    IOrderedItemType[]
  >();
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const { id }: { id: string } = useParams();
  const [shopState, setShopState] = useState<{
    shopName: string;
    shopCategory: string[];
    shopPhotoUrl: string;
    address: string;
    distance: number;
  }>({
    shopName: "",
    shopCategory: [],
    shopPhotoUrl: "",
    address: "",
    distance: 0,
  });
  const history = useHistory();

  useEffect(() => {
    const successCallback = (res: {
      name: string;
      photo_url: string;
      categories: string[];
      distance: number;
      address: string;
    }) => {
      const { name, photo_url, categories, distance, address } = res;
      setShopState({
        shopName: name,
        shopPhotoUrl: photo_url,
        shopCategory: categories,
        address: address,
        distance,
      });
    };
    const failedCallback = (err: any) => {
      console.log(err);
    };

    const successGetLocationCallback = (pos: GeolocationPosition) => {
      const {
        coords: { longitude, latitude },
      } = pos;
      getShopDetail(
        id,
        { longitude, latitude },
        successCallback,
        failedCallback
      );
    };

    const errorGetLocationCallback = () => {
      console.log("warn error getting user's location");
    };

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        successGetLocationCallback,
        errorGetLocationCallback,
        { enableHighAccuracy: true }
      );
    } else {
      // When current device doesn't support getting user's location
      console.warn("Geolocation is not supported by this browser");
    }
  }, [id]);

  useEffect(() => {
    let orderData = localStorage.getItem(LOCAL_CART_KEY);
    let subtotalPrice = 0;
    let total_saved = 0;
    if (orderData) {
      const orderDataObj = JSON.parse(orderData);
      const orderItemList = [];
      for (const productId in orderDataObj) {
        const {
          original_price,
          discount_price,
          // name,
          orderAmount,
          // information,
        } = orderDataObj[productId];
        subtotalPrice += discount_price
          ? Number(discount_price) * orderAmount
          : Number(original_price) * orderAmount;

        total_saved += discount_price ? original_price - discount_price : 0;

        orderItemList.push(orderDataObj[productId]);
      }
      setOrderItemObjList(orderItemList);
      setSubtotalPrice(subtotalPrice);
      setTotalSaved(total_saved);
      // setOrderItemObjList(JSON.parse(orderData));
    }
  }, []);

  const itemRender = (props: any) => {
    const dataItem: IMenuItemType = props.dataItem;
    const {
      orderAmount,
      name,
      // information,
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
            <p className="price">{formatRupiah(subtotalPrice)}</p>
          </div>
          <div className="subtotal-row">
            <p>Order fee</p>
            <p className="price">{formatRupiah(SHOP_FEE)}</p>
          </div>
        </div>
        <div className="total-row">
          <p>Total</p>
          <p className="price">{formatRupiah(subtotalPrice + SHOP_FEE)}</p>
        </div>
      </ListViewFooter>
    );
  };

  const handlePlaceOrder = () => {
    const menu: any = [];
    orderItemObjList?.forEach((item) => {
      menu.push({
        product_name: item.name,
        product_id: item.product_id,
        total_amount: item.orderAmount,
      });
    });
    const payload = {
      shop_name: shopState.shopName,
      shop_id: id,
      total_price: subtotalPrice + SHOP_FEE,
      menu,
      total_save: totalSaved,
    };
    createOrder(
      payload,
      (res: any) => {
        localStorage.removeItem(LOCAL_CART_KEY);
        localStorage.removeItem(LOCAL_CART_SHOP_KEY);
        const transactionID = res.order_id;
        history.push("/transaction/" + transactionID);
      },
      (err: any) => {
        console.error(err);
      }
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
          <CardSubtitle className="middle-subtitle">
            {shopState.address}
          </CardSubtitle>
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
      <div className="bottom-footer" onClick={handlePlaceOrder}>
        Place Order
      </div>
    </div>
  );
};

export default OrderPage;
