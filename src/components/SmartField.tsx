import ContentEditable from "react-contenteditable";
import React, { Component, useRef, useState } from "react";
import "./SmartField.css";

export default function SmartField(props: any) {
  const [isActive, setActive] = useState(false);
  const [caretPos, setCaretPos] = useState({ left: 0, top: 0 });
  const [options, setOptions] = useState([]);
  const contentEditable: any = useRef();

  const parseText = (text = "") => {
    let regex = /@\((\d+),([A-Z]{2,})\)/;
    while (text.match(regex)) {
      setActive(false);
      let item = props.onRequestItem(text?.match(regex)?.[1]);
      text = text.replace(
        regex,
        "<span class='pill $2' contenteditable='false'><a href='#$2$1'>" +
          item.name +
          "</a></span>&#65279; "
      );
    }
    return text;
  };
  const [value, setValue] = useState(props.value ? parseText(props.value) : "");
  const extractText = (text = "") => text.replace(/<br\/?>/, "&#65279;");
  const getCursorPosition = () => {
    let target: any = contentEditable.current;
    const range = document.createRange();
    range.selectNodeContents(target);
    range.collapse(false);
    target.focus();
    const div = document.createElement("span");
    range.insertNode(div);
    const { top, left } = div.getBoundingClientRect();
    div.remove();
    return {
      top: top - target.getBoundingClientRect().top + target.offsetTop,
      left: left - target.getBoundingClientRect().left + target.offsetLeft,
    };
  };
  const updateValue = (value: string) => {
    let text = extractText(parseText(value));
    if (props.onChange) {
      let sanitizedText = text.replaceAll(
        /<span[^>]*><a href=['"]#(\w{2,})(\d+)['"]>[^>]*<\/a><\/span>/g,
        "@($2,$1)"
      );
      props.onChange(sanitizedText);
    }
    setValue(text);
    setCaretPos(getCursorPosition());

    if (text[text.length - 1] === "@") {
      setActive(true);
      setOptions(props.onSearch());
    } else if (isActive) {
      let filter = text
        .substring(text.lastIndexOf("@"), text.length)
        .replace("@", "");
      setOptions(props.onSearch(filter));
    }
    if (text.indexOf("@") < 0) {
      setActive(false);
    }
  };
  const select = (item: any) => {
    let current = value;
    current =
      current.substr(0, current.lastIndexOf("@")) +
      `@(${item.id},${item.type}) `;
    setActive(false);
    updateValue(current);
    contentEditable.current.focus();
  };
  const className = props.required && !value && " required" || "";
  return (
    <div className={`smart-field-container${className}`}>
      <div
        className="caret"
        data-testid="options-menu"
        style={{
          left: caretPos.left,
          top: caretPos.top,
          display: isActive ? "flex" : "none",
        }}
      >
        {options.map((it: any, i: number) => (
          <div className={it.type} key={i} onClick={() => select(it)}>
            {it.name}
          </div>
        ))}
      </div>
      <ContentEditable
        id={props.id}
        placeholder={props.placeholder}
        innerRef={contentEditable}
        data-testid="field-input"
        html={value}
        onChange={(e) => updateValue(e.target.value)}
        className="smart-field"
        tagName="span"
      />
    </div>
  );
}
