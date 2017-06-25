Deis Task for VSTS
===

This task is an unofficial Deis workflow task for VSTS. This task help you to execute deis workflow command without login and downloading deis binary.

Currently, this task is private preview. If you want to use it, please let me know. The GitHub Repository is [here](https://github.com/TsuyoshiUshio/DeisTask).

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