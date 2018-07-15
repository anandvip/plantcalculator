// Initialize Firebase
(function() {
    const config = {
        apiKey: "AIzaSyBQ6G_urpOGRZehlmCw3CzmQUoklp-8t5g",
        authDomain: "plantcalc.firebaseapp.com",
        databaseURL: "https://plantcalc.firebaseio.com",
        projectId: "plantcalc",
        storageBucket: "plantcalc.appspot.com",
        messagingSenderId: "32551006130"
      };
      firebase.initializeApp(config);
        const seedb = firebase.firestore();
        const auth = firebase.auth()
        seedb.settings({ timestampsInSnapshots: true }); 

        //get the button element
}());

