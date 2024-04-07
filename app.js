var logedInUser;


const firebaseConfig = {
    apiKey: "AIzaSyCdAPpbuhroZKSDW7PCVcP6M9F_aI5zmc0",
    authDomain: "ip-encoder.firebaseapp.com",
    projectId: "ip-encoder",
    storageBucket: "ip-encoder.appspot.com",
    messagingSenderId: "30237412135",
    appId: "1:30237412135:web:2131da8e54bb9dfa83b702",
    measurementId: "G-D145FKBXZ3"
};

// Initialize Firebase
/*const app = initializeApp(firebaseConfig);
const auth = getAuth(app);*/
firebase.initializeApp(firebaseConfig);
var appAuth= firebase.auth();
var appDB = firebase.firestore();

// Login Form
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-username'].value;
    const password = loginForm['login-password'].value;
    
    appAuth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User signed in:', user);
            logedInUser = user.uid;

            console.log(logedInUser);
           
           document.querySelector('#signed').style.display="flex"; 
           document.getElementById('form-container').style.display="none";
            // window.location.href = '/encoder.html'

            // Redirect to dashboard or desired page
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in:', errorMessage);
        });
});

// Signup Form
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['signup-username'].value;
    const password = signupForm['signup-password'].value;
    
    appAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log('User signed up:', user);
            // Redirect to dashboard or desired page
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing up:', errorMessage);
        });
});

function toggleForm() {
    var loginBox = document.getElementById('login-box');
    var signupBox = document.getElementById('signup-box');

    if (loginBox.style.display === 'none') {
        loginBox.style.display = 'block';
        signupBox.style.display = 'none';
    } else {
        loginBox.style.display = 'none';
        signupBox.style.display = 'block';
    }
}

function savingForm(){

    var Origin = (document.getElementById('Origin').value);
var Secret = document.getElementById('Secret').value;

const savingForm = document.getElementById('saving-form');
    console.log(logedInUser);

    Origin = Origin.replace(/\//g, "-"); // Replace "/" with "-"

    appDB.collection("users").doc(logedInUser).set({
        origin: Origin,
        secret: Secret
      });
      

      appDB.collection("origins").doc(Origin).set({
        secret: Secret
      });
    }


    function encodeForm(){
        var Origin = document.getElementById('Origin').value;
        var Secret = document.getElementById('Secret').value;
    
        var plainTextElement = document.getElementById('codesd').value;
        console.log("Plain Text:", plainTextElement);
        Origin = Origin.replace(/\//g, "-"); // Replace "/" with "-"


        var encryptedText = CryptoJS.AES.encrypt(plainTextElement, Origin + Secret).toString();
    
        console.log("Plain Text:", plainTextElement);
        console.log("Origin + Secret:", Origin + Secret);
    
        document.getElementById('encoded').innerHTML = encryptedText;
    }
    


    function dencodeForm(){
        var Origin = document.getElementById('Origin').value;
        var Secret = document.getElementById('Secret').value;

               var plainText2 = document.getElementById('codes').value;

          var decryptedText = CryptoJS.AES.decrypt(plainText2, Origin+Secret).toString(CryptoJS.enc.Utf8);
  
          document.getElementById('dencoded').innerHTML = decryptedText;
        

    }




