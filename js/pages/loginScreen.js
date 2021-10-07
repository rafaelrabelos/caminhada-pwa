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

const googleLoginOnSuccess = (gData) => {
  const gUserData = {
    userId: gData.getBasicProfile().getId(),
    userName: gData.getBasicProfile().getName(),
    userFamilyName: gData.getBasicProfile().getFamilyName(),
    userGivenName: gData.getBasicProfile().getGivenName(),
    userEmail: gData.getBasicProfile().getEmail(),
    userImgaeUrl: gData.getBasicProfile().getImageUrl(),
  };

  sessionUpdateData(gUserData);
  sessionInit();
  let sessionStatus = sessionStatus();

  document.getElementById("login-info").innerText = `Signed in: ${gUserData.userName}`;
  
};

const googleLoginOnError = (err) => {
  console.log(err.error);
};

handleUsingTermsChkChange = (e) => {
  console.log(e.target.checked);
};
