import Icon from "./../common/Icon";

const MenuIcon = ({ id, title, active = false, onMenuClick }) => {
  return (
    <div
      className={`mt-menu-icon  ${
        active ? "mt-menu-icon--active" : false
      } h-100 cursor-pointer d-flex align-items-center justify-content-center flex-column`}
      onClick={() => onMenuClick()}
    >
      <Icon id={id} />
      <div>{title}</div>
    </div>
  );
};

export default MenuIcon;
