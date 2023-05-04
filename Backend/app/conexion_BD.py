# libreria de conexion a base de datos SQL Server
import pymssql

# Importar el archivo de configuracion
import config


# Datos de conexion
server = config.DB_SERVER
database = config.DB_DATABASE
usuario = config.DB_USER
password = config.DB_PASSWORD

# print("Drivers:", pyodbc.drivers())

try:
    # Conexion a la base de datos 
    conn = pymssql.connect(server, usuario, password, database)
    cursos = conn.cursor(as_dict=True)
    print("Conexion exitosa a la base de datos: ", conn)
    
    #================= Prueba de la ejecucion de un Query ====================
    # Metodo para devolver un array de objetos el resultado --> fetchall()
    # query = "SELECT name, database_id, create_date FROM sys.databases;"
    # cursos.execute(query)
    # result = cursos.fetchall()
    # print("Resultado de la consulta: \n", result)
    
    # conn.close()

                    
except Exception as e:
    print("Error al conectar con la base de datos SQL Server: ", e)
