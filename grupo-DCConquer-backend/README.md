
# grupo-DCConquer-backend
## Integrantes
* Vicente Aburto
* Agustín Herrera
* Agustín Suazo
# Documentación
## Variables
Las siguientes variables se pueden usar tal cual, o cambiar a gusto. Lo importante es mantener la concordancia durante instalación.
```
project_user = dcconquer_user
project_password = 12345
project_db_name = dcconquer
```
## Pasos de Instalación local
1. Instalar _postgresql_
    ```
    brew install postgresql
    ```
2. Iniciar _postgresql_
    ```
    brew services start postgresql
    ```
3. Crear usuario y revisar que haya sido creado correctamente
    ```
    createuser {project_user} -s
    psql postgres
    \du
    ```
4. Asignar contraseña y salir de terminal _psql_
    ```
    ALTER USER {project_user} WITH PASSWORD '{project_password}';
    \q
    ```
5. Crear 3 _databases_, ver si fueron creadas correctamente y salir de terminal _psql_
    ```
    createdb {project_db_name}_development
    createdb {project_db_name}_test
    createdb {project_db_name}_production
    psql postgres
    \l
    \q
    ```
6. En la terminal posicionarse en la carpeta ```grupo-DCConquer-backend```
7. Instalar las librerías 
    ```
    yarn install
    ```
8. Crear archivo ```.env```en carpeta general (```grupo-DCConquer-backend```) con lo siguiente:
    ```
    DB_USER={project_user}
    DB_NAME={project_db_name}
    DB_PASSWORD={project_password}
    DB_HOST=localhost
    ```

9. Correr migraciones
    ```
    yarn sequelize-cli db:migrate
    ```


# Referencias session y cookies
* https://github.com/machadop1407/Authentication
* https://koajs.com/
* https://www.youtube.com/watch?v=OK9zmaXIISI&t=62s