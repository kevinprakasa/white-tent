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
