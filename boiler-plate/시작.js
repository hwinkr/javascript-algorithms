const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(path.resolve(__dirname, "test.txt"))
  .toString()
  .trim()
  .split("\n");
