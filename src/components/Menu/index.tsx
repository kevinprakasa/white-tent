import React from "react";
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";
import {
  Card,
  CardTitle,
  CardImage,
  CardSubtitle,
  CardActions,
} from "@progress/kendo-react-layout";

import "./menuStyle.scss";
import Heart from "assets/heart.png";
import { Button } from "@progress/kendo-react-buttons";
import CategorySeparator from "components/CategorySeparator";

export interface IMenuProps {
  category: string;
}

const Menu: React.FC<IMenuProps> = (props) => {
  const { category } = props;

  const header = () => {
    return <ListViewHeader className="menu-header">{category}</ListViewHeader>;
  };

  const itemRender = (props: any) => {
    const item = props.dataItem;
    return (
      <Card orientation={"vertical"} className="menu-card">
        <div className="menu-top">
          <div className="menu-photo-text-wrap">
            <div className="menu-item-img-wrap">
              <CardImage src={item.photoURL} />
            </div>
            <div className="menu-item-text-wrap">
              <CardTitle>{item.name}</CardTitle>
              <CardSubtitle>{item.details}</CardSubtitle>
              <p className="price">{item.price}</p>
            </div>
          </div>
          <div className="like-icon-wrap">
            <img src={Heart} />
          </div>
        </div>
        <div className="menu-bottom">
          <CardActions layout={"end"}>
            <Button
              look={"outline"}
              className="chip"
              style={{ borderRadius: "12px" }}
            >
              Add
            </Button>
          </CardActions>
        </div>
      </Card>
    );
  };

  const mockedData = [
    {
      name: "5 PLUS 3 OR",
      price: "79.000",
      photoURL:
        "https://cdn.discordapp.com/attachments/314440698667466754/838797171234177124/Screen_Shot_2021-05-03_at_22.20.20.png",
      details: "5 Pcs Ayam OR + 3 Nasi",
    },
    {
      name: "5 PLUS 3 OR",
      price: "79.000",
      discountedPrice: "50.000",
      photoURL:
        "https://cdn.discordapp.com/attachments/314440698667466754/838797171234177124/Screen_Shot_2021-05-03_at_22.20.20.png",
      details: "5 Pcs Ayam OR + 3 Nasi",
    },
  ];

  return (
    <div className="menu-container">
      <ListView data={mockedData} item={itemRender} header={header} />
      <CategorySeparator />
    </div>
  );
};

export default Menu;
