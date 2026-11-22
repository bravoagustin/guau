# --- build ---
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -B dependency:go-offline
COPY src ./src
RUN mvn -q -B -DskipTests package

# --- runtime ---
FROM eclipse-temurin:21-jre
RUN useradd --system --create-home guau
WORKDIR /app
COPY --from=build /app/target/guau-backend-0.0.1.jar app.jar
USER guau
EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-jar", "app.jar"]
