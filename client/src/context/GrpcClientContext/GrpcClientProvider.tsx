import React from "react";
import { PingPongServiceClient } from "@proto/services/pingpong.client";
import { GrpcClientContext } from "./GrpcClientContext";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";

// const hostname = process.env.VITE_GRPC_HOSTNAME || "http://localhost";
// const port = process.env.VITE_GRPC_PORT || "5153";

const hostname = "http://localhost";
const port = "5153";

// Transport using grpc-web (http/1.1 compatible)
const transport = new GrpcWebFetchTransport({
  baseUrl: `${hostname}:${port}`, // Update to match your server
});

// Create the client instance
const client = new PingPongServiceClient(transport);

export const GrpcClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <GrpcClientContext.Provider value={client}>
      {children}
    </GrpcClientContext.Provider>
  );
};
