import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node", // O usa "jsdom" si estás probando código de front-end
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transforma archivos TypeScript con ts-jest
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: ["/node_modules/"],
};

export default config;

