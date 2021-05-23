import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./storePageStyle.scss";

import { ReactComponent as LocationPin } from "assets/location-pin.svg";
import HeartIcon from "assets/heart.png";
import Menu from "components/Menu";
import BackButton from "components/BackButton";
import { Card, CardSubtitle, CardTitle } from "@progress/kendo-react-layout";
import { getShopDetail } from "util/FirebaseAPI";

const StorePage: React.FC = () => {
  const { id }: { id: string } = useParams();
  const [shopState, setShopState] = useState<{
    shopName: string;
    shopCategory: string[];
    shopPhotoUrl: string;
    distance: number;
  }>({
    shopName: "",
    shopCategory: [],
    shopPhotoUrl: "",
    distance: 0,
  });

  const { shopName, distance } = shopState;

  useEffect(() => {
    const successCallback = (res: {
      name: string;
      photo_url: string;
      categories: string[];
      distance: number;
    }) => {
      const { name, photo_url, categories, distance } = res;
      setShopState({
        shopName: name,
        shopPhotoUrl: photo_url,
        shopCategory: categories,
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

  useEffect(() => {}, []);

  return (
    <div className="store-page-container">
      <BackButton />
      <Card orientation={"horizontal"} className="store-card">
        <div className="store-card-left">
          <CardTitle>{shopName}</CardTitle>
          <CardSubtitle className="store-location-wrap">
            <LocationPin />
            {distance} km away
          </CardSubtitle>
        </div>
        <div className="store-card-right">
          <img src={HeartIcon} alt="hearticon" />
        </div>
      </Card>

      <Menu shopId={id} shopName={shopName} />
    </div>
  );
};

export default StorePage;
