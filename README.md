# [5G-Media SDK All-in-One User Interface](http://www.5gmedia.eu/)

## Features

All 5G-MEDIA SDK tools are encapsulated in an all-in-one-UI which provides an easy-to-use user interface to following SDK tools:

- **Editor** is a web-based application whose frontend is running in the developer’s local Open Source MANO (OSM) environment so that the developer can manage emulation environments such as vim-emu and faas-vim. Its main purpose is to assist with creating and editing of applications and their descriptors.
- **Private Catalogue** The descriptors of available applications and NSs of the developer are stored in private catalogue of 5G-MEDIA SDK in developer's local environment. Through MANO plugin of the private catalogue, the descriptors are automatically onboarded to developer's local OSM.
- **Public Catalogue** The descriptors of available applications and NSs of the platform are stored in public catalogue of 5G-MEDIA SDK
- **Service Monitoring** The monitoring tool offered in 5G-MEDIA SDK helps media application developers gather and centralize monitored metrics into a local database. Metrics can be queried from either FaaS or non-FaaS VNFs that are deployed in the emulator.
- **Validator** Validator is the main interface for the developers to write/edit both NSDs and VNFDs, and validate them against TOSCA-based and/or OSM-IM based schemas. Validated TOSCA-based descriptors are then onboarded to the private catalogue via the validator web user interface (UI).
- **Benchmarking** Benchmarking is offered in 5G-MEDIA SDK supports load-testing under several resource constraints on VNFs that are deployed on the emulation environment. During these load-tests, a set of various metrics can be monitored and application developers can benefit from these monitoring metrics for finding bugs, detecting congestions or investigating issues in their applications.
- **CNO Training GUI** Using this tool, the developer can configure a training model based on reinforcement learning, view the training performance and if the model achieves desirable performance, the developer can deploy it to SVP in order to have it utilized by the CNO.
- **SVP Runtime Advisor** The SVP Runtime Advisor is a recently developed tool that aims to feed the developer with necessary information about how their services are working in the operational environment. This is particularly necessary when the emulation environment capabilities are significantly different from those in the operational environment.
- **LeanOW CLI** This tool helps us control the openwhisk machine by opening a commandline interface.
- **OSM CLI** This tool helps us control the OSM by opening a commandline interface.

## Prerequisites

Google Chrome Installation

1.  Download Google Chrome `https://www.google.com/chrome/` and install.
2.  Be sure of web browser, installed under `C:/Program Files (x86)/Google/Chrome/Application/chrome.exe`
3.  Create a shortcut with new option at the target `--disable-web-security --disable-gpu`
4.  (Developer) Install `Redux DevTools` extension via `https://chrome.google.com/webstore/category/extensions`

Node and Yarn

- Ubuntu

1.  curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
2.  sudo apt-get install nodejs
3.  curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
4.  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
5.  sudo apt-get update && sudo apt-get install yarn

- Windows

1.  Download and install nodejs : https://nodejs.org/en/download/
2.  Download and install yarn : https://yarnpkg.com/lang/en/docs/install/#windows-stable

5G-Media All in One SDK UI Backend

1.  Follow the installation steps `https://github.com/5g-media/All-in-one-ui-backend/blob/master/README.md`

xterm-server

1.  Follow the installation steps `https://github.com/5g-media/xterm-server/blob/master/README.md`

**DevStack**

1.  Follow the installation steps [Installing DevStack for 5G-MEDIA](DevStack Installation.md)

## Installation

1.  Clone the repo `git clone https://github.com/5g-media/sdk-all-in-one.git ~/sdk/sdk-all-in-one`
2.  Go to your project folder `cd ~/sdk/sdk-all-in-one/`
3.  Run `yarn install` command
4.  Update `REACT_APP_AIO_SERVER_IP` with IP address of ValidationExtractService in `.env` file
5.  Start a screen `screen -S sdk-aio`
6.  Start all-in-one `yarn start`
7.  Detach the screen (Ctrl+A,D)

## Starting Application

1.  Open the web browser with the shortcut `IP:8401`
2.  For the first time, enter the config page and fill necessary fields to use the components
