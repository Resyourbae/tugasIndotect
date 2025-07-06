from flask import Blueprint, request, jsonify
from app.database import connect_db
import bcrypt

bp = Blueprint("auth", __name__, url_prefix="/auth")

@bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT password FROM users WHERE username=%s", (username,))
    row = cur.fetchone()
    cur.close()
    conn.close()

    if row and bcrypt.checkpw(password.encode(), row[0].encode()):
        return jsonify({"message": "Login successful"})
    return jsonify({"error": "Invalid credentials"}), 401

@bp.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    nama = data.get("nama")
    if not username or not email or not password or not nama:
        return jsonify({"error": "All fields required"}), 400

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    conn = connect_db()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO users (username, email, password, nama) VALUES (%s, %s, %s, %s)",
            (username, email, hashed, nama)
        )
        conn.commit()
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        cur.close()
        conn.close()
    return jsonify({"message": "Register successful"})