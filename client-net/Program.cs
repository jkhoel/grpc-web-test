using System.Net.NetworkInformation;
using Grpc.Net.Client;
using Proto.Services;

namespace client_net;

class Program
{
    static async Task Main(string[] args)
    {
        var clientId = Guid.NewGuid().ToString();
        var channel = GrpcChannel.ForAddress("https://localhost:7153");
        var client = new PingPongService.PingPongServiceClient(channel);

        // Unary RPC
        var timeRequest = new ClientTimeRequest { ClientEpochTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds() };
        var timeReply = await client.GetServerTimeAsync(timeRequest);
        Console.WriteLine($"🕒 Server time: {timeReply.ServerEpochTime}");

        // Bidirectional Streaming
        using var stream = client.PingStream(new PingRequest { ClientId = clientId });

        // Read messages from the server indefinitely
        Console.WriteLine("Receiving server pings. Press Ctrl+C to stop the stream.");
        try
        {
            // This creates an "infinite loop" that processes server messages as they arrive
            while (await stream.ResponseStream.MoveNext(CancellationToken.None))
            {
                var pong = stream.ResponseStream.Current;
                Console.WriteLine($"⬅️ Server: {pong.Message} @ {pong.Timestamp}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Stream error: {ex.Message}");
        }
    }
}