from flask import Blueprint, jsonify, request
from app.database import connect_db

bp = Blueprint("user", __name__, url_prefix="/user")

#Tes Data
# filepath: d:\tugasIndotect\backend\app\routes\user.py
@bp.route("/all", methods=["GET"])
def get_all_users():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT username, email, nama, bio FROM users")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify([
        {"username": r[0], "email": r[1], "nama": r[2] or "", "bio": r[3] or ""} for r in rows
    ])

#Ambil Data dari Database
@bp.route("/profile", methods=["GET"])
def get_profile():
    username = request.args.get("username")
    if not username:
        return jsonify({"error": "Username required"}), 400

    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT username, email, nama, bio FROM users WHERE username=%s", (username,))
    row = cur.fetchone()
    cur.close()
    conn.close()

    if row:
        return jsonify({
            "username": row[0],
            "email": row[1],
            "nama": row[2] or "",
            "bio": row[3] or ""
        })
    return jsonify({"error": "User not found"}), 404

#Hapus
@bp.route("/delete", methods=["DELETE"])
def delete_user():
    username = request.args.get("username")
    if not username:
        return jsonify({"error": "Username required"}), 400

    conn = connect_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM users WHERE username=%s", (username,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "User deleted"})

#Update
@bp.route("/profile", methods=["POST"])
def update_profile():
    data = request.json
    username = data.get("username")
    nama = data.get("nama")
    bio = data.get("bio")
    if not username:
        return jsonify({"error": "Username required"}), 400

    conn = connect_db()
    cur = conn.cursor()
    cur.execute(
        "UPDATE users SET nama=%s, bio=%s WHERE username=%s",
        (nama, bio, username)
    )
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Profile updated"})