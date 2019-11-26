module.exports = {
  attributes: {
    label: { type: 'string' },
    parent: { model: 'Category' },
    categories: {
      collection: 'category',
      via: 'parent'
    },
    incidents: {
      collection: 'incident',
      via: 'category'
    }
  }
};
