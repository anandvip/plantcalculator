// Initialize Firebase

        //get the button element
        const btnLogin = document.getElementById('btnLogin');
        const btnLogout = document.getElementById('btnLogout');
        const usrID = document.getElementById('usrID');
        


        //1. Click event listener for login

        btnLogin.addEventListener('click', e => {
            firebase.auth().signInAnonymously()
            //firebase.auth().signInWithEmailAndPassword(email, password);
        
        });
        //3. Logout event listener 

        btnLogout.addEventListener('click', e => {
            firebase.auth().signOut();
        });
        //2. Authentication state changes after clicking the login button, check it ;)
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                const anonId = firebaseUser.uid;
                window.location = 'http://127.0.0.1:5500/fbPlantcalc/public/plantcalc.html';
                btnLogout.classList.remove('hideIt');
                btnLogin.innerHTML = `${un}`;
                usrID.innerHTML = `Annonymus ID : ${anonId}`;
                btnLogin.classList.add('grn');
            } else {
                btnLogout.classList.add('hideIt');
                //brnLogout.classList.usrID.remove()
                btnLogin.innerHTML = "Sign In";
                btnLogin.classList.remove('grn');
            }
        });






