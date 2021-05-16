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
import {
  getProductList,
  getUserData,
  isUserLoggedIn,
  signOut,
} from "util/FirebaseAPI";

export interface IMenuProps {}

const Menu: React.FC<IMenuProps> = (props) => {
  const [orderedItemCount, setOrderedItemCount] = useState(0);
  const [orderItemObj, setOrderItemObj] = useState<IOrderedItemType>({});
  const [menuListObj, setMenuListObj] = useState<IMenuJsonListType>();

  const localCartKey = `WHITE_TENT-CART`;

  useEffect(() => {
    // console.log(isUserLoggedIn());
    getProductList(
      "3nK7ah7sp6hzyBZM170A",
      (res: any) => {
        setMenuListObj(res);
      },
      () => {}
    );

    // add product to local
    const orderData = localStorage.getItem(localCartKey);
    if (orderData) {
      console.log("from local", JSON.parse(orderData));
      setOrderItemObj(JSON.parse(orderData));
    }
  }, [localCartKey]);

  const handleAddClick = (e: any, item: IMenuItemType) => {
    e.preventDefault();
    const orderedProductId = e.target.id;
    console.log("add", e.target.id);

    item.orderAmount = item.orderAmount + 1;
    orderItemObj[`${orderedProductId}`] = item;
    console.log("toSave", orderItemObj);

    localStorage.setItem(localCartKey, JSON.stringify(orderItemObj));
    setOrderItemObj(orderItemObj);
    setOrderedItemCount(orderedItemCount + 1); //
  };

  const handleMinClick = (e: any, item: IMenuItemType) => {
    e.preventDefault();
    const orderedProductId = e.target.id;
    item.orderAmount = item.orderAmount - 1;
    orderItemObj[`${orderedProductId}`] = item;
    console.log("toSave", orderItemObj);

    localStorage.setItem(localCartKey, JSON.stringify(orderItemObj));
    setOrderItemObj(orderItemObj);
    setOrderedItemCount(orderedItemCount - 1); //
  };

  const itemRender = (props: any) => {
    const { dataItem, index } = props;
    if (orderItemObj[dataItem.product_id]) {
      // console.log("ya", orderItemObj[dataItem.product_id].orderAmount);
      dataItem.orderAmount = orderItemObj[dataItem.product_id].orderAmount;
      // console.log(dataItem.orderAmount);
    } else {
      dataItem.orderAmount = 0;
    }
    console.log("hiyahiya", dataItem);
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
                <p className="price">{dataItem.original_price}</p>
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
  if (menuListObj !== undefined) {
    // console.log("asd", menuListObj);
    Object.keys(menuListObj).forEach((category) => {
      const menu = menuListObj[category];
      // console.log(menu);
      const header = () => {
        return (
          <ListViewHeader className="menu-header">{category}</ListViewHeader>
        );
      };
      menuRender.push(
        <ListView
          key={`${menuListObj}-${menu[0].product_id}`}
          data={menu}
          item={itemRender}
          header={header}
          style={{ border: "none" }}
        />
      );
    });
  }
  console.log("render\n", orderItemObj);
  return <div className="menu-container">{menuRender}</div>;
};

export default Menu;
