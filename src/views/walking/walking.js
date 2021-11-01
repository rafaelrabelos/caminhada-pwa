import React, { useState } from "react";
import { __CONSTS, __TEXTS, __LANG } from "../../utils/constants";
import session from "../../utils/session";
import { LogedInUser, Logo } from "../../components";

const Walking = () => {
  const { orientations, sizes } = __CONSTS;
  const texts = __TEXTS[__LANG].walkingView;

  const [isLogged, setLogged] = useState(session.status());
  const [acceptedTerms, setTerms] = useState(false);

  return (
    <div className="App">
      {/* Top info */}
      <div className="row-line">
        <div className="walking-header">
          <Logo orientation={orientations.horizontal} size={sizes.sm} />
          <LogedInUser
            userName={session.getSessionItem("userName")}
            orientation={orientations.vertical}
            onLogoffClick={() => setLogged(session.logOff().status())}
            logedMsg=" "
            size={sizes.md}
          />
        </div>
      </div>

      <div className="main-container">
        {/* Question form */}
        <div className="row-line">
          <div className="texts-descriptions">
            <p id="walking-question"></p>
            <br />
          </div>
          <div
            id="walking-options"
            className="question-radio texts-descriptions"
          ></div>
          <hr />
        </div>

        {/* Walking info */}
        <div className="walkers-container">
          <div id="walking-users" className="row-line"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-container">
        <div className="row-line">
          <button id="btn-next" className="btn btn-default btn-log-in">
            Proximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Walking;
