import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMoreList, resetTimeline } from "../store/refuelingSlice";
import RefuelingList from "../components/timeline/RefuelingList";
import Icon from "../components/common/Icon";
import { dateFormat } from "../components/utils";

const Timeline = () => {
  const dispatch = useDispatch();
  const items = useSelector(({ refueling }) => refueling.refuelingTimelineList);
  const hasMore = useSelector(({ refueling }) => refueling.hasMore);

  const fetchMoreData = () => {
    dispatch(loadMoreList());
  };

  useEffect(() => {
    dispatch(resetTimeline());
    dispatch(loadMoreList());
  }, []);

  return (
    <div className="w-100 h-100">
      <RefuelingList list={items} hasMore={hasMore} fetchMore={fetchMoreData}>
        <div className="p-4">
          {items.map(({ totalAmount, odometer, dateTime }, index) => (
            <div
              key={index}
              className={`w-100 d-flex align-items-center justify-content-between mt-bg-dim-dark p-3 rounded-6 ${
                index && items.length ? "mt-4" : ""
              }`}
            >
              <div className="d-flex align-items-center">
                <div style={{ width: "40x", height: "40px" }}>
                  <Icon
                    id={index % 2 ? "half-drop" : "bucket"}
                    size="lg"
                    iconClass="p-1"
                    wrapperClass="mt-bg-primary rounded-circle mt-color-light"
                  />
                </div>
                <div className="ms-4">
                  <div className="mt-color-light fs-4">Refueling</div>
                  <div className="mt-color-dim-light">
                    {dateFormat(dateTime)}
                  </div>
                  <div className="mt-color-dim-light d-flex align-items-center">
                    <Icon id="odometer" size="tiny" />
                    <div className="ms-2"> {odometer} km</div>
                  </div>
                </div>
              </div>
              <div className="mt-color-light fs-5 text-center">{`₹ ${totalAmount}`}</div>
            </div>
          ))}
        </div>
      </RefuelingList>
    </div>
  );
};
export default Timeline;
