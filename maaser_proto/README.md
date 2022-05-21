#Maaser protos
Protobuf definitions for Maaser entities and services

## Dependencies
* [protobuf](https://github.com/protocolbuffers/protobuf)

### Install protobuf
```bash
cd /tmp/ && \
wget https://github.com/protocolbuffers/protobuf/releases/download/v3.11.4/protoc-3.11.4-linux-x86_64.zip && \
unzip protoc-3.11.4-linux-x86_64.zip && \
mv bin/protoc /usr/bin/protoc && \
wget https://repo1.maven.org/maven2/io/grpc/protoc-gen-grpc-java/1.28.1/protoc-gen-grpc-java-1.28.1-linux-x86_64.exe && \
chmod +x protoc-gen-grpc-java-1.28.1-linux-x86_64.exe && \
mv protoc-gen-grpc-java-1.28.1-linux-x86_64.exe /usr/bin/
```


## Uses
Generate protos for desired language
```bash
Java
----
protoc --proto_path=./ --java_out=build/ *.proto

Javacript: https://developers.google.com/protocol-buffers/docs/reference/javascript-generated
-----
protoc --proto_path=./ --js_out=import_style=commonjs,binary:build/oyster *.proto
```

Generate gRPC services for desired language
```bash
Java
# Get java gRPC codegen plugin from https://github.com/grpc/grpc-java/
export PROTOC_GEN_GRPC_JAVA_PLUGIN=grpc-java/compiler/build/exe/java_plugin/protoc-gen-grpc-java

protoc --plugin=protoc-gen-grpc-java=${PROTOC_GEN_GRPC_JAVA_PLUGIN} --grpc-java_out=build/ --proto_path=./ *_rpc.proto

Python
python -m grpc_tools.protoc -I ./ --python_out=build/ --grpc_python_out=build/ protos/*.proto
```


## References
* https://developers.google.com/protocol-buffers/
