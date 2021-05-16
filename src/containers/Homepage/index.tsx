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
import "./styles.scss";
import {
  getNearestShops,
  getShopCategories,
  getMostLikedProducts,
} from "util/FirebaseAPI";
import { capitalize } from "helpers";

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

export const Homepage: FC = () => {
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

  return (
    <div className="homepage">
      <h2>Nearest from you</h2>

      <div className="slider-container">
        {nearestShops.map((shop, index) => {
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
                  style={{ background: "transparent" }}
                >
                  <div>
                    <CardTitle
                      style={{
                        marginBottom: "4px",
                        fontSize: "1.3em",
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
                  style={{ height: "185px", maxWidth: "100%" }}
                />
              </Card>
            </div>
          );
        })}
      </div>

      <h2>Most Liked</h2>
      <div className="slider-container">
        {mostLikedProducts.map((product, index) => {
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
                  style={{ background: "transparent" }}
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
                  style={{ height: "185px", maxWidth: "100%" }}
                />
                <CardActions
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <button
                      className="k-button k-flat"
                      onClick={() => console.log("onClick 1")}
                    >
                      <span
                        className={
                          true ? "k-icon k-i-heart" : "k-icon k-i-heart-outline"
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
        })}
      </div>
      <h2>By category</h2>
      <div className="slider-container">
        {Object.keys(shopCategories).map((id) => {
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
                  style={{ height: "185px", maxWidth: "100%" }}
                />
                <CardBody style={{ textAlign: "center" }}>
                  <CardTitle style={{ fontSize: "1em" }}>
                    {capitalize(shopCategories[id].name)}
                  </CardTitle>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
