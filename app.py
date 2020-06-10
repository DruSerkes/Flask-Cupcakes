"""Flask app for Cupcakes"""
from flask import Flask, render_template, request, jsonify
from models import db, connect_db, Cupcake
from helpers import serialize_cupcakes

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "so-so-secret"

connect_db(app)

# TODO 
# http://curric.rithmschool.com/springboard/exercises/flask-cupcakes/


# Lecture Notes
# http://curric.rithmschool.com/springboard/lectures/flask-rest-json-api/



# Part Five: Start on the frontend
# Make this route:


@app.route('/')
def home_page():
    """ display home page """
    return render_template('index.html')

@app.route('/api/cupcakes')
def get_all_cupcakes():
    """ Returns JSON for all cupcakes """
    cupcakes = Cupcake.query.all()
    serialized = [serialize_cupcakes(c) for c in cupcakes]
    return jsonify(cupcakes=serialized)


@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    """ Returns JSON for a cupcake """
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = serialize_cupcakes(cupcake)
    return jsonify(cupcake=serialized)


@app.route('/api/cupcakes', methods=['POST'])
def make_cupcake():
    """ 
        Create a cupcake 
        Returns JSON for created cupcake
    """
    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    image = request.json.get('image')
    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating)
    if image:
        new_cupcake.image = image

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = serialize_cupcakes(new_cupcake)
    return (jsonify(cupcake=serialized), 201)


@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    """ 
        Update a cupcake 
        Returns JSON for updated cupcake 
    """
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.size = request.json.get('size', cupcake.size) 
    cupcake.rating = request.json.get('rating', cupcake.rating)
    cupcake.image = request.json.get('image', cupcake.image)
    db.session.commit()
    
    serialized = serialize_cupcakes(cupcake)
    return jsonify(cupcake=serialized)


@app.route('/api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id):
    """ Deletes a cupcake """
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message=f"Cupcake Deleted; id:{cupcake_id}")



