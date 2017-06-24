/// <reference path="typings/globals/node/index.d.ts" />
"use strict"

import tl = require('vsts-task-lib/task');
import fs = require('fs');
import path = require('path');
import { ToolRunner } from 'vsts-task-lib/toolrunner';

var isWin = tl.osType().match(/^Win/);
if (isWin) {
    tl.setResult(tl.TaskResult.Failed, "This task does not work for Windows agent")
    throw "This task does not work for Windows agent."
}

let endpoint = tl.getInput('deisService');

let username :string = tl.getEndpointAuthorizationParameter(endpoint, 'username', true);
let password :string = tl.getEndpointAuthorizationParameter(endpoint, 'password', true);
let serverURIWithProtocol :string = tl.getEndpointUrl(endpoint, true);
let serverURI = serverURIWithProtocol.replace(/.*:\/\//, '')

let subCommand: string = tl.getInput('subCommand');
let multilineArgs: string = tl.getInput('arguments');

let bash = new ToolRunner(tl.which('bash', true));
let downloader = "curl -sSL http://deis.io/deis-cli/install-v2.sh | bash";
let filename = './.deisdownloader.sh';
fs.writeFileSync(filename, downloader);

bash.arg(filename);
try {
    bash.execSync();
} catch (err) {
    tl.setResult(tl.TaskResult.Failed, err);
    throw "Failed to exec the .deisdownloader.sh which is deis downloader."
}
let deisBinaryDir = process.env['SYSTEM_DEFAULTWORKINGDIRECTORY'];


let deis = new ToolRunner(tl.which(deisBinaryDir + '/deis', true));
deis.arg("auth:login");
deis.arg(serverURI);
deis.arg("--username=" + username);
deis.arg("--password=" + password);

try {
    deis.execSync();
} catch (err) {
    tl.setResult(tl.TaskResult.Failed, err);
    throw "Failed to login using deis auth:login command."
}


deis = new ToolRunner(tl.which(deisBinaryDir + '/deis', true));
deis.arg(subCommand);
if (multilineArgs) {
    multilineArgs.split(/\s+/).map(function (x) { deis.arg(x) });
}

try {
    deis.execSync();
    tl.setResult(tl.TaskResult.Succeeded, "deis command success.");
} catch (err) {
    tl.setResult(tl.TaskResult.Failed, err)
    throw "Failed to execute the deis command."
}
// deis command download and chmod

// deis execute. 

