from flask import Flask, jsonify, request
from flask_cors import CORS
from conexion_BD import *
import hashlib,os

app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/databases')
def get_databases():
    
    cursos.execute("SELECT name, database_id, create_date FROM sys.databases;")
    rows = cursos.fetchall()
    return jsonify(rows)



@app.route('/datosRegistro', methods=['POST'])
def guardar_datos():
    # Recoleccion de datos desde el front
    correo = request.json['correo']
    date = request.json['date']
    direccion_comments = request.json['direccion_comments']
    direccion_number = request.json['direccion_number']
    direccion_street = request.json['direccion_street']
    direccion_type = request.json['direccion_type']
    fullname = request.json['fullname']
    genero = request.json['genero']
    num_celular = request.json['num_celular']
    num_fijo = request.json['num_fijo']
    password = request.json['password']

    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    hashed_correo = hashlib.sha256(correo.encode()).hexdigest()

    # Validacion de la cantidad de registros
    cursos.execute(""" SELECT COUNT(*) AS CANTIDADREGISTROS FROM Peliculas.Personas """)
    cantidad_registros = cursos.fetchone()
    print("Cantidad de registros: ", cantidad_registros['CANTIDADREGISTROS'])
    
    if(cantidad_registros['CANTIDADREGISTROS'] > 0 ):
        
        # Obtener el numero de registros actuales de Personas
        cursos.execute(""" SELECT TOP 1 idPersona AS ULTIMOREGISTRO
                        FROM Peliculas.Personas
                        ORDER BY idPersona DESC """
        )
        num_registros = cursos.fetchone()
        
        num_registros['ULTIMOREGISTRO'] = num_registros['ULTIMOREGISTRO'] + 1
        print("iD nuevo registro: ", num_registros['ULTIMOREGISTRO'])
    else:
        print("No hay registros anteriores")
        num_registros = {'ULTIMOREGISTRO': 1}
        print("iD nuevo registro: ", num_registros['ULTIMOREGISTRO'])
    
    # Primer Query
    query_1 = """ INSERT INTO Peliculas.Personas (
        idPersona, NombreCompleto, Genero, FechaNacimiento, Rol, idDireccion, idCredencial
    ) VALUES ( %s, %s, %s, %s, %s, %s, %s ) """   

    parametros_1 = (num_registros['ULTIMOREGISTRO'], fullname, genero, date, 'Usuario', num_registros['ULTIMOREGISTRO'], num_registros['ULTIMOREGISTRO'])
        
    # Segundo Query
    query_2 = """ INSERT INTO Peliculas.Credenciales (
        idCredenciales, Correo, Contrasena
        ) VALUES ( %s, %s, %s ) """
        
    parametros_2 = (num_registros['ULTIMOREGISTRO'], hashed_correo, hashed_password)

    # Tercer Query
    query_3 = """ INSERT INTO Peliculas.Direcciones ( 
        idDirecciones, DireccionCalleCarrera, DireccionNumero, TipoVivienda, Comentario, NumCelular, NumFijo
        ) VALUES ( %s, %s, %s, %s, %s, %s, %s ) """
        
    parametros_3 = (num_registros['ULTIMOREGISTRO'], direccion_street, direccion_number, direccion_type, direccion_comments, num_celular, num_fijo)
    
    try:
        cursos.execute(query_3, parametros_3)
        cursos.execute(query_2, parametros_2)
        cursos.execute(query_1, parametros_1)
        conn.commit()
        return jsonify({"message": "Datos guardados exitosamente", "num_registros": num_registros['ULTIMOREGISTRO']}), 200
    except Exception as e:
        return jsonify({"message": "Error al guardar los datos: " + str(e)}), 500




@app.route('/login', methods=['POST'])
def login():
    # Captura desde el front
    correo = request.json.get('correo')
    contrasena = request.json.get('contrasena')

    hashed_contrasena = hashlib.sha256(contrasena.encode()).hexdigest()
    hashed_correo = hashlib.sha256(correo.encode()).hexdigest()

    if not correo or not contrasena:
        return jsonify({'error': 'Por favor ingrese todos los datos'}), 400

    try:
        # Obtener el usuario
        cursos.execute(""" SELECT idPersona, NombreCompleto, Rol FROM peliculas.Credenciales
                          JOIN peliculas.Personas ON peliculas.Personas.idPersona = peliculas.Credenciales.idCredenciales
                          WHERE peliculas.Credenciales.Correo=%s 
                          AND peliculas.Credenciales.Contrasena=%s """,
                       (hashed_correo, hashed_contrasena))
        user = cursos.fetchone()
        print("Usuario obtenido: ", user)

        if user is None:
            return jsonify({'error': 'Usuario y/o contraseña inválidos'}), 401

        user = list(user.values())

        return jsonify({'idPersona': user[0], 'NombreCompleto': user[1], 'Rol': user[2]}), 200

    except Exception as e:
        return jsonify({"message": "Error al obtener los datos en la BD: " + str(e)}), 500
    

@app.route('/peliculasObt')
def get_movie():
   
    consulta = """
            SELECT *
            FROM peliculas.Peliculas
        """
    cursos.execute(consulta)
    pelicula = cursos.fetchone()

    return pelicula



if __name__ == '__main__':
    # app.run()
    app.run(debug=True)
    