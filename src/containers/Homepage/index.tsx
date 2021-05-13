import { FC, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardActions,
  CardImage,
  CardSubtitle,
  Avatar,
} from "@progress/kendo-react-layout";
import "./styles.scss";
import {
  getNearestShops,
  getShopCategories,
  getMostLikedProducts,
} from "util/FirebaseAPI";

const cardsData = [
  {
    thumbnailSrc:
      "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/bg_flag.jpg",
    headerTitle: "bg_traditions",
    headerSubtitle: "Bulgaria, Europe",
    commentsExpanded: false,
    postLiked: false,
    comments: [],
    newCommentTextValue: "",
    postLikes: 174,
    scrollViewItems: {
      url:
        "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rose_festival.jpg",
    },
  },
  {
    thumbnailSrc:
      "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila_lakes.jpg",
    headerTitle: "bg_mountains",
    headerSubtitle: "Bulgaria, Europe",
    commentsExpanded: false,
    postLiked: false,
    comments: [],
    newCommentTextValue: "",
    postLikes: 962,
    scrollViewItems: {
      url:
        "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila.jpg",
    },
  },
  {
    thumbnailSrc:
      "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila_lakes.jpg",
    headerTitle: "bg_mountains",
    headerSubtitle: "Bulgaria, Europe",
    commentsExpanded: false,
    postLiked: false,
    comments: [],
    newCommentTextValue: "",
    postLikes: 962,
    scrollViewItems: {
      url:
        "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila.jpg",
    },
  },
  {
    thumbnailSrc:
      "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila_lakes.jpg",
    headerTitle: "bg_mountains",
    headerSubtitle: "Bulgaria, Europe",
    commentsExpanded: false,
    postLiked: false,
    comments: [],
    newCommentTextValue: "",
    postLikes: 962,
    scrollViewItems: {
      url:
        "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila.jpg",
    },
  },
  {
    thumbnailSrc:
      "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila_lakes.jpg",
    headerTitle: "bg_mountains",
    headerSubtitle: "Bulgaria, Europe",
    commentsExpanded: false,
    postLiked: false,
    comments: [],
    newCommentTextValue: "",
    postLikes: 962,
    scrollViewItems: {
      url:
        "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila.jpg",
    },
  },
  {
    thumbnailSrc:
      "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila_lakes.jpg",
    headerTitle: "bg_mountains",
    headerSubtitle: "Bulgaria, Europe",
    commentsExpanded: false,
    postLiked: false,
    comments: [],
    newCommentTextValue: "",
    postLikes: 962,
    scrollViewItems: {
      url:
        "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila.jpg",
    },
  },
  {
    thumbnailSrc:
      "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila_lakes.jpg",
    headerTitle: "bg_mountains",
    headerSubtitle: "Bulgaria, Europe",
    commentsExpanded: false,
    postLiked: false,
    comments: [],
    newCommentTextValue: "",
    postLikes: 962,
    scrollViewItems: {
      url:
        "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila.jpg",
    },
  },
  {
    thumbnailSrc:
      "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila_lakes.jpg",
    headerTitle: "bg_mountains",
    headerSubtitle: "Bulgaria, Europe",
    commentsExpanded: false,
    postLiked: false,
    comments: [],
    newCommentTextValue: "",
    postLikes: 962,
    scrollViewItems: {
      url:
        "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila.jpg",
    },
  },
  {
    thumbnailSrc:
      "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila_lakes.jpg",
    headerTitle: "bg_mountains",
    headerSubtitle: "Bulgaria, Europe",
    commentsExpanded: false,
    postLiked: false,
    comments: [],
    newCommentTextValue: "",
    postLikes: 962,
    scrollViewItems: {
      url:
        "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila.jpg",
    },
  },
  {
    thumbnailSrc:
      "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila_lakes.jpg",
    headerTitle: "bg_mountains",
    headerSubtitle: "Bulgaria, Europe",
    commentsExpanded: false,
    postLiked: false,
    comments: [],
    newCommentTextValue: "",
    postLikes: 962,
    scrollViewItems: {
      url:
        "https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila.jpg",
    },
  },
];

export const Homepage: FC = () => {
  useEffect(() => {
    const successGetLocationCallback = (pos: GeolocationPosition) => {
      console.log("CURRENT POSTIION", pos);
      const {
        coords: { longitude, latitude },
      } = pos;
      getShopCategories(
        (res: any) => console.log("Shop categories ===>", res),
        (err: any) => console.log(err)
      );
      getNearestShops(
        { longitude, latitude },
        (nearestShops: any) => console.log("nearest Shops ===>", nearestShops),
        console.log
      );
      getMostLikedProducts((mostLikedProducts: any) => {
        console.log("MOST LIKED PRODUCTS", mostLikedProducts);
      }, console.log);
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
      console.log("Geolocation is not supported by this browser");
    }
  }, []);

  return (
    <div>
      <h2>Nearest from you</h2>

      <div className="slider-container">
        {cardsData.map((card, index) => {
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
                  <Avatar type="image" size="medium" shape="circle">
                    <img
                      style={{ width: 45, height: 45 }}
                      src={card.thumbnailSrc}
                    />
                  </Avatar>
                  <div>
                    <CardTitle style={{ marginBottom: "4px" }}>
                      {card.headerTitle}
                    </CardTitle>
                    <CardSubtitle>
                      <p>{card.headerSubtitle}</p>
                    </CardSubtitle>
                  </div>
                </CardHeader>
                <CardImage
                  src={card.scrollViewItems.url}
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
                          card.postLiked
                            ? "k-icon k-i-heart"
                            : "k-icon k-i-heart-outline"
                        }
                      />
                    </button>
                    <button
                      className="k-button k-flat"
                      onClick={() => console.log("onClick 2")}
                    >
                      <span className="k-icon k-i-comment" />
                    </button>
                    <button className="k-button k-flat">
                      <span className="k-icon k-i-share" />
                    </button>
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      alignSelf: "center",
                      color: "#656565",
                    }}
                  >
                    {card.postLikes} likes
                  </span>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>

      <h2>Most Liked</h2>
      <div className="slider-container">
        {cardsData.map((card, index) => {
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
                  <Avatar type="image" size="medium" shape="circle">
                    <img
                      style={{ width: 45, height: 45 }}
                      src={card.thumbnailSrc}
                    />
                  </Avatar>
                  <div>
                    <CardTitle style={{ marginBottom: "4px" }}>
                      {card.headerTitle}
                    </CardTitle>
                    <CardSubtitle>
                      <p>{card.headerSubtitle}</p>
                    </CardSubtitle>
                  </div>
                </CardHeader>
                <CardImage
                  src={card.scrollViewItems.url}
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
                          card.postLiked
                            ? "k-icon k-i-heart"
                            : "k-icon k-i-heart-outline"
                        }
                      />
                    </button>
                    <button
                      className="k-button k-flat"
                      onClick={() => console.log("onClick 2")}
                    >
                      <span className="k-icon k-i-comment" />
                    </button>
                    <button className="k-button k-flat">
                      <span className="k-icon k-i-share" />
                    </button>
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      alignSelf: "center",
                      color: "#656565",
                    }}
                  >
                    {card.postLikes} likes
                  </span>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
      <h2>By category</h2>
      <div className="slider-container">
        {cardsData.map((card, index) => {
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
                  <Avatar type="image" size="medium" shape="circle">
                    <img
                      style={{ width: 45, height: 45 }}
                      src={card.thumbnailSrc}
                    />
                  </Avatar>
                  <div>
                    <CardTitle style={{ marginBottom: "4px" }}>
                      {card.headerTitle}
                    </CardTitle>
                    <CardSubtitle>
                      <p>{card.headerSubtitle}</p>
                    </CardSubtitle>
                  </div>
                </CardHeader>
                <CardImage
                  src={card.scrollViewItems.url}
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
                          card.postLiked
                            ? "k-icon k-i-heart"
                            : "k-icon k-i-heart-outline"
                        }
                      />
                    </button>
                    <button
                      className="k-button k-flat"
                      onClick={() => console.log("onClick 2")}
                    >
                      <span className="k-icon k-i-comment" />
                    </button>
                    <button className="k-button k-flat">
                      <span className="k-icon k-i-share" />
                    </button>
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      alignSelf: "center",
                      color: "#656565",
                    }}
                  >
                    {card.postLikes} likes
                  </span>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
