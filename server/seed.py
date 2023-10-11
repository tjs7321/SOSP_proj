#!/usr/bin/env python3

from random import randint, choice as rc
from datetime import datetime, timedelta
from faker import Faker
from sqlalchemy import text, func
import random

from app import app
from models import *

fake = Faker()

with app.app_context():

    print("Deleting all records...")
    Form.query.delete()
    Employee.query.delete()
    Department.query.delete()
    Site.query.delete()
    QuestionList.query.delete()


    fake = Faker()

    print("Creating sites...")

    site1 = Site(name='Brunswick Nuclear Station')

    db.session.add(site1)

    print("Creating departments...")

    department1 = Department(name='maintenance')
    department2 = Department(name='operations')
    department3 = Department(name='chemistry')
    department4 = Department(name='radiation protection')
    department5 = Department(name='supply chain')
    department6 = Department(name='site services')
    department7 = Department(name='engineering')

    db.session.add(department1)
    db.session.add(department2)
    db.session.add(department3)
    db.session.add(department4)
    db.session.add(department5)
    db.session.add(department6)
    db.session.add(department7)

    print("Creating employees...")

    # make sure users have unique usernames
    employees = []
    names = []

    employee_types = ['employee', 'manager', 'admin']

    employee1= Employee(name='John Carges')
    employee1.password_hash = '12345'
    employee1.type = 'manager'
    employee1.department_id = 7
    employee1.site_id = 1

    employee2 = Employee(name='Teddy Smith')
    employee2.password_hash = '12345'
    employee2.type = 'admin'
    employee2.department_id = 1
    employee2.site_id = 1

    employee3 = Employee(name='BreElle Wells')
    employee3.password_hash = '12345'
    employee3.type = 'manager'
    employee3.department_id = 6
    employee3.site_id = 1
    
    employee4 = Employee(name='Curtis Odell')
    employee4.password_hash = '12345'
    employee4.type = 'employee'
    employee4.department_id = 1
    employee4.site_id = 1


    db.session.add(employee1)
    db.session.add(employee2)
    db.session.add(employee3)
    db.session.add(employee4)


    for i in range(30):
        name = fake.name()
        while name in names:
            name = fake.name()
        names.append(name)

        type = 'employee'
        department_id = random.randint(1,7)
        site_id = 1

        employee = Employee(
            name=name,
            type=type,
            department_id=department_id,
            site_id=site_id
        )

        employee.password_hash = employee.name + 'password'

        employees.append(employee)

    db.session.add_all(employees)
    db.session.commit()

    print("Creating questions...")

    question_list1= QuestionList(type='Meetings')
    question_list1.question1 = 'Did the meeting start on time?'
    question_list1.question2 = 'Were there quality visuals?'
    question_list1.question3 = 'Was a take-a-minute conducted?'
    question_list1.question4 = 'Was there active participation?'
    question_list1.question5 = 'Did the meeting end on time?'

    question_list2 = QuestionList(type='Radiation Protection')
    question_list2.question1 = 'Was proper PPE used?'
    question_list2.question2 = 'Was a clean step-off pad maintained?'
    question_list2.question3 = 'Were RP boundaries maintained?'
    question_list2.question4 = 'Was proper dosimetry worn?'
    question_list2.question5 = 'Was proper signage posted?'

    question_list3 = QuestionList(type='Safety')
    question_list3.question1 = 'Was a proper take-a-minute performed?'
    question_list3.question2 = 'Was proper fall protection used?'
    question_list3.question3 = 'Was proper PPE utilized?'
    question_list3.question4 = 'Are fire extinguishers, first aid kits, and other safety equipment readily available and in good condition?'
    question_list3.question5 = 'Are emergency exits and evacuation routes clear and accessible?'
    
    question_list4 = QuestionList(type='Environmental')
    question_list4.question1 = 'Are wildlife exclusion and protection measures in place and operational?'
    question_list4.question2 = 'Are chemical storage containers properly labeled, sealed, and stored securely?'
    question_list4.question3 = 'Are exhaust systems visibly functioning, ensuring that fumes or emissions are appropriately contained?'
    question_list4.question4 = 'Is there any visible evidence of water leakage, spills, or inadequate containment?'
    question_list4.question5 = 'Is there evidence of proper disposal and storage of waste materials to prevent leaks or spills?'


    db.session.add(question_list1)
    db.session.add(question_list2)
    db.session.add(question_list3)
    db.session.add(question_list4)

    print("Creating forms...")
    forms = []
    for i in range(1000):

        #choose an employee to submit a form
        id = random.randint(1,34)
        employee = Employee.query.filter_by(id=id).first()
        types = ['Meetings', 'Radiation Protection', 'Safety', 'Environmental']
        choices = ['Yes', 'No']
        comments = fake.paragraph(nb_sentences=4)
        
        form = Form(
            type=random.choice(types),
            answer1=random.choice(choices),
            answer2=random.choice(choices),
            answer3=random.choice(choices),
            answer4=random.choice(choices),
            answer5=random.choice(choices),
            comments=comments,
            employee_id=employee.id,
            department_id=employee.department_id,
            site_id=employee.site_id
        )

        forms.append(form)

    db.session.add_all(forms)

    db.session.commit()
    
    print("Complete.")