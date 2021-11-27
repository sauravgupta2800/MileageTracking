import moment from "moment";
import { dateFormat, fixedDecimalNoRoundOff } from "./../utils";

export const cardList = [
  {
    title: "Petrol",
    titleIcon: "oil",
    items: [
      {
        title: "",
        icon: "half-drop",
        mainText: ({ totalDistance, totalFuel }) => {
          return `${
            totalFuel ? fixedDecimalNoRoundOff(totalDistance / totalFuel, 2) : 0
          }`;
        },
        subText: "km/l",
        label: "Average fuel consumption",
      },
      {
        title: "",
        icon: "bucket",
        mainText: ({ latestInfo, previousInfo }) => {
          const { odometer: latestReading = 0 } = latestInfo;
          const { odometer: prevReading = 0, fuelInLitre = 0 } = previousInfo;
          return fuelInLitre
            ? `${fixedDecimalNoRoundOff(
                (latestReading - prevReading) / fuelInLitre,
                2
              )}`
            : "0";
        },
        subText: "km/l",
        label: "Last fuel consumption",
      },
      {
        title: "",
        icon: "tag",
        mainText: ({ latestInfo }) => {
          const { pericePerLitre = 0 } = latestInfo;
          return `${pericePerLitre}`;
        },
        subText: "₹/l",
        label: "Last fuel price",
      },
      {
        title: "",
        icon: "",
        mainText: "",
        subText: "",
        label: ({ latestInfo }) => {
          const { dateTime } = latestInfo;
          return dateTime
            ? `${dateFormat(dateTime)} · ${moment(dateTime).fromNow()}`
            : "";
        },
      },
    ],
  },

  {
    title: "Costs",
    titleIcon: "cost",
    items: [
      {
        title: "This month",
        icon: "half-drop",
        mainText: ({ currentMonthInfo }) => {
          const { totalAmount = 0 } = currentMonthInfo;
          return `${totalAmount}`;
        },
        subText: "₹",
        label: "Petrol",
      },
      {
        title: "Previous month",
        icon: "half-drop",
        mainText: ({ previousMonthInfo }) => {
          const { totalAmount = 0 } = previousMonthInfo;
          return `${totalAmount}`;
        },
        subText: "₹",
        label: "Petrol",
      },
    ],
  },
  {
    title: "Last entries",
    titleIcon: "timeline",
    items: [
      {
        title: ({ latestInfo }) => {
          const { dateTime } = latestInfo;
          return dateTime
            ? `${dateFormat(dateTime, "DD MMMM,YYYY hh:mm")}`
            : "";
        },
        icon: "half-drop",
        mainText: ({ latestInfo }) => {
          const { totalAmount = 0 } = latestInfo;
          return `${totalAmount}`;
        },
        subText: "₹",
        label: "Refueling",
      },
      {
        title: ({ previousInfo }) => {
          const { dateTime } = previousInfo;
          return dateTime
            ? `${dateFormat(dateTime, "DD MMMM, YYYY hh:mm")}`
            : "";
        },
        icon: "half-drop",
        mainText: ({ previousInfo }) => {
          const { totalAmount = 0 } = previousInfo;
          return `${totalAmount}`;
        },
        subText: "₹",
        label: "Refueling",
      },
    ],
  },
];
