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
    modifyVars: { "@primary-color": "#0E34A0" }
  })
);

// , "@primary-color": "#414EC0"
