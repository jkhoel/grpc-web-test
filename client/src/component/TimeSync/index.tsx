import { useGrpcClient } from "@context/GrpcClientContext/useGrpcClient";
import * as PingPongProto from "@grpc/services/pingpong_pb";

const TimeSync = () => {
  const client = useGrpcClient();

  const handleClick = () => {
    // const request = new ClientTimeRequest();
    const request = new PingPongProto.ClientTimeRequest();
    request.setClientEpochTime(Date.now());

    client.getServerTime(request, {}, (err, res) => {
      if (err) {
        console.error("Error:", err);
      } else {
        console.log(`Server Time: ${res?.getServerEpochTime()}`);
      }
    });
  };

  return <button onClick={handleClick}>Send Time</button>;
};

export default TimeSync;
