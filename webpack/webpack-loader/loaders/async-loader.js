// module.exports = function (content) {
//   console.log(content);
//   return content;
// };

module.exports = function (content, map, meta) {
  const callback = this.async();
  console.log("test2");
  setTimeout(() => {
    callback(null, content, map, meta);
  }, 2000);
};
