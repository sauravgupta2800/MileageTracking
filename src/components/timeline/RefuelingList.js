import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const RefuelingList = ({ list = [], hasMore = true, fetchMore, ...rest }) => {
  return (
    <div className="w-100 h-100 mt-scroll-y" id="scrollableDiv">
      <InfiniteScroll
        dataLength={list.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4 className="mt-color-light p-3">Loading...</h4>}
        endMessage={
          <div className="mt-color-light text-center fs-3 p-4 pt-0">
            It is all, nothing more
          </div>
        }
        scrollableTarget="scrollableDiv"
      >
        {rest.children}
      </InfiniteScroll>
    </div>
  );
};

export default RefuelingList;
