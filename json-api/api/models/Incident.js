module.exports = {
  attributes: {
    datetime: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    person: {
      type: 'string'
    },
    category: { model: 'Category' },
  }
};
