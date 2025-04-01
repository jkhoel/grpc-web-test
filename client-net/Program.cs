using System.Net.NetworkInformation;
using Grpc.Core;
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
        using var bidirectionalStream = client.BidirectionalPingStream();

        Console.WriteLine("Starting bidirectional stream. Press Ctrl+C to stop.");

        // // Task to read incoming server messages
        var readTask = Task.Run(async () =>
        {
            await foreach (var response in bidirectionalStream.ResponseStream.ReadAllAsync())
            {
                Console.WriteLine($"⬅️ Server: {response.Message} @ {response.Timestamp}");
            }
        });

        // Task to periodically send messages to server
        var writeTask = Task.Run(async () =>
        {
            var rand = new Random();
            var counter = 0;

            try
            {
                while (true)
                {
                    var message = new PingMessage
                    {
                        Message = $"Client ping #{counter++}",
                        Timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
                    };

                    Console.WriteLine($"➡️ Client: {message.Message} @ {message.Timestamp}");
                    await bidirectionalStream.RequestStream.WriteAsync(message);
                    await Task.Delay(rand.Next(1000, 3000));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Write error: {ex.Message}");
            }
            finally
            {
                await bidirectionalStream.RequestStream.CompleteAsync();
            }
        });

        // Wait for either task to complete (likely on exception or cancellation)
        await Task.WhenAny(readTask, writeTask);
    }
}