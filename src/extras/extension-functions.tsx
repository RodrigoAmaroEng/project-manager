export {};
declare global {
  interface String {
    toCompleteDateTime(): String;
  }
  interface Array<T> {
    contains(item: T): boolean;
    first(condition: (value: T) => boolean): T
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
Array.prototype.contains = function (item: any) {
  return this.indexOf(item) >= 0;
};
Array.prototype.first = function (condition: (value: any) => boolean) {
  let result =this.filter(condition)
  if (result.length > 0) {
    return result[0]
  }
  return;
};