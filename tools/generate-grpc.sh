#!/bin/bash

PROTO_DIR="../contracts"
CLIENT_OUT="../client/src/proto"
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

echo "🔧 Generating protobuf-ts clients..."

protoc -I="$PROTO_DIR" \
  $(find "$PROTO_DIR" -name "*.proto") \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out="$CLIENT_OUT"

echo ""
echo "✅ protobuf-ts client code generation complete."
