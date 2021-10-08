let sessionData = {
  userId: null,
  userName: null,
  userFamilyName: null,
  userGivenName: null,
  userEmail: null,
  userImgaeUrl: null,
};

const sessionUpdateData = (data = sessionData) => {

  Object.keys(data).forEach(dataItem => {
    sessionData[dataItem] = data[dataItem];
  });

  if(sessionStatus() == true){
    sessionStorage.clear();
    sessionInit();
  }

  sessionData = data;
}

const sessionInit = () => {
  sessionStorage.clear();

  Object.keys(sessionData).forEach(sessionItem => {
    sessionStorage.setItem(sessionItem, sessionData[sessionItem]);
  });
};

const sessionStatus = () => {
  let status = true;

  Object.keys(sessionData).forEach(sessionItem => {
    const sessionValue = sessionStorage.getItem(sessionItem);
    if(sessionValue == null || sessionValue == ''){
      status = false;
    }
  });

  return status;
};
