import MenuIcon from "./MenuIcon";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { menuOptions } from "./config";

const MenuIcons = () => {
  const history = useHistory();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    let key = location.pathname;
    setActiveMenu(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMenuChange = (activeKey) => {
    setActiveMenu(activeKey);
    history.replace(`${activeKey}`);
  };

  return (
    <div className="w-100 h-100 d-flex justify-content-between px-5">
      {menuOptions.map(({ pathKey, ...menu }, index) => (
        <MenuIcon
          key={index}
          {...menu}
          active={pathKey === activeMenu}
          onMenuClick={() => onMenuChange(pathKey)}
        />
      ))}
    </div>
  );
};

export default MenuIcons;
