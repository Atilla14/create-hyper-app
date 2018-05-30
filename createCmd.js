var fs = require("fs")
var proc = require("child_process")

var shouldUpdate = true;
var TARGET_FILE = "./cmd.js"
//var command = " -n myApp --pdom git@bitbucket.org:juspay/purescript-presto-dom.git";

//exec2("chmod +x " + TARGET_FILE);
//exec2(TARGET_FILE + command);

createCommand()

function createCommand() {
  exec2("chmod +x " + TARGET_FILE);
  let logRows = fs.readFileSync(TARGET_FILE).toString().split('\n');
  let shellCaller = "#!/usr/bin/env node"
  shouldUpdate = !(logRows.indexOf(shellCaller) == -1)
  if (!shouldUpdate) {
    logRows.unshift(shellCaller);
    fs.writeFileSync(TARGET_FILE, logRows.join('\n'));
  }
}

function exec2(cmd) {
  try {
    let child_proc = proc.exec(cmd);
    child_proc.stdout.pipe(process.stdout);
    child_proc.stderr.pipe(process.stderr);
    process.on('exit', function () {
      child_proc.kill();
    });
    return 0;
  } catch (e) {
    return 1;
  }
}


