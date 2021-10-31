import React, { useState } from "react";
import { __CONSTS, __TEXTS, __LANG } from "../../utils/constants";

import {
  Logo,
  TermsAndConditions,
  GoogleLoginButton,
  StartButton,
  LogedInUser,
  Fade,
} from "../../components";
import "../../assets/styles/main.css";

function App() {
  const { orientations, sizes } = __CONSTS;
  const texts = __TEXTS[__LANG].loginView;

  const [isLogged, setLogged] = useState(false);
  const [acceptedTerms, setTerms] = useState(false);

  const googleLoginOnError = (err) => {
    console.log(err);
  };
  const googleLoginOnSuccess = (gData) => {
    console.log(gData);
  };
  
  const googleLoginOnError = (err) => {
    console.log(err);
  };

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
                orientation={orientations.vertical}
                size={sizes.md}
              />
              <StartButton
                disabled={!acceptedTerms}
                onClick={(e) => setLogged(!isLogged)}
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

export default App;
