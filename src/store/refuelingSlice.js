import { createSlice } from "@reduxjs/toolkit";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { getFromLS, saveToLS } from "../components/utils";

export const refuelingSlice = createSlice({
  name: "refueling",
  initialState: {
    latestInfo: getFromLS("latestInfo") || {},
    previousInfo: getFromLS("previousInfo") || {},
    totalDistance: getFromLS("totalDistance") || 0,
    totalFuel: getFromLS("totalFuel") || 0,
    currentMonthInfo: getFromLS("currentMonthInfo") || {},
    previousMonthInfo: getFromLS("previousMonthInfo") || {},
    refuelingHistory: getFromLS("refuelingHistory") || [],
    refuelingTimelineList: [],
    hasMore: true,
  },
  reducers: {
    addRefuelingRecord: (state, action) => {
      const info = action.payload;
      const { odometer, dateTime, totalAmount } = info;

      // 1. OPERATIONS FOR LATEST & CURRENT INFO
      const previousInfo = cloneDeep(state.latestInfo);
      const latestInfo = cloneDeep(info);

      // 2. OPARATIONS FOR TOTAL DISTANCE
      const totalDistance =
        state.totalDistance + (odometer - previousInfo.odometer || 0);

      // 3. OPERATIONS FOR TOTAL FUEL
      const totalFuel = state.totalFuel + (previousInfo.fuelInLitre || 0);

      // 4. OPERATIONS FOR CURRENT & PREVIOUS MONTH REFUELING INFO
      let currentMonthInfo = { dateTime, totalAmount };
      let previousMonthInfo = cloneDeep(state.previousMonthInfo);
      if (!isEmpty(state.currentMonthInfo)) {
        //compare prev info's month & current info's month
        const currMonth = moment(dateTime).month();
        const prevMonth = moment(state.currentMonthInfo.dateTime).month();
        const currYear = moment(dateTime).year();
        const prevYear = moment(state.currentMonthInfo.dateTime).year();
        if (currMonth === prevMonth && currYear === prevYear)
          currentMonthInfo["totalAmount"] =
            state.currentMonthInfo.totalAmount + totalAmount;
        else previousMonthInfo = cloneDeep(state.currentMonthInfo);
        //check for prev month
      }

      // 5. OPERATIONS FOR STORING ALL THE REFUELING INFOS
      const refuelingHistory = [latestInfo, ...state.refuelingHistory];

      state.latestInfo = latestInfo;
      state.previousInfo = previousInfo;
      state.totalDistance = totalDistance;
      state.totalFuel = totalFuel;
      state.currentMonthInfo = currentMonthInfo;
      state.previousMonthInfo = previousMonthInfo;
      state.refuelingHistory = refuelingHistory;

      saveToLS("latestInfo", latestInfo);
      saveToLS("previousInfo", previousInfo);
      saveToLS("totalDistance", totalDistance);
      saveToLS("totalFuel", totalFuel);
      saveToLS("currentMonthInfo", currentMonthInfo);
      saveToLS("previousMonthInfo", previousMonthInfo);
      saveToLS("refuelingHistory", refuelingHistory);
    },
    loadMoreList: (state) => {
      if (!state.hasMore) return;

      const refuelingTimelineList = cloneDeep(state.refuelingTimelineList);
      const refuelingHistory = cloneDeep(state.refuelingHistory);

      const size = 10;
      const startIdx = refuelingTimelineList.length;
      const endIdx = startIdx + size;
      let newItems = [];
      for (
        let pos = startIdx;
        pos < Math.min(endIdx, refuelingHistory.length);
        pos++
      ) {
        newItems.push(refuelingHistory[pos]);
      }
      state.refuelingTimelineList = [...refuelingTimelineList, ...newItems];
      state.hasMore = endIdx < refuelingHistory.length;
    },
    resetTimeline: (state) => {
      state.refuelingTimelineList = [];
      state.hasMore = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addRefuelingRecord, loadMoreList, resetTimeline } =
  refuelingSlice.actions;

export default refuelingSlice.reducer;
