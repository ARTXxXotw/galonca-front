protoc --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:. src/protos/auth.proto src/protos/user.proto src/protos/geo_service.proto src/protos/cargo.proto
