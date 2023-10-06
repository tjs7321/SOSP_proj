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

    # department = db.relationship('Department', back_populates='employees')
    forms = db.relationship('Form', backref='employee')
    department_forms = association_proxy('department_forms','form')
    site_forms = association_proxy('site_forms', 'form')

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

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    department_forms = db.relationship('DepartmentForm', backref='form', cascade='all, delete-orphan')
    site_forms = db.relationship('SiteForm', backref='form', cascade='all, delete-orphan')

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

    # employees = db.relationship('Employee', back_populates='department')
    # forms = db.relationship('Forms', back_populates='department')

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

    @validates('admin_id')
    def validate_admin(self,key,admin_id):
        if Employee.find_by_id(admin_id):
            return admin_id
        else:
            raise ValueError("Not a valid admin")