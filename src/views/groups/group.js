import session from "../../utils/session";
import { WalkingService } from "../../services";

const createGoup = () => {
  WalkingService.createWalkingGroup();

  console.log("Passei aaqqui");
  if (session.status()) {
    window.location.href = "walking";
  }
  return <div>Creating group...</div>;
};

export default createGoup;
