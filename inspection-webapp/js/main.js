var configFirebase = function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAO2Ny94ky2411Jn4unrT7Fw_cFDFZX2b0",
    authDomain: "green-tag.firebaseapp.com",
    databaseURL: "https://green-tag.firebaseio.com",
    projectId: "green-tag",
    storageBucket: "green-tag.appspot.com",
    messagingSenderId: "321817579883"
  };
  firebase.initializeApp(config);
};

var configAuth = function() {
  // FirebaseUI config.
  var uiConfig = {
    callbacks: {
      signInSuccess: function(user, credential, redirectUrl) {
        handleSignedInUser(user);
        //Don't redirect.
        return false;
      }
    },
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  // Keep track of the signed in user
  var currentUid = null;

  var handleSignedInUser = function(user) {
    currentUid = user.uid;
    $('#logout-button').show();
    
    //creates username from email and strips illegal path characters for firebase
    user.username = user.email.split('@')[0].replace(/[\.#!]/g,'');
  };

  var handleSignedOutUser = function() {
    $('#logout-button').hide();
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  // Listen to change in auth state so it displays the correct UI for when
  // the user is signed in or not.
  firebase.auth().onAuthStateChanged(function(user) {
    // The observer is also triggered when the user's token has expired and is
    // automatically refreshed. In that case, the user hasn't changed so we should
    // not update the UI.
    if (user && user.uid == currentUid) {
      return;
    }
    user ? handleSignedInUser(user) : handleSignedOutUser();
  });

}

var configUi = function() {
  $('#logout-button').click(function() {
    firebase.auth().signOut();
  })
};

$(document).ready(function() {
  configFirebase();
  configAuth();
  configUi();
});
