import { Record, RecordList } from "../extras/extension-functions";

test("Instance from array", () => {
  let row1 = new Record(1);
  let row2 = new Record(2);
  let row3 = new Record(3);

  let list = RecordList.fromList([row1, row2, row3]);
  expect(list).toContainEqual({ id: 1 });
  expect(list).toContainEqual({ id: 2 });
  expect(list).toContainEqual({ id: 3 });
});


test("When inserting generic values, it adds a calculated id", () => {
  let row1 = new Record(1);
  let row2 = new Record(2);
  let row3 = new Record(3);

  let list = RecordList.fromList([row1, row2, row3]);
  list.add({ name: "John"})

  expect(list).toContainEqual({ id: 4, name: "John" });
});

test("When inserting generic values, it adds a calculated id even if one previous record was deleted", () => {
  let row1 = new Record(1);
  let row3 = new Record(3);

  let list = RecordList.fromList([row1, row3]);
  list.add({ name: "John"})

  expect(list).toContainEqual({ id: 4, name: "John" });
});

test("Row from info", () => {
  let list = Record.from(1, { name: "John" });
  expect(list.name).toBe("John");
  expect(list.id).toBe(1);
});
