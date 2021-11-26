import React from "react";
import { Tooltip } from "antd";

import useDynamicSVGImport from "../customhooks/useDynamicSVGImport";

const Icon = ({
  withWrapper = true,
  size = "md",
  id,
  iconClass = "",
  wrapperClass = "",
  showCursor = true,
  ...rest
}) => {
  const { error, loading, SvgIcon } = useDynamicSVGImport(id);
  if (error) {
    return "";
  }
  if (loading) {
    return "";
  }
  if (SvgIcon) {
    return (
      <Tooltip placement="top" {...rest}>
        <div
          className={[
            "d-inline-flex justify-content-center align-items-center rounded",
            showCursor && "cursor-pointer",
            withWrapper && `mt-icon-wrapper mt-icon-wrapper-${size}`,
            wrapperClass,
          ].join(" ")}
        >
          <SvgIcon className={`mt-icon mt-icon-${size} ${iconClass}`} />
        </div>
      </Tooltip>
    );
  }
  return null;
};

export default Icon;
