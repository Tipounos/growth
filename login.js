import { auth } from "./firebase"
import { signInWithEmailAndPassword, sendEmailVerification, signOut  } from "firebase/auth"

// Login form

const logEmailEl = document.getElementById("login-email")
const logPasswordEl = document.getElementById("login-password")
const logFormEl = document.getElementById("login-form")
let logEmail
let logPassword

logFormEl?.addEventListener("submit", (e) => {
  e.preventDefault()
  logEmail = logEmailEl.value
  logPassword = logPasswordEl.value

  signInWithEmailAndPassword(auth, logEmail, logPassword)
    .then((userCredential) => {
      const user = userCredential.user

      if (user.emailVerified) {
        swal("Vous êtes connecté !", "Vous pouvez maintenant accéder à votre espace.", "success")
        window.location.href = "/"
      } else {
        signOut()
        swal("Votre e-mail n'est pas vérifié", "Merci de le vérifier pour accéder à votre espace", "error", {
          buttons: {
            send: "Renvoyer un e-mail de vérification.",
            cancel: "Fermer"
          }
        }).then((value) => {
          if (value == "send") {
            sendEmailVerification(user)
            swal("Un e-mail de vérification vous a été envoyé.", {
              icon: "success"
            })
          }
        })
      }
    })
    .catch((error) => {
      swal("Une erreur innatendue s'est produite !", "Veuillez réessayer dans quelques secondes.", "error")
      console.log(error.code)
    })
})