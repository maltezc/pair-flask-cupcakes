"""Flask app for Cupcakes"""
from flask import Flask, render_template, redirect, jsonify, request

from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Cupcake
# from forms import

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///adopt"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()


@app.get('/api/cupcakes')
def get_all_cupcakes():
    """Gets all cupcakes"""

    cupcakes = Cupcake.query.all()

    serialized = [cupcake.serialize() for cupcake in cupcakes]

    return jsonify(cupcakes=serialized)

@app.get('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    """Gets data about single cupcake"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()
    return jsonify(cupcake=serialized)

@app.post('/api/cupcakes')
def create_cupcake():
    """Creates a cupcake"""

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image = request.json["image"]

    new_cupcake = Cupcake(
        flavor = flavor,
        size = size,
        rating = rating,
        image = image
    )

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()
    return (jsonify(cupcake=serialized),201)
