import { FC, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardImage,
  CardSubtitle,
} from "@progress/kendo-react-layout";
import { Skeleton } from "@progress/kendo-react-indicators";

import "./styles.scss";
import {
  getNearestShops,
  getShopCategories,
  getMostLikedProducts,
} from "util/FirebaseAPI";
import { capitalize } from "helpers";
import { useHistory } from "react-router";

interface ShopCategories {
  [id: string]: {
    name: string;
    photo_url: string;
  };
}

interface Product {
  categories: string[];
  information: string;
  name: string;
  discount_price: number;
  original_price: number;
  photo_url: string;
  total_likes?: number;
}

interface NearestShop {
  distance: number; // in km
  name: string;
  photo_url: string;
  shop_id: string;
}

const Homepage: FC = () => {
  const { push } = useHistory();
  const [shopCategories, setShopCategories] = useState<ShopCategories>({});
  const [mostLikedProducts, setMostLikedProducts] = useState<Product[]>([]);
  const [nearestShops, setNearestShops] = useState<NearestShop[]>([]);

  useEffect(() => {
    const errorHandling = (error: any) => {
      console.error(error);
    };
    const successGetLocationCallback = (pos: GeolocationPosition) => {
      const {
        coords: { longitude, latitude },
      } = pos;

      // Fetch all data that is in homepage
      getShopCategories(
        (res: ShopCategories) => setShopCategories(res),
        errorHandling
      );
      getNearestShops(
        latitude,
        longitude,
        (shops: NearestShop[]) => setNearestShops(shops),
        errorHandling
      );
      getMostLikedProducts((mostLikedProducts: Product[]) => {
        setMostLikedProducts(mostLikedProducts);
      }, errorHandling);
    };

    const errorGetLocationCallback = (error: GeolocationPositionError) => {
      console.log(error.message);
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
  }, []);

  const dummyArr = Array(7).fill(0);
  return (
    <div className="homepage">
      <h2>Nearest from you</h2>

      <div className="slider-container">
        {nearestShops.length > 0
          ? nearestShops.map((shop, index) => {
              return (
                <div
                  className="card-wrapper"
                  key={index}
                  onClick={() => push(`/store/${shop.shop_id}`)}
                >
                  <Card
                    style={{
                      width: 260,
                      boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                      marginTop: "15px",
                    }}
                  >
                    <CardHeader
                      className="k-hbox"
                      style={{ background: "transparent", minHeight: "12vh" }}
                    >
                      <div>
                        <CardTitle
                          style={{
                            marginBottom: "4px",
                            fontSize: "1.3em",
                            minHeight: "5vh",
                          }}
                        >
                          {capitalize(shop.name)}
                        </CardTitle>
                        <CardSubtitle>
                          <p>{shop.distance} km</p>
                        </CardSubtitle>
                      </div>
                    </CardHeader>
                    <CardImage
                      src={shop.photo_url}
                      style={{
                        height: "185px",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Card>
                </div>
              );
            })
          : dummyArr.map((_, index) => {
              return (
                <div className="card-wrapper" key={index}>
                  <Card
                    style={{
                      width: 260,
                      boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                      marginTop: "15px",
                    }}
                  >
                    <CardHeader
                      className="k-hbox"
                      style={{ background: "transparent", minHeight: "12vh" }}
                    >
                      <div>
                        <Skeleton
                          shape={"text"}
                          style={{
                            marginBottom: "4px",
                            fontSize: "1.3em",
                            minHeight: "5vh",
                            width: 225,
                          }}
                        />
                        <Skeleton shape="text" style={{ width: 45 }} />
                      </div>
                    </CardHeader>
                    <Skeleton
                      shape={"rectangle"}
                      style={{ width: "100%", height: 185 }}
                    />
                  </Card>
                </div>
              );
            })}
      </div>

      <h2>Most Liked</h2>
      <div className="slider-container">
        {mostLikedProducts.length > 0
          ? mostLikedProducts.map((product, index) => {
              return (
                <div className="card-wrapper" key={index}>
                  <Card
                    style={{
                      width: 260,
                      boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                      marginTop: "15px",
                      minHeight: "38vh",
                    }}
                  >
                    <CardHeader
                      className="k-hbox"
                      style={{ background: "transparent", minHeight: "8vh" }}
                    >
                      <div>
                        <CardTitle
                          style={{
                            marginBottom: "4px",
                            fontSize: "1.3em",
                          }}
                        >
                          {capitalize(product.name)}
                        </CardTitle>
                        <CardSubtitle>
                          <p>{product.information}</p>
                        </CardSubtitle>
                      </div>
                    </CardHeader>
                    <CardImage
                      src={product.photo_url}
                      style={{
                        height: "185px",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                    <CardActions
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <button
                          className="k-button k-flat"
                          onClick={() => console.log("onClick 1")}
                        >
                          <span
                            className={
                              true
                                ? "k-icon k-i-heart"
                                : "k-icon k-i-heart-outline"
                            }
                          />
                        </button>
                      </div>
                      <span
                        style={{
                          fontSize: "13px",
                          alignSelf: "center",
                          color: "#656565",
                        }}
                      >
                        {product.total_likes ?? 0} likes
                      </span>
                    </CardActions>
                  </Card>
                </div>
              );
            })
          : dummyArr.map((_, index) => {
              return (
                <div className="card-wrapper" key={index}>
                  <Card
                    style={{
                      width: 260,
                      boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                      marginTop: "15px",
                      minHeight: "38vh",
                    }}
                  >
                    <CardHeader
                      className="k-hbox"
                      style={{ background: "transparent", minHeight: "8vh" }}
                    >
                      <div>
                        <Skeleton
                          shape={"text"}
                          style={{
                            marginBottom: "4px",
                            fontSize: "1.3em",
                            minHeight: "5vh",
                            width: 225,
                          }}
                        />
                        <Skeleton shape="text" style={{ width: 45 }} />
                      </div>
                    </CardHeader>
                    <Skeleton
                      style={{
                        height: "185px",
                        maxWidth: "100%",
                      }}
                    />
                    <CardActions
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Skeleton shape="circle" style={{ width: 20 }} />
                      <span
                        style={{
                          fontSize: "13px",
                          alignSelf: "center",
                          color: "#656565",
                        }}
                      >
                        <Skeleton shape="text" style={{ width: 45 }} />
                      </span>
                    </CardActions>
                  </Card>
                </div>
              );
            })}
      </div>
      <h2>By category</h2>
      <div className="slider-container">
        {Object.keys(shopCategories).length > 0
          ? Object.keys(shopCategories).map((id) => {
              return (
                <div className="card-wrapper" key={id}>
                  <Card
                    style={{
                      width: 260,
                      boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                      marginTop: "15px",
                    }}
                  >
                    <CardImage
                      src={shopCategories[id].photo_url}
                      style={{
                        height: "185px",
                        maxWidth: "100%",
                      }}
                    />
                    <CardBody style={{ textAlign: "center" }}>
                      <CardTitle style={{ fontSize: "1em" }}>
                        {capitalize(shopCategories[id].name)}
                      </CardTitle>
                    </CardBody>
                  </Card>
                </div>
              );
            })
          : dummyArr.map((_, index) => {
              return (
                <div className="card-wrapper" key={index}>
                  <Card
                    style={{
                      width: 260,
                      boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                      marginTop: "15px",
                    }}
                  >
                    <Skeleton
                      shape="rectangle"
                      style={{
                        height: "185px",
                        maxWidth: "100%",
                      }}
                    />
                    <CardBody style={{ textAlign: "center" }}>
                      <Skeleton
                        shape="text"
                        style={{ width: 45, margin: "auto" }}
                      />
                    </CardBody>
                  </Card>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Homepage;
