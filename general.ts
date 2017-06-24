/// <reference path="typings/globals/node/index.d.ts" />
"use strict"

import tl = require('vsts-task-lib/task');
import fs = require('fs');
import path = require('path');
import { ToolRunner } from 'vsts-task-lib/toolrunner';



export class DeisCommand {

  endpoint : string;
  username : string;
  password : string;
  serverURI : string;
  subCommand: string;
  multilineArgs: string;
  deisBinary: string;

    constructor() {
        this.endpoint = tl.getInput('deisService');
        this.username = tl.getEndpointAuthorizationParameter(this.endpoint, 'username', true);
        this.password = tl.getEndpointAuthorizationParameter(this.endpoint, 'password', true);
        let serverURIWithProtocol :string = tl.getEndpointUrl(this.endpoint, true);
        this.serverURI = serverURIWithProtocol.replace(/.*:\/\//, '')
        this.subCommand = tl.getInput('subCommand');
        this.multilineArgs = tl.getInput('arguments');
        let deisBinaryDir = process.env['SYSTEM_DEFAULTWORKINGDIRECTORY'];
        this.deisBinary = deisBinaryDir + '/deis'
    }

checkOSType() {
    let isWin = tl.osType().match(/^Win/);
    if (isWin) {
        tl.setResult(tl.TaskResult.Failed, "This task does not work for Windows agent")
        throw "This task does not work for Windows agent."
    }
}

init() {
    this.checkOSType();
    this.downloadDeis();
    this.login();
}

downloadDeis()  {

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
}

login()  {

    let deis = new ToolRunner(tl.which(this.deisBinary, true));
    deis.arg("auth:login");
    deis.arg(this.serverURI);
    deis.arg("--username=" + this.username);
    deis.arg("--password=" + this.password);

    try {
        deis.execSync();
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err);
        throw "Failed to login using deis auth:login command."
    }
}

exec() {
    this.execCommand();
}
async execCommand() : Promise<string> {

    let deis = new ToolRunner(tl.which(this.deisBinary, true));
    deis.arg(this.subCommand);
    if (this.multilineArgs) {
        this.multilineArgs.split(/\s+/).map(function (x) { deis.arg(x) });
    }

    try {
        await deis.exec();
        tl.setResult(tl.TaskResult.Succeeded, "deis command success.");
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err)
        throw "Failed to execute the deis command."
    }
    return ""
}

}

let command = new DeisCommand();
command.init();
command.exec();



