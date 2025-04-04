﻿$PROTO_DIR = "../contracts"
$CLIENT_OUT = "../client/src/proto"
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

# Get relative .proto file paths for protoc
$protoFiles = Get-ChildItem -Path $PROTO_DIR -Recurse -Filter *.proto | ForEach-Object {
    $relativePath = $_.FullName.Substring($PROTO_DIR_FULL.Length + 1) -replace '\\', '/'
    $relativePath
}

# Resolve plugin path on Windows
$pluginPath = Resolve-Path "../client/node_modules/.bin/protoc-gen-ts.cmd" | Select-Object -ExpandProperty Path

# Build argument array
$arguments = @()
$arguments += "-I$PROTO_DIR"
$arguments += $protoFiles
$arguments += "--plugin=protoc-gen-ts=$pluginPath"
$arguments += "--ts_out=$CLIENT_OUT"

Write-Host "🔧 Running protoc with protobuf-ts plugin..."
& protoc @arguments

Write-Host ""
Write-Host " >> protobuf-ts client code generation complete."
