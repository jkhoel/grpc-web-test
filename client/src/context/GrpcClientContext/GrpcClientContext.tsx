import { createContext } from "react";
import { PingPongServiceClient } from "@proto/services/pingpong.client";

export const GrpcClientContext = createContext<PingPongServiceClient | null>(
  null
);
