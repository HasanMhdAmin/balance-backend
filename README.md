# Balance-backend
Spring boot project with MySQL database.

## Preparation
- Create new MySQL database.
- Change DB connection string in `src/main/resources/application.properties`
- No need to create tables, the tables will be created automatically after running the application.

## Run
- Make sure you have Java JDK installed and pointed in Environment variables:

`JAVA_HOME      C:\path\to\jdk`
  
- In the root of the project, Run:
  
`./mvnw spring-boot:run`

**OR** run directly from IntelliJ IDEA.


You can access the API from:
- _GET_ `http://localhost:7777/api/budget`
- _POST_ `http://localhost:7777/api/budget`
- _DELETE_ `http://localhost:7777/api/budget`

