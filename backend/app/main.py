from flask import Flask
from flask_cors import CORS
from app.routes import auth, user

app = Flask(__name__)
CORS(app)  # Allow all origins for development

app.register_blueprint(auth.bp)
app.register_blueprint(user.bp)

if __name__ == "__main__":
    app.run(debug=True)