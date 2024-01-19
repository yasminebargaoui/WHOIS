FROM maven:3.9.6-eclipse-temurin-17 as build
WORKDIR /WHOIS
COPY . .
RUN mvn clean install

FROM eclipse-temurin:17.0.10-jdk
WORKDIR /WHOIS
COPY --from=build /app/target/demoapp.jar /app/
EXPOSE 8080
CMD npm run start