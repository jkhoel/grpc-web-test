#!/bin/bash

# Get script's actual location regardless of where it's run from
PROTO_DIR="../contracts"
CLIENT_OUT="../client/src/proto"
SKIP_CLEAN=false

# Parse arguments
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

# Resolve plugin path from repo root (works from tools/)
PLUGIN_PATH="../client/node_modules/.bin/protoc-gen-ts"

# Collect all .proto files (quoted for safety)
PROTO_FILES=$(find "$PROTO_DIR" -name "*.proto")

# Run protoc
protoc -I="$PROTO_DIR" \
  $PROTO_FILES \
  --plugin=protoc-gen-ts="$PLUGIN_PATH" \
  --ts_out="$CLIENT_OUT"

echo ""
echo "✅ protobuf-ts client code generation complete."
