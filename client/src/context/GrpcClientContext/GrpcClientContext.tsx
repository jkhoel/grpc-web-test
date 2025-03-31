import { createContext } from "react";
import { PingPongServiceClient } from "../../grpc/services/PingpongServiceClientPb";
import {} from "react";

export const GrpcClientContext = createContext<PingPongServiceClient | null>(
  null
);
