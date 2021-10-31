let dataTemplate = {
  userId: null,
  userName: null,
  userFamilyName: null,
  userGivenName: null,
  userEmail: null,
  userImgaeUrl: null,
};

const sessionInit = () => {
  sessionStorage.clear();

  if (localStorageHasData()) {
    Object.keys(dataTemplate).forEach((sessionItem) => {
      const localItem = localStorage.getItem(sessionItem);
      sessionStorage.setItem(sessionItem, localItem);
    });
  }
  return session;
};

const sessionClear = () => {
  sessionStorage.clear();
  return session  
}
const localStorageClear = () => {
  localStorage.clear()
  return session  
}
const logOff = () => session.clearSession().clearStorage();

const sessionStatus = () => {
  let status = true;

  Object.keys(dataTemplate).forEach((sessionItem) => {
    const sessionValue = sessionStorage.getItem(sessionItem);

    if (!sessionValue || sessionValue == null || sessionValue === "") {
      status = false;
    }
  });

  return status;
};

const localStorageHasData = () => {
  let status = true;

  Object.keys(dataTemplate).forEach((sessionItem) => {
    const localStorageValue = localStorage.getItem(sessionItem);

    if (localStorageValue == null || localStorageValue === "") {
      status = false;
    }
  });

  return status;
};

const localStorageSetData = (data = dataTemplate) => {
  localStorage.clear();

  Object.keys(data).forEach((dataItem) => {
    if (data[dataItem] !== null && data[dataItem] !== "") {
      localStorage.setItem(dataItem, data[dataItem]);
      dataTemplate[dataItem] = data[dataItem];
    }
  });
  return  session;
};

const getSessionItem = (name = "") => sessionStorage.getItem(name);
const getStorageItem = (name = "") => localStorage.getItem(name);

const session = {
  init: sessionInit,
  status: sessionStatus,
  storeUser: localStorageSetData,
  hasData: localStorageHasData,
  getSessionItem: getSessionItem,
  getStorageItem: getStorageItem,
  clearSession: sessionClear,
  clearStorage: localStorageClear,
  logOff: logOff
};

export default session;
