document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadPageElementsActions();
    loadOauthConfigs();
  },
  false
);

const loadPageElementsActions = async () => {
  var chk_UsingTermsElement = document.getElementById("chk-terms");

  chk_UsingTermsElement.onchange = handleUsingTermsChkChange;
};

const loadOauthConfigs = async () => {
  gLoginSetCalbacks(googleLoginOnSuccess, googleLoginOnError);
};

googleLoginOnSuccess = (gData) => {
  document.getElementById("login-info").innerText =
    "Signed in: " + gData.getBasicProfile().getName();
  console.log(gData.getBasicProfile());
};
googleLoginOnError = (err) => {
  console.log(err.error);
};

handleUsingTermsChkChange = (e) => {
  console.log(e.target.checked);
};
