import React, { useState, useEffect } from "react";
import { Drawer, Input, DatePicker, message } from "antd";
import Icon from "../common/Icon";
import moment from "moment";

const fields = [
  { key: "odometer", placeholder: "Odometer (km)", icon: "odometer" },
  { key: "petrolinLitre", placeholder: "Petrol (L)", icon: "bucket" },
  { key: "pericePerLitre", placeholder: "Price/L", icon: "cost" },
  { key: "totalAmount", placeholder: "Total cost", icon: "wallet" },
  {
    key: "dateTime",
    placeholder: "Date and Time",
    icon: "calender",
    type: "datetime",
  },
];

const AddEntryDrawer = ({ visible, title = "Refueling", onClose }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    if (visible) {
      //init default value
      fields.forEach(({ key, type }) => {
        type === "datetime"
          ? setStateWith(key, moment().valueOf())
          : setStateWith(key, "");
      });
    }
  }, [visible]);

  const setStateWith = (key, value) => {
    setState((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const handleSaveRecord = () => {
    // message.success(`Record Saved`);

    if (fields.map(({ key }) => state[key]).some((value) => !value)) {
      message.error(`Field(s) can't be empty !`);
      return;
    }
    message.success(`Record Saved`);
  };

  return (
    <Drawer
      width={"100%"}
      visible={visible}
      title={title}
      extra={<Icon id="check" size="lg" onClick={() => handleSaveRecord()} />}
      placement="right"
      closable={true}
      onClose={onClose}
      destroyOnClose={true}
      closeIcon={<Icon id="arrow-left" size="lg" iconClass="mt-color-light" />}
      headerStyle={{ padding: "10px 10px 10px 0" }}
    >
      {fields.map(({ key, icon, placeholder, type = "input" }) => (
        <div key={key} className="d-flex align-items-center mb-4">
          <Icon id={icon} iconClass="me-3" iconClass="mt-color-primary me-3" />
          {type === "datetime" ? (
            <DatePicker
              showTime
              defaultValue={moment()}
              placeholder={placeholder}
              size="large"
              format="YYYY-MM-DD hh:mm A"
              className="w-100"
              onChange={(event) => setStateWith(key, moment(event).valueOf())}
            />
          ) : (
            <Input
              placeholder={placeholder}
              size="large"
              className="w-100"
              type="number"
              value={state[key]}
              onChange={(event) => setStateWith(key, event.target.value)}
            />
          )}
        </div>
      ))}
    </Drawer>
  );
};

export default AddEntryDrawer;
