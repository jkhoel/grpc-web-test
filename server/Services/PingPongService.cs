using Grpc.Core;
using Proto.Services;

namespace Server.Services;

public class PingPongService : Proto.Services.PingPongService.PingPongServiceBase
{
    public override Task<ServerTimeResponse> GetServerTime(ClientTimeRequest request, ServerCallContext context)
    {
        Console.WriteLine($"Received client time: {request.ClientEpochTime}");
        var response = new ServerTimeResponse
        {
            ServerEpochTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds()
        };
        Console.WriteLine($"Sending server time: {response.ServerEpochTime}");
        return Task.FromResult(response);
    }

    public override async Task PingStream(PingRequest request, IServerStreamWriter<PingMessage> responseStream, ServerCallContext context)
    {
        var rand = new Random();
        Console.WriteLine($"Client {request.ClientId} connected");
    
        while (!context.CancellationToken.IsCancellationRequested)
        {
            var msg = new PingMessage
            {
                Message = $"Ping to {request.ClientId}",
                Timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
            };
            Console.WriteLine($"Sending: {msg.Message} at {msg.Timestamp}");
            await responseStream.WriteAsync(msg);
            await Task.Delay(rand.Next(500, 2000));
        }
    
        Console.WriteLine($"Client {request.ClientId} disconnected");
    }
    
    public override async Task BidirectionalPingStream(
        IAsyncStreamReader<PingMessage> requestStream,
        IServerStreamWriter<PingMessage> responseStream,
        ServerCallContext context)
    {
        var cancellationToken = context.CancellationToken;
        var rand = new Random();

        // Reading pings from the client
        var readTask = Task.Run(async () =>
        {
            try
            {
                await foreach (var incoming in requestStream.ReadAllAsync(cancellationToken))
                {
                    Console.WriteLine($" >> [{incoming.Timestamp}] Received Message:  {incoming.Message}");
                }
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("❌ Read cancelled.");
            }
        }, cancellationToken);

        // Send pings to the client
        try
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var msg = new PingMessage
                {
                    Message = $"Ping from server!",
                    Timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
                };

                Console.WriteLine($"➡️  Sending: {msg.Message} at {msg.Timestamp}");
                await responseStream.WriteAsync(msg, cancellationToken);
                await Task.Delay(rand.Next(500, 2000), cancellationToken);
            }
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine(" >> Server stream cancelled by client.");
        }

        // Ensure readTask is finished
        await readTask;

        Console.WriteLine(" >> Bidirectional stream closed.");
    }
}
