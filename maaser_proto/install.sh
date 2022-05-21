#!/bin/bash

if [ -z "$artifact_version" ]; then
  artifact_version="1.0-SNAPSHOT"
fi
if ! [ -d "build_install" ]; then
  echo "Creating build folder."
  mkdir build_install
  cd build_install
  curl -LJO https://services.gradle.org/distributions/gradle-6.4.1-bin.zip
  unzip gradle-6.4.1-bin.zip
  rm -rf gradle-6.4.1-bin.zip
else
  echo "Using existing build folder."
  cd build_install
fi
printf "apply plugin: 'maven'
        apply plugin: 'java'
        apply plugin: 'maven-publish'
        group 'com.brilltech.maaser.protos'
        version '${artifact_version}'
        sourceCompatibility = 1.8
        targetCompatibility = 1.8
        def protobufVersion = '1.28.1'
        repositories {
            mavenCentral()
            mavenLocal()
        }
        dependencies {
            compile group: 'javax.annotation', name: 'javax.annotation-api', version: '1.3.2'
            compile group: 'io.grpc', name: 'grpc-protobuf', version: protobufVersion
            compile group: 'io.grpc', name: 'grpc-netty-shaded', version: protobufVersion
            compile group: 'io.grpc', name: 'grpc-stub', version: protobufVersion
        }
        publishing {
          repositories {
            maven {
              name = 'GitHubPackages'
              url = 'https://maven.pkg.github.com/getOyster/oyster_protos'
              credentials(PasswordCredentials){
                username = System.getenv('ARTIFACT_USERNAME')
                password = System.getenv('ARTIFACT_TOKEN')
              }
            }
          }
          publications {
             gpr(MavenPublication) {
                 from(components.java)
            }
          }
        }" >build.gradle
printf "rootProject.name = 'proto_java_gen'" >settings.gradle
rm -rf src
mkdir -p src/main/java
cp -r ../com src/main/java
cp -r ../grpc src/main/java
./gradle-6.4.1/bin/gradle install
echo "Build version: $artifact_version"
