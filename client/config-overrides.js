const darkTheme = require("@ant-design/dark-theme").default;
const { override, fixBabelImports, addLessLoader } = require("customize-cra");
console.log(darkTheme);
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#00BFA5" }
  })
);

// , "@primary-color": "#414EC0"
