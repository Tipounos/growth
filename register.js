import { auth } from "./firebase"
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth"

// Register form
const regEmailEl = document.getElementById("register-email")
const regPasswordEl = document.getElementById("register-password")
const regFormEl = document.getElementById("register-form")
let regEmail
let regPassword

regFormEl?.addEventListener("submit", function(e) {
  e.preventDefault()
  regPassword = regPasswordEl.value
  regEmail = regEmailEl.value
  createUserWithEmailAndPassword(auth, regEmail, regPassword)
    .then((userCredential) => {
      const user = userCredential.user
      sendEmailVerification(user)
        .then(() => {
          swal({
            title: "Compte créé avec succès ! Nous vous avons envoyé un e-mail de vérification.",
            text: "Vérifiez votre e-mail afin de vous connecter. (Vérifiez aussi les spams !)",
            icon: "success",
            button: "Se connecter"}).then((v) => {
                                signOut(auth)
                                window.location.href = "login.html"                                
                              })


        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("Un compte est déjà attribué à cet email.")
          break
        default:
          console.log("Code :", error.code)
          console.log("Message :", error.message)
      }
    });
})