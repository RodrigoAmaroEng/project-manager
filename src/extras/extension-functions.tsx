export {};
declare global {
  interface String {
    toCompleteDateTime(): String;
  }
}
function getLocale() {
  return navigator.language || navigator.languages[0];
}

String.prototype.toCompleteDateTime = function () {
  let d = new Date(this + "");
  let f = new Intl.DateTimeFormat(getLocale(), {
    dateStyle: "short",
    timeStyle: "short",
  });
  return f.format(d);
};
