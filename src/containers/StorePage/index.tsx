import React, { useState } from "react";
import { useHistory } from "react-router";

import "./storePageStyle.scss";

import { ReactComponent as LocationPin } from "assets/location-pin.svg";
import HeartIcon from "assets/heart.png";
import Menu from "components/Menu";
import BackButton from "components/BackButton";
import { Card, CardSubtitle, CardTitle } from "@progress/kendo-react-layout";

const StorePage: React.FC = () => {
  const history = useHistory();

  const { shopName, shopCategory, shopPhotoUrl } = {
    shopName: "KFC, Salemba Raya",
    shopCategory: "Fast food",
    shopPhotoUrl:
      "https://cdn.discordapp.com/attachments/314440698667466754/838797171234177124/Screen_Shot_2021-05-03_at_22.20.20.png",
  };

  return (
    <div className="store-page-container">
      <BackButton />
      <Card orientation={"horizontal"} className="store-card">
        <div className="store-card-left">
          <CardTitle>{shopName}</CardTitle>
          <CardSubtitle className="store-location-wrap">
            <LocationPin />
            4.5 km away
          </CardSubtitle>
        </div>
        <div className="store-card-right">
          <img src={HeartIcon} />
        </div>
      </Card>

      <Menu shopName={shopName} />
    </div>
  );
};

export default StorePage;
