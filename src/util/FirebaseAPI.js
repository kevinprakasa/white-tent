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
      var user = userCredential.user;

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

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function getNearestShops(userGeoLoc, callbackSuccess, callbackError) {
  db.collection("shop")
    .get()
    .then((querySnapshot) => {
      const nearestShops = [];
      const { longitude, latitude } = userGeoLoc;
      querySnapshot.forEach((doc) => {
        // Calculate the distance (in km)
        const distanceBetweenShopAndUserLoc = getDistanceFromLatLonInKm(
          latitude,
          longitude,
          doc.data().coordinate._lat,
          doc.data().coordinate._long
        );
        nearestShops.push({
          id: doc.id,
          ...doc.data(),
          distance: distanceBetweenShopAndUserLoc,
        });
      });

      // Sort nearestShops so it orderBy it's distance from nearest to farthest
      nearestShops.sort((a, b) =>
        a.distance > b.distance ? 1 : a.distance < b.distance ? -1 : 0
      );

      callbackSuccess(nearestShops);
    })
    .catch(callbackError);
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
      callbackSuccess(mostLikedProducts);
    })
    .catch((error) => callbackError(error));
}
