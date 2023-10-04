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
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))
    site_id = db.Column(db.Integer, db.ForeignKey('sites.id'))

    department = db.relationship('Department', back_populates='employees')
    forms = db.relationship('Form', backref='employee')

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
            'type':self.type,
            'department_id':self.department_id,
            'site_id':self.site_id,
        }
    
    @validates('type')
    def validates_type(self, key, type):
        employee_types = ['employee', 'manager', 'admin']
        if type not in employee_types:
            raise ValueError('Employee type must be either employee, manager, or admin')
        return type

class Form(db.Model):

    __tablename__ = 'forms'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    employee_id = db.Column(db.Integer(), db.ForeignKey('employees.id'), nullable=False)
    department_id = db.Column(db.Integer(), db.ForeignKey('departments.id'), nullable=False)
    site_id = db.Column(db.Integer(), db.ForeignKey('sites.id'), nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

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
            'site_id':self.site_id,
            # 'review_status':self.review_status,
        }

    # def to_dict_full(self):
    #     return {}

class Department(db.Model):

    __tablename__='departments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    employees = db.relationship('Employee', back_populates='department')
    forms = db.relationship('Form', backref='department')

    def __repr__(self):
        return f'< {self.name} >'
        
class Site(db.Model):

    __tablename__='sites'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    forms  = db.relationship('Form', backref='site')
    