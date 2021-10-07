window.attachGoogleLogin = () => {
  gapi.load("auth2", () => {
    const inputElement = document.getElementById("g-login");
    const auth2 = gLoginInitAuth();

    gLoginAttachToClickHandler(
      auth2,
      inputElement,
      gLoginOnSuccess,
      gLoginOnError
    );
  });
};

gLoginInitAuth = () =>
  gapi.auth2.init({
    client_id:
      "222678136207-db4poveolpkr5301j4gj37evlekkctq9.apps.googleusercontent.com",
    cookiepolicy: "single_host_origin",
  });

gLoginAttachToClickHandler = (auth, handlerElement, onSuccess, onError) => {
  auth.attachClickHandler(handlerElement, {}, onSuccess, onError);
};

/* 
Google login calbacks
*/
gLoginSetCalbacks = (loginOnSuccess, loginOnError) => {
  gLoginOnSuccess = loginOnSuccess;
  gLoginOnError = loginOnError;
};
gLoginOnSuccess = () => {
  console.log("No login success action");
};
gLoginOnError = () => {
  console.log("No login error action");
};
