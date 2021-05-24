import React, { useEffect, useState } from "react";

import "./orderDetailPageStyle.scss";
import BackButton from "../../components/BackButton";
import { Card, CardSubtitle, CardTitle } from "@progress/kendo-react-layout";
import { ReactComponent as LocationPin } from "assets/location-pin.svg";
import {
  ListView,
  ListViewFooter,
  ListViewHeader,
} from "@progress/kendo-react-listview";
import { IMenuItemType } from "util/interfaces";
import { formatRupiah } from "util/utils";
import {
  finishTransaction,
  getLastActiveTransaction,
  getShopDetail,
} from "util/FirebaseAPI";
import { Skeleton } from "@progress/kendo-react-indicators";

const OrderDetailPage: React.FC = () => {
  const SHOP_FEE = 3000;
  const [orderItemObjList, setOrderItemObjList] = useState<
    Partial<IMenuItemType>[]
  >();
  const [shopId, setShopId] = useState("");
  const [orderId, setorderId] = useState("");
  const [subtotalPrice, setSubtotalPrice] = useState(0);
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

      if (shopId) {
        getShopDetail(
          shopId,
          { longitude, latitude },
          successCallback,
          failedCallback
        );
      }
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
  }, [shopId]);

  useEffect(() => {
    const getLastActiveTransactionSuccess = (res: {
      total_price: number;
      status: string;
      order_id: string;
      shop_id: string;
      menu: {
        product_id: string;
        product_name: string;
        total_amount: number;
      }[];
    }) => {
      setorderId(res.order_id);
      setSubtotalPrice(res.total_price);
      setShopId(res.shop_id);
      setOrderItemObjList(
        res.menu.map((item) => ({
          name: item.product_name,
          orderAmount: item.total_amount,
          ...item,
        }))
      );
    };

    const getLastActiveTransactionFailed = (res: any) => {};

    getLastActiveTransaction(
      getLastActiveTransactionSuccess,
      getLastActiveTransactionFailed
    );
  }, []);

  const onFinishOrder = () => {
    const successCb = () => {
      window.location.href = "/";
    };
    if (orderId) {
      finishTransaction(orderId, successCb, console.log);
    }
  };

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

  return (
    <div className="order-page-container">
      <BackButton />
      <Card orientation={"horizontal"} className="store-card">
        <div className="icon-wrap">
          <LocationPin />
        </div>
        <div className="order-middle">
          <CardTitle>Pick Up Location</CardTitle>
          {shopState.shopName !== "" ? (
            <CardSubtitle className="middle-subtitle">
              {shopState.address}
            </CardSubtitle>
          ) : (
            <Skeleton shape="text" style={{ width: 100 }} />
          )}
        </div>
        <div className="order-right">
          <a href="/">Set</a>
        </div>
      </Card>
      <ListViewHeader
        className="menu-header"
        style={{ textTransform: "capitalize", margin: "1rem 0 0" }}
      >
        Order ID
      </ListViewHeader>
      <h4>{orderId}</h4>
      {orderItemObjList && (
        <ListView
          data={orderItemObjList}
          style={{ border: "none" }}
          item={itemRender}
          header={header}
          footer={footer}
        />
      )}
      <div className="bottom-footer" onClick={onFinishOrder}>
        Finish Order
      </div>
    </div>
  );
};

export default OrderDetailPage;
