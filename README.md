## Chrome App & GoLang App - Native Messaging Sample

> A starting point for building Chrome Application that uses Native Messaging protocol.

### What this project does:

This project demonstrates the communication between a Chrome Application and a Native Host Application. 

The Chrome Application will:

1. Connect to the Native Host.
2. Disconnect from the Native Host.
3. Send messages to the Native Host.
4. Display messages from the Native Host.

The Native Host Application will:

1. Listen for messages from Standard Input Stream.
2. Echo back the same messages which were sent from the Chrome Application, for the sake of simplicity, via Standard Output Stream. 

> **Note:** if you send the message "Hi", the Native Host shall respond with a different message. Just to show a simple implemtation on how to parse message's content.

### Included out of the box:

* [Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit)
* [Material Design](http://www.google.com/design/spec/material-design/introduction.html) layouts and components
* CSP'ed Polymer elements (elements that have been refactored to comply with [Content Security Policy](https://developer.chrome.com/apps/contentSecurityPolicy))

## Getting Started

The project is split into two portions: Chrome Application (**app** directory) and Native Host Application (**native** directory).

#### Getting started with Native Host Application

> **Note:** Native Host is written in GoLang, you will need to have Go installed in your local machine for generating appropriate executable. [Download Go here ](https://golang.org/)

1. Get a copy of the code
2. Use `go install` to generate an executable
3. Move your executable into **native/setup** directory.
4. Executate `install_host.sh` to start installataion.

The project currently supports only Linux/OSX installation. For Windows users, make sure to modify the manifest file ([Info](https://developer.chrome.com/apps/nativeMessaging#native-messaging-host)) and install the Native Host app appropriately ([Info](https://developer.chrome.com/apps/nativeMessaging#native-messaging-host-location)).


#### Getting started with Chrome Application

> **Note:** Make sure to install the Native Host Application first.

1. Get a copy of the code.
2. Load unpacked extension by provide the Chrome the path to **app** directory. For more instructions, see [Load the extension](https://developer.chrome.com/extensions/getstarted#unpacked)
3. Launch the Application.

### Install dependencies

The project requires the following major dependencies:

- Node.js, used to run JavaScript tools from the command line.
- npm, the node package manager, installed with Node.js and used to install Node.js packages.
- gulp, a Node.js-based build tool.
- bower, a Node.js-based package manager used to install front-end packages (like Polymer).
- go, a programming language used to compile native host.
