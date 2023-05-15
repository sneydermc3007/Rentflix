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

#REGISTRO
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

#API LOGIN
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
    
#API AGREGAR PELICULAS
@app.route('/peliculas', methods=['POST'])
def agregar_pelicula():
    id_pelicula = request.json['idPelicula']
    nom_pelicula = request.json['NomPelicula']
    duracion = request.json['Duracion']
    precio = request.json['Precio']
    sinopsis = request.json['Sinopsis']
    cant_disponible = request.json['CantDisponible']
    id_proveedor = request.json['idProveedor']
    id_tipo_pelicula = request.json['idTipoPelicula']
    imagen = request.json['Imagen']


    query_3 = """ INSERT INTO peliculas.Peliculas ( 
        idPelicula, NomPelicula, Duracion, Precio, Sinopsis, CantDisponible, idProveedor, idTipoPelicula,Imagen
        ) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s ) """

    parametros3 =  (id_pelicula, nom_pelicula, duracion, precio, sinopsis, cant_disponible, id_proveedor, id_tipo_pelicula,imagen)
    try:
        cursos.execute(query_3, parametros3 )
        conn.commit()
        return jsonify({'mensaje': 'Película agregada correctamente'})
    except:
        return jsonify({'mensaje': 'Error al agregar la película'})
    

#ACTUALIZAR PELICULAS
@app.route('/peliculasUpd/<int:id_pelicula>', methods=['PUT'])
def actualizar_pelicula(id_pelicula):
    # obtiene los datos enviados en el request
    datos_pelicula = request.json

    # obtiene los datos a actualizar de la película
    nom_pelicula = datos_pelicula.get('NomPelicula')
    duracion = datos_pelicula.get('Duracion')
    precio = datos_pelicula.get('Precio')
    sinopsis = datos_pelicula.get('Sinopsis')
    cant_disponible = datos_pelicula.get('CantDisponible')
    id_proveedor = datos_pelicula.get('idProveedor')
    id_tipo_pelicula = datos_pelicula.get('idTipoPelicula')
    imagen = datos_pelicula.get('Imagen')

    # construye la consulta para actualizar la película con el id especificado
    consulta = """
        UPDATE peliculas.Peliculas 
        SET NomPelicula=%s, Duracion=%s, Precio=%s, Sinopsis=%s, CantDisponible=%s, idProveedor=%s, idTipoPelicula=%s, Imagen=%s
        WHERE idPelicula=%s
    """
    # ejecuta la consulta con los parámetros correspondientes
    parametros = (nom_pelicula, duracion, precio, sinopsis, cant_disponible, id_proveedor, id_tipo_pelicula, imagen, id_pelicula)
    cursos.execute(consulta, parametros)
    conn.commit()

    # retorna la película actualizada
    return jsonify({'mensaje': 'Película actualizada correctamente'})


#API ELIMINAR PELICULA
@app.route('/peliculasDel/<int:id_pelicula>', methods=['DELETE'])
def eliminar_pelicula(id_pelicula):
    consulta = "DELETE FROM peliculas.Peliculas WHERE idPelicula = %s"
    parametros = (id_pelicula)

    cursos.execute(consulta, parametros)
    conn.commit() 

    if cursos.rowcount > 0:
        return jsonify({'mensaje': f'Película con id {id_pelicula} eliminada correctamente'})
    else:
        return jsonify({'mensaje': f'No se encontró ninguna película con id {id_pelicula}'}), 404


#API OBTENER PELICULAS
@app.route('/peliculasObt')
def get_movie():
    
    cursos.execute(""" SELECT NomPelicula, Duracion, Precio, Sinopsis, CantDisponible, Peliculas.Imagen, NomProveedor, SitioWeb
                        FROM peliculas.Peliculas, peliculas.DatosProveedor
                        WHERE peliculas.Peliculas.idProveedor = peliculas.DatosProveedor.idProveedor; """)
    rows = cursos.fetchall()
    return jsonify(rows)

#API AGREGAR CITAS
@app.route('/citas', methods=['POST'])
def agregar_cita():
    datos_cita = request.json
    
    id_cita = datos_cita['idCita']
    nom_persona = datos_cita['NomPersona']
    fecha_cita = datos_cita['FechaCita']
    id_local = datos_cita['idLocal']
    pelicula_dispo = datos_cita['PeliculaDispo']

    consulta = """
            INSERT INTO ventas.Citas (idCita, NomPersona, FechaCita, idLocal, PeliculaDispo)
            VALUES (%s,%s,%s,%s,%s)
        """
    parametros= (id_cita, nom_persona,fecha_cita,id_local,pelicula_dispo)
    cursos.execute(consulta, parametros)
    conn.commit()
    
    return 'Cita agregada exitosamente', 201 


#API AGREGAR DATOS A PROVEEDOR
@app.route('/proveedores', methods=['POST'])
def agregar_prov():
    datos_prov = request.json
    
    id_proveedor = datos_prov['idProveedor']
    nom_proveedor = datos_prov['NomProveedor']
    sitioWeb = datos_prov['SitioWeb']
    Imagen = datos_prov['Imagen']

    consulta = """
            INSERT INTO peliculas.DatosProveedor (idProveedor, NomProveedor, SitioWeb, Imagen)
            VALUES (%s,%s,%s,%s)
        """
    parametros= (id_proveedor, nom_proveedor,sitioWeb, Imagen)
    cursos.execute(consulta, parametros)
    conn.commit()
    
    return jsonify({'mensaje': 'Proveedor agregado correctamente'})

#API PARA ACTUALIZAR PROVEEDOR
@app.route('/proveedoresUpd/<int:id>', methods=['PUT'])
def actualizar_prov(id):
    datos_prov = request.json
    
    nom_proveedor = datos_prov.get('NomProveedor')
    sitioWeb = datos_prov.get('SitioWeb')
    imagen = datos_prov.get('Imagen')

    consulta = """
            UPDATE peliculas.DatosProveedor 
            SET NomProveedor = %s, SitioWeb = %s, Imagen = %s
            WHERE idProveedor = %s
        """
    parametros= (nom_proveedor, sitioWeb, imagen, id)
    cursos.execute(consulta, parametros)
    conn.commit()
    
    if cursos.rowcount == 0:
        return 'Proveedor no encontrado', 404
    else:
        return 'Proveedor actualizado exitosamente', 200 



if __name__ == '__main__':
    # app.run()
    app.run(debug=True)
    