import Icon from "../common/Icon";

const DataCard = ({ title, titleIcon, items = [] }) => {
  return (
    <div className="mt-data-card d-flex flex-column align-items-center">
      <div className="mt-data-card__title-section w-fit d-flex align-items-center rounded-pill py-2 px-4">
        <Icon id={titleIcon} size="xs" />
        <div className="mt-data-card__title-section__title ms-2 fs-4">
          {title}
        </div>
      </div>
      <div className="mt-data-card__list my-4 w-100 p-3 rounded-6">
        {items.map((item, index) => (
          <DataRow
            key={index}
            {...item}
            wrapClass={index && items.length ? "mt-2" : ""}
          />
        ))}
      </div>
    </div>
  );
};

const DataRow = ({ title, icon, mainText, subText, label, wrapClass = "" }) => {
  return (
    <div className={`w-100 ${wrapClass}`}>
      {title && (
        <div className="text-uppercase mt-color-dim-light">{title}</div>
      )}
      <div className="w-100 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          {icon && (
            <Icon id={icon} size="xs" iconClass="mt-color-primary me-2" />
          )}
          {mainText && <div className="mt-color-light fs-3">{mainText}</div>}
          {subText && (
            <div className="mt-color-dim-light ms-2 fs-5">{subText}</div>
          )}
        </div>
        {label && <div className="mt-color-dim-light">{label}</div>}
      </div>
    </div>
  );
};

export default DataCard;
