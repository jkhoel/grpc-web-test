import { useGrpcClient } from "@context/GrpcClientContext/useGrpcClient";
//import { ClientTimeRequest } from "@grpc/services/pingpong_pb.js";
// import * as proto from "@grpc/services/pingpong_pb.js";
import { ClientTimeRequest } from "@proto/services/pingpong";

const TimeSync: React.FC = () => {
  const client = useGrpcClient();

  const handleClick = async () => {
    const request: ClientTimeRequest = {
      clientEpochTime: BigInt(Date.now()),
    };

    try {
      const response = await client.getServerTime(request);
      console.log(`Server Time: ${response.response.serverEpochTime}`);
    } catch (err) {
      console.error("gRPC Error:", err);
    }
  };

  return <button onClick={handleClick}>Send Current Time</button>;
};

export default TimeSync;
