class BannerWebpackPlugin {
  apply(compiler) {
    const extensions = ["js", "css"];
    compiler.hooks.emit.tapAsync(
      "BannerWebpackPlugin",
      (compilation, callback) => {
        compilation.hooks.processAssets.tap("BannerWebpackPlugin", (assets) => {
          const assetPaths = Object.keys(assets).filter((path) => {
            const splitted = path.split(".");
            return extensions.includes(splitted[splitted.length - 1]);
          });
          assetPaths.forEach((assetPath) => {
            const asset = assets[assetPath];
            const source = `
                  /**
                   * Author: Leo
                   */
                  \n${asset.source()}`;
            assets[assetPath] = {
              source() {
                return source;
              },
              size() {
                return source.length;
              },
            };
          });
          callback();
        });
      }
    );
  }
}

module.exports = BannerWebpackPlugin;
