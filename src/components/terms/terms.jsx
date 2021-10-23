import { __TEXTS, __LANG } from "../../utils/constants";
import "./terms.css";

const TermsAndConditions = (props) => {
  const texts = __TEXTS[__LANG].loginView;
  const { onAccept, onChange, checked } = props;

  const handleOnChange = (e) => {
    onChange(e.target.checked);
    if (e.target.checked && onAccept) onAccept();
  };

  return (
    <div className="texts-small">
      <input
        id="chk-terms"
        type="checkbox"
        onChange={handleOnChange}
        checked={checked || false}
      />
      <small>
        {`${texts.acceptTerms.accept} `}
        <b className="texts-orange texts-small">{`${texts.acceptTerms.terms} `}</b>{" "}
        e
        <b className="texts-orange texts-small">
          {` ${texts.acceptTerms.policies} `}
        </b>
      </small>
    </div>
  );
};

export default TermsAndConditions;
