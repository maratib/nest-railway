# Nest.js Starter
## with TypeORM, PG/MySQL, Staging, Logging, CompoDoc, MVC  

## Features 
1.  TypeORM with migrations and seeding
2.  JWT with role based Authentication 
3.  TaskService added
4.  MVC added
5.  Insomnia backup added
6.  Staging configuration added
7.  Logging added
8.  CompoDoc added
7.  Swagger added
8.  Pagination added

## Swagger API
http://localhost:3000/swagger
```javascript
//Swagger doc url
http://localhost:3000/swagger-json
```
## Migration commands
```bash
# Create a fresh db based on entities
yarn new-db

# To generate migrations - only create migration file
# yarn migration:generate <name>
yarn migration:generate 

# To create migrations - will make db changes
yarn migration:run
```

## CompoDoc
```bash
#Add compodoc
yarn add -D @compodoc/compodoc
# Or add script in package.json
"docs": "compodoc -p tsconfig.json -s"
```

## Others

https://www.youtube.com/watch?v=1-MRmLsUrAo

