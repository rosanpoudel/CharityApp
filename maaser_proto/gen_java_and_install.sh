#!/usr/bin/env bash
# Author: Ashok Kumar Pant

PROTO_REPO=maaser_protos
GEN_REPO=maaser_java_gen
PROTO_EXE=/home/treeleaf/Code/maaser/protoc-gen-grpc-java-1.30.2-linux-x86_64.exe
echo "Proto repo: "${PROTO_REPO}
echo "Gen repo: "${GEN_REPO}
echo "Generating proto..."
#cd ${PROTO_REPO} || exit
mkdir -p build
rm -rf ./build/*
protoc --proto_path=./ --java_out=build/ *.proto

echo "Generating gRPCs..."
protoc --plugin=protoc-gen-grpc-java=${PROTO_EXE} --grpc-java_out=build/ --proto_path=./ *.proto
cd ..

echo "Installing..."
cp -r ${PROTO_REPO}/build/* ${GEN_REPO}/src/main/java/

cd ${GEN_REPO} || exit
./gradlew clean build install
cd ..
