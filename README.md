# Skill Invocation Client (Under Devellopment - 15.05.2020)

SP 347 Skill Invocation Client


[![](/app/frontend/circuit/images/Screenshot_Skill_Invocation_Client.PNG)](http://www.youtube.com/watch?v=AX0XKIXNPGM "Skill Invocation Client")


***Fig. 1:*** *Screenshot of the Siemens Skill Invocation Client.* 

---
## Requirements

For development, you will only need Node.js, node global package, `npm` and `webpack` installed in your environement.
For a container installation, `Docker` is required. Please refer to the docker documentation for docker installation.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### Webpack
To install the latest release or a specific version, run one of the following commands:

```bash
npm install --global webpack
# or specific version
npm install --global webpack@<version>
```

### Docker
Please refer to the docker documentation for docker installation.

---
## Installation

#### Step 1: Download the project

    $ git clone https://github.com/jupiterbak/Siemens_Skill_Invokation_Client.git
    $ cd Siemens_Skill_Invokation_Client

#### Step 2: Install all  dependencies via `npm`
If the host has an internet connection, update and install the packages using `npm`. Alternatively, download the release package with all dependencies.

```
$ npm install
```

#### Step 3: Compile an build the webpack packages via `npm`
Compile and build the webpack packages using `npm`. 

```
$ npm run build
```

#### Step 4: Start the skill monitoring service
The skill invocation client requires the skill monitoring service. The ***Skill Monitoring Service*** is responsible for the discovery, indentification, matching, monitoring and interfacing of a skill implementated in an OPC UA server. The server should follow the skill concept of the SP347 Project.

All intruction for the installation and the start of the service is provided at: [https://github.com/jupiterbak/WDISS/tree/master/skillmonitoring](https://github.com/jupiterbak/WDISS/tree/master/skillmonitoring).

A zip source of the ***Skill Monitoring Service*** as well as some DEMO OPC UA Server can be found under the folder ***services***.

#### Step 5: Set the environment variable `OPCUA_BACKEND_URL`

In order for the skill invocation client to use the  ***Skill Monitoring Service***, an environment variable  `OPCUA_BACKEND_URL` with the value of the access point of the ***Skill Monitoring Service*** has to be set.

```
$ export OPCUA_BACKEND_URL="http://0.0.0.0:8080/" 
```
#### Step 6: Start the ***Skill Invocation Client*** (recommended)

Run the following:

```bash
$ npm run start
```
After a sucessfull startup the following output should be printed. Please notice the information that all modules have been sucessfully initialized and started.

```console

C:\GitHub\OPEN-ACCESS>npm start

> skill_invocation_client@0.0.1 start C:\GitHub\Siemens_Skill_Invokation_Client
> node ./app/backend/index.js

using phantomJS for server side rendering of shape previews: C:\GitHub\Siemens_Skill_Invokation_Client\node_modules\phantomjs\lib\phantom\bin\phantomjs.exe
+------------------------------------------------------------+
| Welcome to the SP347 Skill Invokation Client               |
|------------------------------------------------------------|
| System is up and running. Copy the URL below and open this |
| in your browser: http://192.168.245.1:7400/                |
|                  http://localhost:7400/                    |
+------------------------------------------------------------+

```

#### Step 7: Enjoy

Open [http://localhost:7400/circuit/](http://localhost:7400/circuit/) and take a look around. Contact Jupiter for a short introduction.

<!-- DOCKER INSTALLATION -->
## Deploy as a Microservice using Docker[Swarm]

You can also deploy as a microservice inside a Docker container:

#### Step 1: Clone the repo

```bash
git clone https://github.com/jupiterbak/Siemens_Skill_Invokation_Client.git
cd Siemens_Skill_Invokation_Client
```

#### Step 2: Build the Docker image

```bash
docker build -t skill_invocation_client .
```

#### Step 3: Run the Docker container locally

```bash
docker run -p 7400:7400 -d skill_invocation_client
```

#### Step 3_a: (Alternativ) Run the Docker container in the cluster

```bash
sudo docker-compose build
```

```bash
docker stack deploy --compose-file docker-compose.yml SKILL_INVOCATION_CLIENT_STACK
```

<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the GPLv3 License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Jupiter Bakakeu - [@JBakakeu](https://twitter.com/JBakakeu) - jupiter.bakakeu@gmail.com
Project Link: [https://github.com/jupiterbak/Siemens_Skill_Invokation_Client](https://github.com/jupiterbak/Siemens_Skill_Invokation_Client)