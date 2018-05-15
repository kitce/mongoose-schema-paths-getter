const exclude = ['_id', '__v'];
const method = 'getPaths';

module.exports = (schema, options = {}) => {
  const _exclude = exclude.concat(options.exclude);
  const _method = options.method || method;
  schema.method(_method, function () {
    const {paths} = this.schema;
    const _paths = [];
    for (const path in paths) {
      if (paths.hasOwnProperty(path) && _exclude.indexOf(path) < 0) {
        _paths.push(path);
      }
    }
    return _paths;
  });
};
