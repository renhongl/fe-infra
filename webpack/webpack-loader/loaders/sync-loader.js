// module.exports = function (content) {
//   console.log(content);
//   return content;
// };

module.exports = function (content, map, meta) {
  console.log("test1");
  this.callback(null, content, map, meta);
};
