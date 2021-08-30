import ContentEditable from "react-contenteditable";
import { useRef, useState } from "react";
import "./SmartField.css";
import "../extras/extension-functions";

const getCursorPosition = (target: any) => {
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

const extractText = (text = "") =>
  text
    .replace(/(?:<br\/?>)|(?:&#xFEFF;)|(?:&#65279;)/g, "")
    .replace(htmlFormatRegex, referenceMarkup);
const sp = "&#65279;";
const htmlFormatRegex =
  /(?:(?:&nbsp;)|\s)?<span[^>]* id=.#(\w)(\d+).>[^>]*<\/span>/g;
const htmlRender = "&nbsp;<span class='$2' id='$2$1'>{0}</span>";
const referenceMarkup = "@($2,$1)";
const referenceRegex = /@\((\d+),([A-Z]{1})\)/;
const parse = (text: string, query: any) => {
  while (text.match(referenceRegex)) {
    let matches = text?.match(referenceRegex);
    let item = query(matches?.[1], matches?.[2]);
    text = text.replace(referenceRegex, htmlRender.render(item.name));
  }
  return text;
};

const searchText = (text: string) => text.split("@")[1].split(" ")[0];

export default function SmartField(props: any) {
  const [search, setSearch] = useState("");
  const [caretPos, setCaretPos] = useState({ left: 0, top: 0 });
  const [options, setOptions] = useState([]);
  const contentEditable: any = useRef();
  const parseText = (text = "") => parse(text, props.onQueryItem);
  const [value, setValue] = useState(parseText(props.value));

  const onUpdate = (e: any) => {
    if (e.target.value !== value) {
      setValue(e.target.value);
      setCaretPos(getCursorPosition(contentEditable.current));
      if (e.target.value.indexOf("@") > -1) {
        let filter = searchText(e.target.value);
        setSearch(filter);
        setOptions(props.onSearch(filter));
      } else if (search) {
        setSearch("");
      }
      updateValue(e.target.value);
    }
  };

  const style = {
    left: caretPos.left,
    top: caretPos.top,
    display: search ? "flex" : "none",
  };

  const updateValue = (value: string) => {
    let text = extractText(value);
    props.onChange?.(text);
  };
  const select = (item: any) => {
    let current = value;
    current = current.replace("@" + search, `@(${item.id},${item.tag})`);
    setSearch("");
    setValue(parseText(current));
    contentEditable.current.focus();
  };
  let className = (props.required && !props.value && " required") || "";
  className += props.className ? ` ${props.className}` : "";
  return (
    <div className={`smart-field-container${className}`}>
      <div className="caret" data-testid="options-menu" style={style}>
        {options.map((it: any, i: number) => (
          <div className={it.tag} key={i} onClick={() => select(it)}>
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
        onChange={onUpdate}
        className="smart-field"
        tagName="span"
      />
    </div>
  );
}
