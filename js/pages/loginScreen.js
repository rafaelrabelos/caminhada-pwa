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
  let chk_acceptTerms = document.getElementById("chk-terms");
  let link_logOff = document.getElementById("log-out");
  let btn_Start = document.getElementById("btn-start");

  chk_acceptTerms.onchange = handleAcceptTermsChkChange;
  link_logOff.onclick = handleLogOffLinkClick;
  btn_Start.onclick = handleStartBtnClick;
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

  storeLocalData(gUserData);
  sessionInit();

  if(sessionStatus() == true){
    loadPageComponents();
  }
};

const googleLoginOnError = (err) => {
  console.log(err.error);
};

const loadPageComponents = () => {

  if(localStorageHasData()){
    sessionInit();
  }

  if (sessionStatus()) {
    document.getElementById("user-name").innerText = sessionStorage.getItem('userName');
    document.getElementById("user-image").setAttribute("src", sessionStorage.getItem('userImgaeUrl'));
    document.getElementById("loged-in-component").removeAttribute("hidden");
    document.getElementById("log-in-component").setAttribute("hidden", true);
  }else{
    document.getElementById("loged-in-component").setAttribute("hidden", true);
    document.getElementById("log-in-component").removeAttribute("hidden");
  }
};

/*
event Handlers
*/
const handleAcceptTermsChkChange = (e) => {
  var btn_Start = document.getElementById("btn-start");

  if(e && e.target && e.target.checked){
    btn_Start.removeAttribute('disabled');
  }else{
    btn_Start.setAttribute("disabled", true);
  }
};

const handleLogOffLinkClick = (e) => {
  sessionStorage.clear();
  localStorage.clear();
  loadPageComponents()
}

const handleStartBtnClick = (e) => {
  let statusSession = sessionStatus();

  if(statusSession == true){
    navegateToWalking();
  }else{
    loadPageComponents();
  }
  
}

const navegateToWalking = () => window.location.href = './walking.html';