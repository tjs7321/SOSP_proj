from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class Employee(db.Model):

    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    type = db.Column(db.String)
    department_id = db.Column(db.Integer)

    forms = db.relationship()

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<User {self.username}>'

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()

    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
            'email': self.email
        }

class Form(db.Model):

    __tablename__ = 'forms'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    start = db.Column(db.DateTime, nullable=False)
    end = db.Column(db.DateTime, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    prep_session_users = db.relationship('PrepSessionUser', backref='prep_session', cascade='all, delete-orphan')
    users = association_proxy('prep_session_users', 'user')

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()

    def __repr__(self):
        return f'< Form ID#{self.id} >'

    def to_dict(self):
        return {
            'id':self.id,
            'body':self.body,
            'department_id':self.department_id,
            'review_status':self.review_status,
        }

    # def to_dict_full(self):
    #     return {}

class Department(db.Model):

    __tablename__='departments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f'< {self.name} >'

class DepartmentForm(db.Model):

    __tablename__='department_forms'

    id = db.Column(db.Integer, primary_key=True)
    form_id = db.Column(db.Integer, db.ForeignKey('forms.id'))
    manager_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    @validates('department_id')
    def validate_follower(self,key,department_id):
        if Employee.find_by_id(department_id):
            return department_id
        else:
            raise ValueError("Not a valid department")
        
    @validates('session_id')
    def validate_follower(self,key,form_id):
        if Form.find_by_id(form_id):
            return form_id
        else:
            raise ValueError("Not a valid form")
        
class SiteForm(db.Model):

    __tablename__='site_forms'

    id = db.Column(db.Integer, primary_key=True)
    form_id = db.Column(db.Integer, db.ForeignKey('forms.id'))
    admin_id = db.Column(db.Integer, db.ForeignKey('employees.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())