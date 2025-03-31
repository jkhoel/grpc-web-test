import React, { useEffect } from "react";
import { useGrpcClient } from "@context/GrpcClientContext/useGrpcClient";
import { PingRequest } from "@proto/services/pingpong";

const PingStream: React.FC = () => {
  const client = useGrpcClient();

  useEffect(() => {
    const request: PingRequest = {
      clientId: "react-client-1",
    };

    const stream = client.pingStream(request);

    const removeListener = stream.responses.onMessage((message) => {
      console.log(
        `📡 Ping from server: ${message.message} @ ${message.timestamp}`
      );
    });

    stream.responses.onError((err) => {
      console.error("❌ Stream error:", err);
    });

    stream.responses.onComplete(() => {
      console.log("✅ Stream completed");
    });

    return () => {
      removeListener();
    };
  }, [client]);

  return <div>Listening for pings from server...</div>;
};

export default PingStream;
