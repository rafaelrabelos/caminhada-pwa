import React, { useState } from "react";
import { __CONSTS, __TEXTS, __LANG } from "../../utils/constants";
import session from "../../utils/session";
import {
  Logo,
  TermsAndConditions,
  GoogleLoginButton,
  StartButton,
  LogedInUser,
  Fade,
} from "../../components";
import "../../assets/styles/main.css";

const Home = () => {
  const { orientations, sizes } = __CONSTS;
  const texts = __TEXTS[__LANG].loginView;

  const [isLogged, setLogged] = useState(session.status());
  const [acceptedTerms, setTerms] = useState(false);

  const googleLoginOnSuccess = (gData) => {
    const gUserData = {
      userId: gData.getBasicProfile().getId(),
      userName: gData.getBasicProfile().getName(),
      userFamilyName: gData.getBasicProfile().getFamilyName(),
      userGivenName: gData.getBasicProfile().getGivenName(),
      userEmail: gData.getBasicProfile().getEmail(),
      userImgaeUrl: gData.getBasicProfile().getImageUrl(),
    };

    setLogged(session.storeUser(gUserData).init().status());
  };

  const googleLoginOnError = (err) => {
    console.log(err.error);
  };

  const navigateToWalking = () => {
    if(session.status() && isLogged && acceptedTerms ){
      console.log("Tudo OK");
      window.location.href = './walking.html';
    }
  }

  return (
    <div className="App">
      <div className="row-line">
        <div className="login-header">
          <Logo orientation={orientations.vertical} size={sizes.xgx} />
        </div>
      </div>

      <div className="main-container">
        <div className="block-teen">
          <div className="row-line">
            <div className="texts-gray texts-descriptions">
              <p>{texts.presentation}</p>
            </div>
          </div>
          {/* Start walking */}
          <Fade in={isLogged}>
            <div
              id="loged-in-component"
              className="row-line block-quarter"
              hidden={!isLogged}
            >
              <LogedInUser
                userName={session.getSessionItem("userName")}
                userImageURL={session.getSessionItem("userImgaeUrl")}
                orientation={orientations.vertical}
                onLogoffClick ={() => setLogged(session.logOff().status()) }
                size={sizes.md}
              />
              <StartButton
                disabled={!acceptedTerms}
                onClick={navigateToWalking}
              />
              <div id="start-info" className="texts-small">
                <small className="texts-gray texts-small">
                  {texts.acceptToStart}
                </small>
              </div>
            </div>
          </Fade>
          {/* Google log-in */}
          <Fade in={!isLogged}>
            <div
              id="log-in-component"
              className="row-line block-quarter"
              hidden={isLogged}
            >
              <GoogleLoginButton
                clientId="222678136207-qo63edavnp1l6t3kup868kqt96npccqj.apps.googleusercontent.com"
                onSuccess={googleLoginOnSuccess}
                onFailure={googleLoginOnError}
              />

              <div id="login-info" className="texts-small">
                <small>
                  Acesse com sua conta do google e comece a responder.
                </small>
              </div>
            </div>
          </Fade>
        </div>

        <div className="row-line">
          <div className="small-container">
            <Fade in={isLogged}>
              <TermsAndConditions
                onChange={() => setTerms(!acceptedTerms)}
                checked={acceptedTerms}
              />
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
