# grpc-web-test

A small test project for testing out gRPC communications between a React App and .NET 8 Backend

## Contracts

Both the client and server share the same proto files, located in the `contracts` folder. The proto-files are used to generate the client and server code for the gRPC communication. See below for steps required to generate the code.

## Client

The client is a React app with Vite as the build tool. It uses the [grpc-web package](https://www.npmjs.com/package/grpc-web) to communicate with the gRPC server as web browsers do not support HTTP/2 natively.

### Development

Firstly, it is recommended that development for the client code is done via WSL or a similar environment. This is because unix commands and tools are usually
the norm and tends to be much more reliable than the Windows counterparts.

The client has a couple of extra commands to generate the gRPC client code from the proto file. But first, install the dependencies by running:

```bash
# protoc is required to generate the client code
sudo apt  install protobuf-compiler # Ubuntu or similar
npm install -g protoc # If on Windows, and this can also be done if the above command is not available on Unix/MacOS
```

Verify by running the command `protoc --version`. If the command is not found, then add the path to the protoc binary to the PATH environment variable.

Next, install `protoc-gen-js` and `protoc-gen-grpc-web` by running:

```bash
npm install -g protoc-gen-js
npm install -g protoc-gen-grpc-web

```

Generating the proto definition files is done by running the following command:

```bash
npm run generate:grpc
```

Additionally, we can watch the proto file for changes and automatically generate the client code by running one of the following commands:

```bash
npm run dev:grpc # starts a process to only watch for changes the proto files
npm run dev:full # starts both the vite server and the grpc watch process
```

Both use the generate-grpc scripts found in the `tools` folder, and cleans all previously generated code before generating new code. If this is not wanted, then use the no-clean flags:

```bash
./generate-grpc.sh --no-clean
./generate-grpc.ps1 -NoClean
```

#### Environment Variables

Look at the example `.env.development` file for required environment variables. In a production environment, these variables should be put into a `.env.production` file instead.
