#!/bin/bash

PROTO_DIR="../contracts"
CLIENT_OUT="../client/src/grpc"
SKIP_CLEAN=false

for arg in "$@"; do
  if [[ "$arg" == "--no-clean" ]]; then
    SKIP_CLEAN=true
  fi
done

if [ "$SKIP_CLEAN" = false ]; then
  echo "🧹 Cleaning $CLIENT_OUT"
  rm -rf "$CLIENT_OUT"/*
fi

mkdir -p "$CLIENT_OUT"

find "$PROTO_DIR" -name "*.proto" | while read -r file; do
  echo "🔧 Generating gRPC-Web client for: $file"
  protoc -I=../contracts \
    $(find ../contracts -name "*.proto") \
    --js_out=import_style=es6:"$CLIENT_OUT" \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:"$CLIENT_OUT"
done

echo ""
echo "✅ gRPC-Web client code generation complete."
