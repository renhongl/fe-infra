module.exports = function (content, map, meta) {
  const newContent = content.replace(/console\.log\(.*\);?/g, "");
  this.callback(null, newContent, map, meta);
};
