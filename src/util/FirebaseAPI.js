import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyB8qsuIokGL2JnLg4wEiQLUHIWUUgmTBTY",
  authDomain: "white-tent-c2b34.firebaseapp.com",
  projectId: "white-tent-c2b34",
  storageBucket: "white-tent-c2b34.appspot.com",
  messagingSenderId: "89645161876",
  appId: "1:89645161876:web:ee1a6a38ed8c8ef5db8381",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export function isUserLoggedIn() {
  return firebase.auth().currentUser != null;
}

export function getUserData(callbackSuccess, callbackError) {
  var user = firebase.auth().currentUser;

  if (user == null) {
    callbackError("null");
    return;
  }

  db.collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        var data = doc.data();
        data["uid"] = user.uid;
        data["created_at"] = data["created_at"].toDate();
        callbackSuccess(data);
      } else {
        callbackError("User data does not exists");
      }
    })
    .catch((error) => {
      callbackError(error);
    });
}

export function signUpWithEmailAndPassword(
  email,
  password,
  data,
  callbackSuccess,
  callbackError
) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      data["email"] = email;
      data["created_at"] = firebase.firestore.FieldValue.serverTimestamp();

      db.collection("users")
        .doc(user.uid)
        .set(data)
        .then(() => {
          getUserData(callbackSuccess, callbackError);
        })
        .catch((error) => {
          callbackError(error);
        });
    })
    .catch((error) => {
      callbackError(error);
    });
}

export function signInWithEmailAndPassword(
  email,
  password,
  callbackSuccess,
  callbackError
) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      // var user = userCredential.user;

      getUserData(callbackSuccess, callbackError);
    })
    .catch((error) => {
      callbackError(error);
    });
}

export function signOut(callbackSuccess, callbackError) {
  firebase
    .auth()
    .signOut()
    .then(() => {
      callbackSuccess();
    })
    .catch((error) => {
      callbackError(error);
    });
}

//Helper function for getNearestShops
//Reference: https://www.geeksforgeeks.org/program-distance-two-points-earth/
function getDistance(
  targetLatitude,
  targetLongitude,
  shopLatitude,
  shopLongitude
) {
  //converts from degrees to radians
  targetLatitude = (targetLatitude * Math.PI) / 180;
  targetLongitude = (targetLongitude * Math.PI) / 180;
  shopLatitude = (shopLatitude * Math.PI) / 180;
  shopLongitude = (shopLongitude * Math.PI) / 180;

  // Haversine formula
  var distanceLatitude = targetLatitude - shopLatitude;
  var distanceLongitude = targetLongitude - shopLongitude;

  var a =
    Math.pow(Math.sin(distanceLatitude / 2), 2) +
    Math.cos(targetLatitude) *
      Math.cos(shopLatitude) *
      Math.pow(Math.sin(distanceLongitude / 2), 2);

  var c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers
  return Math.round(c * 6371 * 10) / 10;
}

export function getNearestShops(
  targetLatitude,
  targetLongitude,
  callbackSuccess,
  callbackError
) {
  const shops = [];

  db.collection("shop")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var data = doc.data();

        data["distance"] = getDistance(
          targetLatitude,
          targetLongitude,
          data["coordinate"]["latitude"],
          data["coordinate"]["longitude"]
        );

        shops.push({
          shop_id: doc.id,
          name: data["name"],
          distance: data["distance"],
          photo_url: data["photo_url"],
        });
      });

      shops.sort((a, b) => (a["distance"] < b["distance"] ? -1 : 1));

      callbackSuccess(shops);
    })
    .catch((error) => {
      callbackError(error);
    });
}

export function getShopCategories(callbackSuccess, callbackError) {
  db.collection("shop_category")
    .get()
    .then((querySnapshot) => {
      const res = {};
      querySnapshot.forEach((doc) => {
        res[doc.id] = doc.data();
      });
      callbackSuccess(res);
    })
    .catch((error) => callbackError(error));
}

export function getMostLikedProducts(callbackSuccess, callbackError) {
  db.collectionGroup("products")
    .get()
    .then((querySnapshot) => {
      const mostLikedProducts = [];
      querySnapshot.forEach((doc) => {
        mostLikedProducts.push(doc.data());
      });
      // Sort from most likes to least likes
      mostLikedProducts.sort((a, b) => {
        const aTotalLikes = a.total_likes ?? -1;
        const bTotalLikes = b.total_likes ?? -1;
        return aTotalLikes > bTotalLikes ? -1 : 1;
      });

      // Return only 10 most likes products
      callbackSuccess(mostLikedProducts.slice(0, 10));
    })
    .catch((error) => callbackError(error));
}

export function getShopsByName(target, callbackSuccess, callbackError) {
  const shops = [];

  db.collection("shop")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var data = doc.data();

        if (data["name"].toLowerCase().includes(target.toLowerCase())) {
          shops.push({
            shop_id: doc.id,
            name: data["name"],
            photo_url: data["photo_url"],
          });
        }
      });

      callbackSuccess(shops);
    })
    .catch((error) => {
      callbackError(error);
    });
}

export function getShopDetail(
  shopId,
  userLocation,
  callbackSuccess,
  callbackError
) {
  db.collection("shop")
    .doc(shopId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const { longitude, latitude } = userLocation;
        const distance = getDistance(
          latitude,
          longitude,
          data["coordinate"]["latitude"],
          data["coordinate"]["longitude"]
        );
        callbackSuccess({ ...doc.data(), distance });
      } else {
        callbackError("Error: shop id does not exists");
      }
    })
    .catch((error) => {
      callbackError(error);
    });
}

export function getProductList(shopId, callbackSuccess, callbackError) {
  db.collection("shop")
    .doc(shopId)
    .collection("products")
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        var categories = {};

        querySnapshot.forEach((doc) => {
          var data = doc.data();
          data["product_id"] = doc.id;
          data["categories"].forEach((category) => {
            if (!(category in categories)) {
              categories[category] = [];
            }

            categories[category].push(data);
          });
        });

        callbackSuccess(categories);
      } else {
        callbackError(
          "Error: shop id does not exists or there are no products"
        );
      }
    })
    .catch((error) => {
      callbackError(error);
    });
}

export function createOrder(data, callbackSuccess, callbackError) {
  var user = firebase.auth().currentUser;

  if (user == null) {
    callbackError("Error: User not logged in");
    return;
  }

  var counterRef = db.collection("counter").doc("order");
  var totalSaveRef = db.collection("counter").doc("total_save");
  var orderRef = db.collection("users").doc(user.uid).collection("order").doc();

  db.runTransaction(async (transaction) => {
    var counterDoc = await transaction.get(counterRef);
    var totalSaveDoc = await transaction.get(totalSaveRef);

    var incrementNumber = counterDoc.data()["value"] + 1;
    var newTotalSave = totalSaveDoc.data()["value"] + data["total_save"];

    data["order_id"] = `WT_${incrementNumber}`;
    data["created_at"] = firebase.firestore.FieldValue.serverTimestamp();
    data["status"] = "active";

    transaction.set(orderRef, data);
    transaction.update(counterRef, { value: incrementNumber });
    transaction.update(totalSaveRef, { value: newTotalSave });

    return Promise.resolve(true);
  })
    .then(() => {
      orderRef
        .get()
        .then((doc) => {
          var data = doc.data();
          data["created_at"] = data["created_at"].toDate();
          callbackSuccess(data);
        })
        .catch((error) => {
          callbackError(error);
        });
    })
    .catch((error) => {
      callbackError(error);
    });
}

export function getShopsByCategoryName(
  categoryName,
  callbackSuccess,
  callbackError
) {
  const shops = [];

  db.collection("shop")
    .where("categories", "array-contains", categoryName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var data = doc.data();

        shops.push({
          shop_id: doc.id,
          name: data["name"],
          photo_url: data["photo_url"],
          categories: data["categories"],
        });
      });

      callbackSuccess(shops);
    })
    .catch((error) => {
      callbackError(error);
    });
}

export async function getJsonFile() {
  const whiteTentData = {
    shops: [],
    orders: [],
  };

  const shops = await db.collection("shop").get();

  for (let i in shops.docs) {
    let doc = shops.docs[i];
    let data = doc.data();

    let shop = {
      categories: data["categories"],
      name: data["name"],
      total_likes: parseInt(data["total_likes"]),
    };

    const products = await db
      .collection("shop")
      .doc(doc.id)
      .collection("products")
      .get();

    shop["products"] = [];

    products.forEach((doc) => {
      let data = doc.data();

      let discount =
        (data["original_price"] - data["discount_price"]) /
        data["original_price"];
      discount = Math.round(discount * 100) / 100;

      shop["products"].push({
        name: data["name"],
        discount_price: data["discount_price"],
        original_price: data["original_price"],
        discount: discount,
        categories: data["categories"],
      });
    });

    const orders = await db
      .collectionGroup("order")
      .where("shop_id", "==", doc.id)
      .get();

    shop["total_transaction"] = orders.size;

    whiteTentData["shops"].push(shop);
  }

  const orders = await db.collectionGroup("order").get();

  orders.forEach((doc) => {
    let data = doc.data();

    whiteTentData["orders"].push({
      shop_id: data["shop_id"],
      total_price: data["total_price"],
      status: data["status"],
    });
  });

  const fs = require("fs");
  fs.writeFileSync("white_tent_data.json", JSON.stringify(whiteTentData));
}

export function getTotalSaveTransaction(callbackSuccess, callbackError) {
  db.collection("counter")
    .doc("total_save")
    .get()
    .then((doc) => {
      callbackSuccess({
        total_save: doc.data()["value"],
      });
    })
    .catch((error) => {
      callbackError(error);
    });
}
