document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadPageElementsActions();
    loadPageComponents();
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
  loadPageComponents();
};

const googleLoginOnError = (err) => {
  console.log(err.error);
};

const handleUsingTermsChkChange = (e) => {
  console.log(sessionStatus());
};


const loadPageComponents = () => {

  let statusSession = sessionStatus();
  if (statusSession == true) {
    document.getElementById("user-name").innerText = sessionStorage.getItem('userName');
    document.getElementById("user-image").setAttribute("src", sessionStorage.getItem('userImgaeUrl'));
    document.getElementById("loged-in-component").removeAttribute("hidden");
    document.getElementById("log-in-component").setAttribute("hidden", true);
  }else{
    document.getElementById("loged-in-component").setAttribute("hidden", true);
    document.getElementById("log-in-component").removeAttribute("hidden");
  }

};
