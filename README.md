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
npm install -g protoc               # If on Windows, and this can also be done if the above command is not available on Unix/MacOS
```

Verify by running the command `protoc --version`. If the command is not found, then add the path to the protoc binary to the PATH environment variable.

Next, install `protoc-gen-js` and `protoc-gen-grpc-web` by running:

```bash
npm install -g protoc-gen-js
npm install -g protoc-gen-grpc-web

```

Generating the proto definition files is done by running the following command:

```bash
npm run build:protos
```

Additionally, we can watch the proto file for changes and automatically generate the client code by running one of the following commands:

```bash
npm run watch:protos    # starts a process to only watch for changes the proto files
npm run watch:dev       # starts both the vite server and the grpc watch process
```

At a minimum, to get the development enviroment running you need to run the following command:

```bash
npm run build:protos
npm run dev
```

This will build the proto definitions and start the vite server and open the app in your default browser. The app should be running on `http://localhost:5173`.

#### Environment Variables

Look at the example `.env.development` file for required environment variables. In a production environment, these variables should be put into a `.env.production` file instead.

## Server

There is missing HTTP/2 Support in gRPC-Web Without HTTPS. .NET’s gRPC-Web middleware requires either:

- HTTP/2 over HTTPS, or
- HTTP/1.1 with specific trailers-flush settings

When using HttpProtocols.Http1AndHttp2 over plain HTTP, and serving gRPC-Web, the browser may never flush streamed responses unless the response includes trailers and correctly terminates each message. However, gRPC-Web streaming does work properly when using HTTPS. This means the easist way to get the server and client to work together is to use HTTPS!

Most likely this means you need to accept the Dev Certificates (one-time setup):

```bash
dotnet dev-certs https --trust
```

This will prompt you to trust the certificate. Accept it and then run the server. The client should now be able to communicate with the server.
