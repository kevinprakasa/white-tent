import React, { useEffect, useState } from "react";
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";
import {
  Card,
  CardTitle,
  CardImage,
  CardSubtitle,
  CardActions,
} from "@progress/kendo-react-layout";

import "./menuStyle.scss";
import { Button } from "@progress/kendo-react-buttons";
import {
  IMenuJsonListType,
  IOrderedItemType,
  IMenuItemType,
} from "util/interfaces";
import { getProductList, createOrder } from "util/FirebaseAPI";

import { formatRupiah } from "util/utils";
import { useHistory } from "react-router";
import { LOCAL_CART_KEY, LOCAL_CART_SHOP_KEY } from "util/constants";

export interface IMenuProps {
  shopId: string;
  shopName: string;
}

const Menu: React.FC<IMenuProps> = (props) => {
  const [orderedItemCount, setOrderedItemCount] = useState(0);
  const [orderItemObj, setOrderItemObj] = useState<IOrderedItemType>({});
  const [menuListObj, setMenuListObj] = useState<IMenuJsonListType>();
  const [isFooterHidden, setIsFooterHidden] = useState(false);
  const { shopName, shopId } = props;

  const history = useHistory();
  const shopOrdered = localStorage.getItem(LOCAL_CART_SHOP_KEY);
  const orderData = localStorage.getItem(LOCAL_CART_KEY);

  useEffect(() => {
    getProductList(
      shopId,
      (res: any) => {
        setMenuListObj(res);
      },
      (err: any) => {
        console.error(err);
      }
    );

    // add product to local
    if (shopOrdered === shopName && orderData) {
      setOrderItemObj(JSON.parse(orderData));
    }
  }, [LOCAL_CART_KEY]);

  const handleAddClick = (e: any, item: IMenuItemType) => {
    e.preventDefault();
    const orderedProductId = e.target.id;

    item.orderAmount = item.orderAmount + 1;
    if (shopOrdered !== shopName) {
      // if cart different from current shop replace with new one
      localStorage.removeItem(LOCAL_CART_KEY);
      localStorage.setItem(LOCAL_CART_SHOP_KEY, shopName);
    }
    orderItemObj[`${orderedProductId}`] = item;

    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(orderItemObj));
    setOrderItemObj(orderItemObj);
    setOrderedItemCount(orderedItemCount + 1); //
  };

  const handleMinClick = (e: any, item: IMenuItemType) => {
    e.preventDefault();
    const orderedProductId = e.target.id;
    item.orderAmount = item.orderAmount - 1;
    if (item.orderAmount === 0) {
      delete orderItemObj[`${orderedProductId}`];
    } else {
      orderItemObj[`${orderedProductId}`] = item;
    }

    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(orderItemObj));
    setOrderItemObj(orderItemObj);
    setOrderedItemCount(orderedItemCount - 1); //
  };

  const itemRender = (props: any) => {
    const dataItem: IMenuItemType = props.dataItem;

    if (orderItemObj[dataItem.product_id]) {
      dataItem.orderAmount = orderItemObj[dataItem.product_id].orderAmount; // add optional orderAmount field
    } else {
      dataItem.orderAmount = 0;
    }

    return (
      <Card
        orientation={"vertical"}
        className="menu-card"
        key={`${dataItem.product_id}-${dataItem.orderAmount}`}
      >
        <div className="menu-top">
          <div className="menu-photo-text-wrap">
            <div className="menu-item-img-wrap">
              <CardImage src={dataItem.photo_url} />
            </div>
            <div className="menu-item-text-wrap">
              <CardTitle className="menu-title">{dataItem.name}</CardTitle>
              <CardSubtitle className="menu-subtitle">
                {dataItem.information}
              </CardSubtitle>
              <div className="price-add-btn-wrap">
                <div>
                  <p
                    className={`price ${
                      dataItem.discount_price ? "slashed" : ""
                    }`}
                  >
                    {formatRupiah(dataItem.original_price)}
                  </p>
                  {dataItem.discount_price && (
                    <p className="price">
                      {formatRupiah(dataItem.discount_price)}
                    </p>
                  )}
                </div>
                <CardActions layout={"end"}>
                  {dataItem.orderAmount > 0 ? (
                    <>
                      <Button
                        className="plus-min"
                        id={dataItem.product_id}
                        onClick={(e: any) => {
                          handleMinClick(e, dataItem);
                        }}
                      >
                        -
                      </Button>
                      <div
                        key={`${dataItem.product_id}-${dataItem.orderAmount}`}
                      >
                        {dataItem.orderAmount}
                      </div>
                      <Button
                        className="plus-min"
                        id={dataItem.product_id}
                        onClick={(e: any) => {
                          handleAddClick(e, dataItem);
                        }}
                      >
                        +
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="chip-like"
                      id={dataItem.product_id}
                      onClick={(e: any) => {
                        handleAddClick(e, dataItem);
                      }}
                    >
                      Add
                    </Button>
                  )}
                </CardActions>
              </div>
            </div>
          </div>
          {/* <div className="like-icon-wrap">
            <img src={Heart} />
          </div> */}
        </div>
        {/* <div className="menu-bottom"></div> */}
      </Card>
    );
  };

  const menuRender: any = [];
  let keyIdx = 0;
  if (menuListObj !== undefined) {
    Object.keys(menuListObj).forEach((category) => {
      const menu = menuListObj[category];
      const header = () => {
        return (
          <ListViewHeader
            className="menu-header"
            style={{ textTransform: "capitalize" }}
          >
            {category}
          </ListViewHeader>
        );
      };
      menuRender.push(
        <ListView
          key={`${menu}-${keyIdx++}`}
          data={menu}
          item={itemRender}
          header={header}
          style={{ border: "none" }}
        />
      );
    });
  }

  const orderCartCount = Object.keys(orderItemObj).length;

  const countTotalPrice = () => {
    if (orderCartCount === 0) return 0;
    let total: number = 0;
    for (const key in orderItemObj) {
      // console.log(key);
      const ordered = orderItemObj[`${key}`];
      const price = ordered.discount_price
        ? ordered.discount_price
        : ordered.original_price;
      total += Number(price);
    }
    return total;
  };

  return (
    <>
      <div
        className="menu-container"
        style={{
          paddingBottom: `${orderCartCount === 0 ? "0rem" : "4rem"}`,
        }}
      >
        {menuRender}
      </div>
      {orderCartCount > 0 && shopOrdered === shopName && (
        <div
          className="menu-order-footer"
          style={{ opacity: `${isFooterHidden ? 0 : 1}` }}
          onClick={() => history.push(`/order/${shopId}`)}
        >
          <div className="menu-order-left">
            <p className="order-count">{orderCartCount} items</p>
            <p className="store-name">{shopName}</p>
          </div>
          <div className="subtotal-price">
            {formatRupiah(countTotalPrice(), "Rp")}
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
