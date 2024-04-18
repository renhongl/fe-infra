const schema = require("./schema.json");

module.exports = function (content, map, meta) {
  const options = this.getOptions(schema);
  const prefix = `
        /**
         * Author: ${options.author}
         */
    `;

  this.callback(null, prefix + content, map, meta);
};
