from flask import Blueprint, jsonify

bp_clientes = Blueprint('clientes', __name__, url_prefix='/clientes')


@bp_clientes.get("/")
def list_clientes_min():



    return jsonify({
        "data": [],
        "pagination": {"page": 1, "per_page": 10, "total": 0}

    }), 200