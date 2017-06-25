Deis Task for VSTS
===

This task is an unofficial Deis workflow task for VSTS. This task help you to execute deis workflow command without login and downloading deis binary.

Currently, this task is private preview. If you want to use it, please let me know.

![Header](https://raw.githubusercontent.com/TsuyoshiUshio/DeisTask/master/images/marketplace.png)

# 1. How to use it

## 1.1. Install extension.

You can find this task on the marketplace in near future. Then push the install button.

## 1.2. Task Configuration

This task only works on Linux. I recommend to use this with Linux hosted preview agent. You can find this task on the "Utility" section. This task execute deis command. It automatically download deis binary then login your deis workflow. After that this command will execute your command.

![Header](https://raw.githubusercontent.com/TsuyoshiUshio/DeisTask/master/images/DeisTask.png)

* deis endpoint

You need to specify the endpoint. I'll expain it on the next section.

* Sub Command

You can speficy any sub command of deis workflow binary. 

* Argument

you can add additional argumets or options with a space delimiter. 

## 1.3. Endipoint Configuration

Choose the Deis workflow endpoint

![Endpoint](https://raw.githubusercontent.com/TsuyoshiUshio/DeisTask/master/images/endpoint.png)

Then configure it.

![Endpoint Config](https://raw.githubusercontent.com/TsuyoshiUshio/DeisTask/master/images/endpointconfig.png)

* Connection name
  
  The endpoint name. You can choose any unique name on your project.

* Server URL

A fully-qualified contoller URI of deis workflow. e.g. "http://deis.local3.deisapp.com".

* username
Provide a username for the deis workflow account

* password
Provide a password for the deis workflow account

Then enjoy this task.

# 2. Contribution

You can use/folk/contribute this task. 

# 2.1. Prerequisite

You need typings / tsc / tfx commands. 

Please refer these to install.

```
npm install
npm install typings@2.1.0  --global-style
npm install typescript@2.1.5 --global-style
npm install tfx-cli@v0.4.9  --global-style
```

FYI:
[typings](https://www.npmjs.com/package/typings)
[tfx-cli](https://www.npmjs.com/package/tfx-cli)
[typescript](https://www.typescriptlang.org/docs/tutorial.html)

## 2.2. deploy

I config the package.json for windows. If you use Mac, please refer the package.json and try to create your own package.json

This npm command will compile your ts file then deploy the code and library into tasks/general folder. 

```
npm run deploy
```

## 2.3. build

This command build vsix file for uploading the market place. 

```
npm run build
```

## Loadmap

I'll implement unit testing for this task. Also, I'm not good at async treatment. I'd like to use the asyncronous programming for this task more.

## Push to the Market place

Go to the Market place [Market Place Manage](https://marketplace.visualstudio.com/manage)
Then upload and share with your VSTS account. Like this.
[Tsuyoshi Ushio's publisher site](https://marketplace.visualstudio.com/manage/publishers/tsuyoshiushio)

Stable version is 1.0.0 or later. You can test it make it 0.x.x with preview tag.

# 7 Resources

[Step by Step: Node Task with Typescript API](https://github.com/Microsoft/vsts-task-lib/blob/master/node/docs/stepbystep.md)

