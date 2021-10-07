let sessionData = {
  userId: null,
  userName: null,
  userFamilyName: null,
  userGivenName: null,
  userEmail: null,
  userImgaeUrl: null,
};

sessionUpdateData = (data = sessionData) => {

  Object.keys(data).forEach(dataItem => {
    sessionData[dataItem] = data[dataItem];
  });

  if(sessionSatatus() == true){
    sessionStorage.clear();
    sessionInit();
  }

  sessionData = data;
}

sessionInit = () => {
  sessionStorage.clear();

  Object.keys(sessionData).forEach(sessionItem => {
    sessionStorage.setItem(sessionItem, sessionData[sessionItem]);
  });
};

sessionStatus = () => {
  let status = true;

  Object.keys(sessionData).forEach(sessionItem => {
    const sessionValue = sessionStorage.getItem(sessionItem);
    console.log(`${sessionItem}: ${sessionValue}`);
    if(sessionValue == null || sessionValue == ''){
      status = false;
    }
  });

  return status;
};
