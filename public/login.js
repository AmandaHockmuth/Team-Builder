import {
  inputEnabled,
  setDiv,
  message,
  enableInput,
  setToken,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showItems } from "./items.js";

let loginDiv = null;
let email = null;
let password = null;

export const handleLogin = () => {
  loginDiv = document.getElementById("logon-div");
  email = document.getElementById("email");
  password = document.getElementById("password");
  const logonButton = document.getElementById("logon-button");
  const logonCancel = document.getElementById("logon-cancel");

  // @ts-ignore
  loginDiv.addEventListener("click", async (e) => {
    // @ts-ignore
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === logonButton) {
        enableInput(false);

        try {
          const response = await fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200) {
            // @ts-ignore
            message.textContent = `Logon successful.  Welcome ${data.user.name}, team ${data.user.team}.`;
            setToken(data.token);

            email.value = "";
            password.value = "";

            showItems();
          } else {
            // @ts-ignore
            message.textContent = data.msg;
          }
        } catch (err) {
          console.error(err);
          // @ts-ignore
          message.textContent = "A communications error occurred.";
        }

        enableInput(true);
      } else if (e.target === logonCancel) {
        email.value = "";
        password.value = "";
        showLoginRegister();
      }
    }
  });
};

export const showLogin = () => {
  email.value = null;
  password.value = null;
  setDiv(loginDiv);
};
