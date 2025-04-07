import fs from "fs";
import path from "path";
import { execSync, spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_DIR = path.resolve(__dirname, "../../contracts");
const CLIENT_OUT = path.resolve(__dirname, "../src/proto");

const SHOULD_CLEAN = !process.argv.includes("--no-clean");

function getProtoFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getProtoFiles(filePath, baseDir));
    } else if (file.endsWith(".proto")) {
      results.push(path.relative(baseDir, filePath).replace(/\\/g, "/"));
    }
  });

  return results;
}

if (SHOULD_CLEAN && fs.existsSync(CLIENT_OUT)) {
  console.log(`🧹 Cleaning ${CLIENT_OUT}`);
  fs.rmSync(CLIENT_OUT, { recursive: true, force: true });
}
fs.mkdirSync(CLIENT_OUT, { recursive: true });

try {
  execSync("npm ls @protobuf-ts/plugin", {
    cwd: path.resolve(__dirname, "../client"),
    stdio: "ignore",
  });
} catch {
  console.log("📦 Installing @protobuf-ts/plugin...");
  execSync("npm install @protobuf-ts/plugin", {
    cwd: path.resolve(__dirname, "../client"),
    stdio: "inherit",
  });
}

const protoFiles = getProtoFiles(PROTO_DIR);
const protocArgs = [`-I${PROTO_DIR}`, ...protoFiles, `--ts_out=${CLIENT_OUT}`];

console.log("🔧 Running protoc with protobuf-ts plugin...");
const result = spawnSync("npx", ["protoc", ...protocArgs], {
  cwd: path.resolve(__dirname, "../client"),
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (result.status !== 0) {
  console.error("❌ protoc failed");
  process.exit(result.status);
}

console.log("\n✅ protobuf-ts client code generation complete.");
