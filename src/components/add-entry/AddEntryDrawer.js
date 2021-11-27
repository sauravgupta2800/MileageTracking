import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Drawer, Input, DatePicker, message } from "antd";
import Icon from "../common/Icon";
import {
  addRefuelingRecord,
  loadMoreList,
  resetTimeline,
} from "../../store/refuelingSlice";
import { fields } from "./config";

const AddEntryDrawer = ({ visible, title = "Refueling", onClose }) => {
  const [state, setState] = useState({});
  const dispatch = useDispatch();
  const totalDistance = useSelector(
    ({ refueling }) => refueling.latestInfo.odometer || 0
  );

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
    if (fields.map(({ key }) => state[key]).some((value) => !value)) {
      message.error(`Field(s) can't be empty!`);
      return;
    }
    dispatch(addRefuelingRecord(state));
    message.success(`Record Saved`);
    onClose();
    dispatch(resetTimeline());
    dispatch(loadMoreList());
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
        <div key={key} className="w-100 mb-4">
          <div className="d-flex align-items-center">
            <Icon
              id={icon}
              iconClass="me-3"
              iconClass="mt-color-primary me-3"
            />
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
              <>
                <Input
                  placeholder={placeholder}
                  size="large"
                  className="w-100"
                  type="number"
                  value={state[key]}
                  onChange={(event) =>
                    setStateWith(key, Number(event.target.value))
                  }
                />
              </>
            )}
          </div>

          {key === "odometer" && (
            <div className="mt-color-dim-light fs-5 ms-5 mt-1">{`Last value: ${totalDistance} KM`}</div>
          )}
        </div>
      ))}
    </Drawer>
  );
};

export default AddEntryDrawer;
