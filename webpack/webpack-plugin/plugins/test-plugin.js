class TestPlugin {
  constructor() {
    console.log("TestPlugin constructor()");
  }

  apply(compiler) {
    console.log("TestPlugin apply()");

    compiler.hooks.compile.tap("TestPlugin", (compilationParams) => {
      console.log("compiler.compile()");
    });

    compiler.hooks.make.tap("TestPlugin", (compilation) => {
      console.log("compiler.make() tap 111", compilation);
      setTimeout(() => {
        console.log("compiler.make() tap 222");
      }, 2000);
      console.log("compiler.make() tap 333");
    });

    // compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
    //   console.log("compiler.make() tapAsync 111");
    //   setTimeout(() => {
    //     console.log("compiler.make() tapAsync 222");
    //     callback();
    //   }, 2000);
    //   console.log("compiler.make() tapAsync 333");
    // });
  }
}

module.exports = TestPlugin;
