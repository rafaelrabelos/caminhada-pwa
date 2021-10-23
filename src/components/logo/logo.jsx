import { __CONSTS, __TEXTS, __LANG } from "../../utils/constants";
import "./logo.css";

const Logo = (props) => {
  const { orientation, size } = props;
  const texts = __TEXTS[__LANG];

  const orientationClass = {
    default: "logo-default",
    [__CONSTS.orientations.vertical]: "logo-default",
    [__CONSTS.orientations.horizontal]: "logo-horizontal",
  };

  const sizeClass = {
    default: "logo-sm-x",
    [__CONSTS.sizes.sm]: "logo-sm",
    [__CONSTS.sizes.smx]: "logo-sm-x",
    [__CONSTS.sizes.md]: "logo-md",
    [__CONSTS.sizes.mdx]: "logo-md-x",
    [__CONSTS.sizes.xg]: "logo-xg",
    [__CONSTS.sizes.xgx]: "logo-xgx",
    [__CONSTS.sizes.full]: "logo-full",
  };

  return (
    <div className={orientationClass[orientation || "default"]}>
      <div className={`logo  ${sizeClass[size || "default"]}`}>
        <img
          alt="Logo de diamante com uma coroa emcima"
          src="assets/icones/android/mipmap-xxxhdpi/ic_launcher.png"
        />
      </div>
      <div className="texts-gray texts-title-upper">{texts.titleApp}</div>
    </div>
  );
};

export default Logo;
