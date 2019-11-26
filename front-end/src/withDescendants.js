const children = (cat, cats) => cats.all.filter(c => c.parent === cat.id)

//get a category and all it's sub-categories

export const withDescendants = (cat, cats) => [
  cat,
  ...children(cat, cats)
    .reduce((a, c) => [...a, ...withDescendants(c, cats)], [])
]