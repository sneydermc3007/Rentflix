from flask import Flask, jsonify
from flask import Flask, request
from flask import Flask, jsonify, request

from conexion_BD import *

app = Flask(__name__)

@app.route('/databases')
def get_databases():
    
    cursos.execute("SELECT name, database_id, create_date FROM sys.databases;")
    rows = cursos.fetchall()
    return jsonify(rows)

@app.route('/datosRegistro', methods=['POST'])
def guardar_datos():
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
    
    query = """ INSERT INTO Datos (
                correo,  password, 
                direccion_comments, direccion_number, direccion_street, direccion_type, 
                fullname, genero, num_celular, num_fijo, date
                ) 
            VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s )
            """
    parametros = (correo, password, direccion_comments, direccion_number, direccion_street, direccion_type,fullname, genero, num_celular, num_fijo, date)
    
    try: 
        cursos.execute(query, parametros)
        conn.commit()
        return jsonify({"message": "Datos guardados exitosamente"})
    except Exception as e:
        return 'Error al guardar los datos: ' + str(e), 500
    finally:
        cursos.close()
        conn.close()


@app.route('/login', methods=['POST'])
def login():
    #Captura desde el front
    correo = request.json['correo']
    contrasena = request.json['contrasena']

    # Obtener el usuario
    cursos= conn.cursor()
    cursos.execute("SELECT idPersona, NombreCompleto, rol FROM Personas WHERE username=? AND password=?", (correo, contrasena))
    user = cursos.fetchone()

    if not user:
        return jsonify({'error': 'Usuario y/o contraseña inválidos'})

    # Devolver la información del usuario como respuesta en formato JSON
    return jsonify({'idPersona': user[0], 'NombreCompleto': user[1], 'rol': user[2]})


if __name__ == '__main__':
    app.run()