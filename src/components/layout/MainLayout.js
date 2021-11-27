import React from "react";
import { Switch, Route } from "react-router-dom";
import MenuIcons from "./MenuIcons";
import Home from "../../views/Home";
import Timeline from "../../views/Timeline";
import AddEntryIcon from "../add-entry/AddEntryIcon";
import NoPageFound404 from "./NoPageFound404";

const MainLayout = () => {
  return (
    <div className="fe-main-layout w-100 h-100">
      <div className="fe-main-layout__content position-relative">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/timeline">
            <Timeline />
          </Route>
          <Route path="*">
            <NoPageFound404 />
          </Route>
        </Switch>
        <AddEntryIcon />
      </div>
      <div className="fe-main-layout__footer">
        <MenuIcons />
      </div>
    </div>
  );
};

export default MainLayout;
