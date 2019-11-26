import { withDescendants } from "./withDescendants";

const cat = {"createdAt":1574709072301,"updatedAt":1574709072301,"id":19,"label":"AA","parent":null} 
const cats = {all:[{"id":null,"label":"All incidents"},{"createdAt":1574697976377,"updatedAt":1574697976377,"id":15,"label":"Birthday","parent":null},{"createdAt":1574705120847,"updatedAt":1574705120847,"label":"FOODs","parent":18,"id":16},{"createdAt":1574705892551,"updatedAt":1574705892551,"id":18,"label":"Q","parent":null},{"createdAt":1574709072301,"updatedAt":1574709072301,"id":19,"label":"AA","parent":null},{"createdAt":1574711984003,"updatedAt":1574711984003,"id":21,"label":"bob","parent":19},{"createdAt":1574712394081,"updatedAt":1574712394081,"id":22,"label":"Square","parent":21}]}

test('withDescendants', () => {
  expect(withDescendants(cat, cats).map(c=>c.id)).toStrictEqual([19,21,22]);
});