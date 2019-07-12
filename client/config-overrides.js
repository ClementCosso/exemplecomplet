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
    modifyVars: {
      "@primary-color": "#03B96C",
      "@table-header-bg": "#f2f2f2",
      "@table-row-hover-bg": "#f2f2f2",
      "@text-color": "#63666a"
    }
  })
);

// , "@primary-color": "#414EC0"
