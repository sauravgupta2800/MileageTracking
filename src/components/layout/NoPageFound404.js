import Icon from "../common/Icon";
import { isDesktopView } from "../utils";

const NoPageFound404 = () => {
  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
      <Icon
        showCursor={false}
        id="404"
        size={isDesktopView ? "xxxl" : "xxxl"}
      />
      <div className="fs-3">Page not found</div>
    </div>
  );
};

export default NoPageFound404;
