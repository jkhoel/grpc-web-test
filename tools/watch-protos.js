const { exec } = require("child_process");
const chokidar = require("chokidar");
const path = require("path");

const protoPath = path.join(__dirname, "../contracts");
console.log("👀 Watching .proto files in:", protoPath);

const run = () => {
  console.log("🔁 Change detected. Regenerating...");
  exec(
    "npm run generate:grpc",
    { cwd: path.join(__dirname, "../client") },
    (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
      } else {
        console.log(stdout);
      }
    }
  );
};

chokidar
  .watch(`${protoPath}/**/*.proto`, { ignoreInitial: true })
  .on("all", run);
