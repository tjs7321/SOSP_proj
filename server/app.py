#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from sqlalchemy import text
from flask_restful import Resource
from datetime import datetime

# Local imports
from config import app, db, api
# Add your model imports
from models import *

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Forms(Resource):
    def get(self):
        if (employee_id := session.get('employee_id')):
            employee = Employee.find_by_id(employee_id)
            response = [form.to_dict() 
                        for form in employee.forms]
            return response, 200
        else:
            return make_response(
                {'message': 'Must be logged in'},
                401
            )
        
    def post(self):
        if (employee_id := session.get('employee_id')):
            data = request.get_json()
            try:
                new_form = Form(
                    body=data['body'],
                    employee_id=data['employee_id'],
                    department_id=data['department_id'],
                )
                db.session.add(new_form)
                db.session.commit()
                
                #add entry to department forms
                new_department_form = DepartmentForm(
                    employee_id=employee_id,
                    form_id=new_form.id
                )
                db.session.add(new_department_form)
                db.session.commit()

                #add entry to site forms
                new_site_form = SiteForm(
                    employee_id=employee_id,
                    form_id=new_form.id
                )
                db.session.add(new_site_form)
                db.session.commit()
                
                return new_form.to_dict(), 201
            except ValueError as e:
                return {'error':str(e)}, 422
        else:
            return make_response(
                {'message': 'Must be logged in'},
                401
            )

class FormByID(Resource):
    def get(self,id):
        if (form:= Form.find_by_id(id)):
            return form.to_dict(), 200
        else:
            return {'error':'Resource not found'}, 404

    def patch(self,id):
        if (form:= Form.find_by_id(id)):
            try:
                data=request.get_json()
                form.title = data['title']
                form.description = data['description']
                
                db.session.add(form)
                db.session.commit()
                return form.to_dict(), 202
            except ValueError as e:
                return {'error':str(e)}, 422
        else:
            return {'error':'Resource not found'}, 404

    def delete(self,id):
        if (form:=Form.find_by_id(id)):
            db.session.delete(form)
            db.session.commit()
            return {}, 204
        else:
            return {'error':'Resource not found'}, 404
        
class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        employee_id = request_json.get('employee')
        password = request_json.get('password')

        employee = Employee.query.filter(Employee.id == employee_id).first()

        if employee:
            if employee.authenticate(password):

                session['employee_id'] = employee.id
                session['employee_type'] = employee.type
                session['employee_department_id'] = employee.department_id
                return employee.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401
    
class Logout(Resource):
    
    def delete(self):
        if session.get('employee_id'):
            session['employee_id'] = None
            return {}, 204
        return {'error': '401 Unauthorized'}, 401
    
class CheckSession(Resource):
    
    def get(self):
        if session.get('employee_id'):
            employee = Employee.query.filter(Employee.id == session['employee_id']).first()
            return employee.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401
    
    
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Forms, '/forms', endpoint='forms')
api.add_resource(FormByID,'/forms/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)