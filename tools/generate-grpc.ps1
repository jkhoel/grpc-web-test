$PROTO_DIR = "../contracts"
$CLIENT_OUT = "../client/src/grpc"
$SKIP_CLEAN = $false

$PROTO_DIR_FULL = Resolve-Path $PROTO_DIR | Select-Object -ExpandProperty Path
$CLIENT_OUT_FULL = Resolve-Path $CLIENT_OUT -ErrorAction SilentlyContinue

foreach ($arg in $args) {
    if ($arg -eq "--no-clean") {
        $SKIP_CLEAN = $true
    }
}

if (-not $SKIP_CLEAN) {
    Write-Host "🧹 Cleaning $CLIENT_OUT"
    if ($CLIENT_OUT_FULL -ne $null) {
        Remove-Item "$CLIENT_OUT/*" -Recurse -Force
    }
}

New-Item -ItemType Directory -Path $CLIENT_OUT -Force | Out-Null

$protoFiles = Get-ChildItem -Path $PROTO_DIR -Recurse -Filter *.proto | ForEach-Object {
    $relativePath = $_.FullName.Substring($PROTO_DIR_FULL.Length + 1) -replace '\\', '/'
    $relativePath
}

# Build the argument array
$arguments = @()
$arguments += "-I$PROTO_DIR"
$arguments += $protoFiles
$arguments += "--js_out=import_style=es6:$CLIENT_OUT"
$arguments += "--grpc-web_out=import_style=typescript,mode=grpcwebtext:$CLIENT_OUT"

# Run protoc with clean argument array
Write-Host "🔧 Running protoc..."
& protoc @arguments

Write-Host ""
Write-Host "✅ gRPC-Web client code generation complete."