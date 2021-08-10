import React, { useEffect, useState } from "react";
import "./TabLayout.css";

export function Tab(props: any) {

  return (
    <div className="tab" onClick={props.onClick} aria-selected={props.selected}>
      {props.title}
    </div>
  );
}

export function TabLayout(props: any) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabs, setTabs] = useState(
    props.children.map((child: any, index: number) =>
      React.cloneElement(child, {
        onClick: () => {
          setSelectedTab(index);
        },
        selected: index === selectedTab,
      })
    )
  );

  const updateChildren = () =>
    tabs.map((child: any, index: number) =>
      React.cloneElement(child, {
        selected: index === selectedTab,
      })
    );
  useEffect(() => setTabs(updateChildren()), [selectedTab]);

  return (
    <div className="tab-layout">
      <div className="tabs-placeholder">{tabs}</div>
      <div className="tab-content">{tabs[selectedTab].props.children}</div>
    </div>
  );
}
