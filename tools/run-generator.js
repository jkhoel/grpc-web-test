const { exec } = require("child_process");
const isWindows = process.platform === "win32";

exec(
  isWindows ? "powershell.exe ./generate-grpc.ps1" : "bash ./generate-grpc.sh",
  { cwd: __dirname },
  (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      process.exit(1);
    }
    console.log(stdout);
  }
);
