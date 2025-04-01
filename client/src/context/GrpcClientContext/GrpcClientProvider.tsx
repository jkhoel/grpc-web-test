import React from "react";
import { PingPongServiceClient } from "@proto/services/pingpong.client";
import { GrpcClientContext } from "./GrpcClientContext";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";

const hostname = import.meta.env.VITE_GRPC_HOSTNAME || "https://localhost";
const port = import.meta.env.VITE_GRPC_PORT || "7153";

// Transport using grpc-web (http/1.1 compatible)
const transport = new GrpcWebFetchTransport({
  baseUrl: `${hostname}:${port}`,
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
