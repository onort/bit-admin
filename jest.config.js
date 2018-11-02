module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["<rootDir>/testSetup/enzymeSetup.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy"
  },
  collectCoverageFrom: ["**/*.{ts, tsx}"]
  // coverageThreshold: {
  //   global: {
  //     statements: ,
  //     branches: ,
  //     functions: ,
  //     lines: ,
  //   },
  // },
}
