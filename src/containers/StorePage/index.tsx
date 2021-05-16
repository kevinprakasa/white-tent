import React, { useState } from "react";
import { useHistory } from "react-router";

import "./storePageStyle.scss";
import { ReactComponent as Star } from "assets/star.svg";
import Menu from "components/Menu";
import CategorySeparator from "components/CategorySeparator";
import BackButton from "components/BackButton";
import { IMenuJsonListType, IOrderedItemType } from "util/interfaces";

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
      <div className="store-top-section">
        <BackButton />
        <div className="store-top-left-section">
          <div className="store-name-category-wrap">
            <p className="store-name">{shopName}</p>
            <p className="store-category">{shopCategory}</p>
          </div>
        </div>
        <div className="store-photo-section">
          <img src={shopPhotoUrl} />
        </div>
      </div>

      <div className="sliding-store-detail">
        <div className="store-rating-wrap">
          <div className="rating-icon-container">
            <div className="star-icon-wrap">
              <Star />
            </div>
            4.5
          </div>
          <div className="rating-label">2.6k+ Rating</div>
        </div>
        <div className="separator"></div>

        <div className="store-rating-wrap">
          <div className="rating-icon-container">
            <div className="star-icon-wrap">
              <Star />
            </div>
            4.5
          </div>
          <div className="rating-label">2.6k+ Rating</div>
        </div>
        <div className="separator"></div>

        <div className="store-rating-wrap">
          <div className="rating-icon-container">
            <div className="star-icon-wrap">
              <Star />
            </div>
            4.5
          </div>
          <div className="rating-label">2.6k+ Rating</div>
        </div>
      </div>

      <CategorySeparator />
      <Menu />
    </div>
  );
};

export default StorePage;