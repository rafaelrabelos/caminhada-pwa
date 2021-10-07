document.addEventListener('DOMContentLoaded', function() {
  loadPageElementsActions();
}, false);

const loadPageElementsActions = () =>{

  var btn_LoginElement = document.getElementById("btn-login");
  var chk_UsingTermsElement = document.getElementById("chk-terms");

  btn_LoginElement.onclick = handleLoginBtnClick;
  chk_UsingTermsElement.onchange = handleUsingTermsChkChange;

}

handleLoginBtnClick = (e) => {
  console.log(e.target.id);
}

handleUsingTermsChkChange = (e) => {
  console.log(e.target.checked);
}