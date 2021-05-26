import pkg from "./package.json";
import typescript from "rollup-plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
import nodePolyfills from "rollup-plugin-node-polyfills";
import json from "@rollup/plugin-json";
import clear from "rollup-plugin-clear";
import progress from "rollup-plugin-progress";

export default {
  input: "./src/main.ts",
  inlineDynamicImports: true,
  output: [
    {
      format: "cjs",
      file: pkg.main,
      sourcemap: true,
    },
    {
      format: "es",
      file: pkg.module,
      sourcemap: true,
    },
  ],
  plugins: [
    clear({
      targets: ["lib"],
    }),
    progress({
      clearLine: false,
    }),
    typescript(),
    sourceMaps(),
    nodePolyfills(),
    json(),
  ],
};
