import zlib from "zlib";

export function Flowchart(props:any) {
  const code = zlib.deflateSync(Buffer.from(props.value, 'utf8')).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
  const type = props.type ?? "mermaid"
  return <img src={`https://kroki.io/${type}/svg/${code}`}/>
}