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
  let statusSession = sessionStatus();

  if (statusSession == true) {
    document.getElementById("user-name").innerText = gUserData.userName;
    document.getElementById("user-img");
    document.setAttribute("src", gUserData.userImgaeUrl);
    document.getElementById("loged-in-component").removeAttribute("hidden");
    document.getElementById("log-in-component").setAttribute("hidden", true);
  }
};

const googleLoginOnError = (err) => {
  console.log(err.error);
};

handleUsingTermsChkChange = (e) => {
  console.log(e.target.checked);
};
