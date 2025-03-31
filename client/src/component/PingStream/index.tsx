import { useEffect } from "react";
import { useGrpcClient } from "@context/GrpcClientContext/useGrpcClient";
import * as PingPongProto from "@grpc/services/pingpong_pb";

const PingStream = () => {
  const client = useGrpcClient();

  useEffect(() => {
    const req = new PingPongProto.PingRequest();
    req.setClientId("react-client-1");

    const stream = client.pingStream(req, {});
    stream.on("data", (msg) => {
      console.log(`Received: ${msg.getMessage()} @ ${msg.getTimestamp()}`);
    });
    stream.on("error", (err) => console.error("Stream error:", err));
    stream.on("end", () => console.log("Stream ended."));

    return () => stream.cancel();
  }, [client]);

  return <div>Listening for server pings...</div>;
};

export default PingStream;
