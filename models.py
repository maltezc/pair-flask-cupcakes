"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()




def connect_db(app):
    """connect this database to the provided flask app"""
    app.app_context().push()
    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    """Table for cupcakes"""
    __tablename__ = "cupcakes"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    flavor = db.Column(
        db.Text,
        nullable=False
    )

    size = db.Column(
        db.Text,
        nullable=False
    )

    rating = db.Column(
        db.Integer,
        nullable=False
    )

    image = db.Column(
        db.Text,
        default='https://tinyurl.com/demo-cupcake',
        nullable = False
    )

    def serialize(self):
        """ returns self """
        return {
            "id" : self.id,
            "flavor" : self.flavor,
            "size" : self.size,
            "rating" : self.rating,
            "image" : self.image
        }
