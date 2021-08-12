import React, { useEffect, useState } from "react";
import "./TabLayout.css";

export function Tab(props: any) {
  return (<div className="tab-content">{props.children}</div>);
}

export function TabLayout(props: any) {
  const [selectedTab, setSelectedTab] = useState(0);
  
  return (
    <div className="tab-layout">
      <div className="tabs-placeholder">
        {props.children.map((child: any, index: number) => {
          return (
            <div
              className="tab"
              onClick={() => setSelectedTab(index)}
              aria-selected={index === selectedTab}
            >
              {child.props.title}
            </div>
          );
        })}
      </div>
      {props.children.map((child: any, index: number) => {
        return <div className={index !== selectedTab ? "hidden" : ""}>{child}</div>
      })}
    </div>
  );
}
