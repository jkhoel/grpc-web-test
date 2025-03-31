import { useContext } from "react";
import { GrpcClientContext } from "./GrpcClientContext";

export const useGrpcClient = () => {
  const context = useContext(GrpcClientContext);
  if (!context)
    throw new Error("useGrpcClient must be used inside GrpcClientProvider");
  return context;
};
