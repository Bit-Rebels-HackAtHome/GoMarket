import os

from flask import Flask, jsonify, make_response, abort
from flask_pymongo import PyMongo
from flask_restful import Resource, Api, reqparse
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/gomarket"
api = Api(app)
auth = HTTPBasicAuth()

mongo = PyMongo(app)


@auth.error_handler
def non_autorizzato():
    return make_response(jsonify({'messaggio': 'Accesso non autorizzato'}), 403)


class Root(Resource):
    def get(self):
        return {'content': 'nothing'}


class CreaUtente(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("email", type=str, required=True)
        self.reqparse.add_argument('password', type=str, required=True)
        self.reqparse.add_argument('lat_residenza', type=float)
        self.reqparse.add_argument('long_residenza', type=float)
        super(CreaUtente, self).__init__()

    def post(self):
        args = self.reqparse.parse_args()
        args["password"] = generate_password_hash(args["password"])

        # controlla se questo utente esiste già

        res = mongo.db.utenti.find_one({"email": args["email"]})
        if res is not None:
            return {'message': "Utente già esistente"}, 409

        mongo.db.utenti.insert(args)

        return 200


class LoginUtente(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument("email", type=str, required=True)
        self.reqparse.add_argument('password', type=str, required=True)
        super(LoginUtente, self).__init__()

    def post(self):
        args = self.reqparse.parse_args()
        print(args)
        # controlla se questo utente esiste già

        res = mongo.db.utenti.find_one({"email": args["email"]})
        if res is None:
            return {'message': "Credenziali errate"}, 404

        mongo.db.utenti.insert(args)

        return 200




class Supermercato(Resource):
    decorators = [auth.login_required]
    pass



api.add_resource(Root, '/')
api.add_resource(CreaUtente, '/utenti')



if __name__ == '__main__':
    app.run(debug=True)
