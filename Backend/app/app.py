from flask import Flask, jsonify

from conexion_BD import *

app = Flask(__name__)

@app.route('/databases')
def get_databases():
    
    cursos.execute("SELECT name, database_id, create_date FROM sys.databases;")
    rows = cursos.fetchall()
    return jsonify(rows)

if __name__ == '__main__':
    app.run()
