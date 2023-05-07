from flask import Flask, jsonify
from flask import Flask, request

from conexion_BD import *

app = Flask(__name__)

@app.route('/databases')
def get_databases():
    
    cursos.execute("SELECT name, database_id, create_date FROM sys.databases;")
    rows = cursos.fetchall()
    return jsonify(rows)



app = Flask(__name__)

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
    
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Datos (correo, date, direccion_comments, direccion_number, direccion_street, direccion_type, fullname, genero, num_celular, num_fijo, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                   correo, date, direccion_comments, direccion_number, direccion_street, direccion_type, fullname, genero, num_celular, num_fijo, password)
    conn.commit()
    return 'Datos guardados exitosamente'

if __name__ == '__main__':
    app.run()


if __name__ == '__main__':
    app.run()
