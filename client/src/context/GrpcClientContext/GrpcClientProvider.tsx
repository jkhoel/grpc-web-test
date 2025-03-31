import React from "react";
import { PingPongServiceClient } from "../../grpc/services/PingpongServiceClientPb";
import { GrpcClientContext } from "./GrpcClientContext";

const hostname = process.env.VITE_GRPC_HOSTNAME || "https://localhost";
const port = process.env.VITE_GRPC_PORT || "5001";
const grpcUrl = `${hostname}:${port}`;

export const GrpcClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const client = new PingPongServiceClient(grpcUrl); // Update for deployed URL

  return (
    <GrpcClientContext.Provider value={client}>
      {children}
    </GrpcClientContext.Provider>
  );
};
