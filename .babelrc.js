const isTest = String(process.NODE_ENV) === "test"

module.exports = {
  presets: [["env", { modules: isTest ? "commonjs" : false }], "react"],
  plugins: [
    "transform-class-properties",
    "syntax-dynamic-import",
    isTest ? "dynamic-import-node" : null
  ].filter(Boolean)
}