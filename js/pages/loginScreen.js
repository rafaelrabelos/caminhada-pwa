document.addEventListener('DOMContentLoaded', function() {
  loadPageElementsActions();
}, false);


const loadPageElementsActions = () =>{

  var btn_LoginElement = document.getElementById("btn-login");
  var chk_UsingTermsElement = document.getElementById("chk-terms");

  chk_UsingTermsElement.onchange = handleUsingTermsChkChange;

}

 window.attachGoogleLoginToElement = () => {
  gapi.load('auth2', () => {
    var btn_LoginElement = document.getElementById("btn-login");
    auth2 = gapi.auth2.init({
      client_id: '222678136207-db4poveolpkr5301j4gj37evlekkctq9.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
    });
  
    auth2.attachClickHandler(btn_LoginElement, {}, googleLoginOnSuccess, googleLoginOnError);
  });
}

googleLoginOnSuccess = (gData) =>{
  document.getElementById('login-info').innerText = "Signed in: " + gData.getBasicProfile().getName();
  console.log(gData.getBasicProfile());
}
googleLoginOnError = (err) =>{
  console.log(err.error);
}

handleUsingTermsChkChange = (e) => {
  console.log(e.target.checked);
}