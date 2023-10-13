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

    department1 = Department(name='Maintenance')
    department2 = Department(name='Operations')
    department3 = Department(name='Chemistry')
    department4 = Department(name='Radiation Protection')
    department5 = Department(name='Supply Chain')
    department6 = Department(name='Site Services')
    department7 = Department(name='Engineering')

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

    employee1 = Employee(name='Teddy Smith')
    employee1.password_hash = '12345'
    employee1.type = 'admin'
    employee1.department_id = 1
    employee1.site_id = 1

    employee2 = Employee(name='John Carges')
    employee2.password_hash = '12345'
    employee2.type = 'manager'
    employee2.department_id = 1
    employee2.site_id = 1

    employee3 = Employee(name='BreElle Wells')
    employee3.password_hash = '12345'
    employee3.type = 'manager'
    employee3.department_id = 2
    employee3.site_id = 1
    
    employee4 = Employee(name='Curtis Odell')
    employee4.password_hash = '12345'
    employee4.type = 'manager'
    employee4.department_id = 3
    employee4.site_id = 1

    employee5 = Employee(name='Tess Merrill')
    employee5.password_hash = '12345'
    employee5.type = 'manager'
    employee5.department_id = 4
    employee5.site_id = 1

    employee6 = Employee(name='Hiroki Kato')
    employee6.password_hash = '12345'
    employee6.type = 'manager'
    employee6.department_id = 5
    employee6.site_id = 1

    employee7 = Employee(name='Farhan Hossain')
    employee7.password_hash = '12345'
    employee7.type = 'manager'
    employee7.department_id = 6
    employee7.site_id = 1

    employee8 = Employee(name='Matthew Levin')
    employee8.password_hash = '12345'
    employee8.type = 'manager'
    employee8.department_id = 6
    employee8.site_id = 1

    db.session.add(employee1)
    db.session.add(employee2)
    db.session.add(employee3)
    db.session.add(employee4)
    db.session.add(employee5)
    db.session.add(employee6)
    db.session.add(employee7)
    db.session.add(employee8)


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

        employee.password_hash = '12345'

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
    for i in range(5000):

        #choose an employee to submit a form
        id = random.randint(1,34)
        employee = Employee.query.filter_by(id=id).first()
        types = ['Meetings', 'Radiation Protection', 'Safety', 'Environmental']
        choices = ['Yes', 'No']
        comments = fake.paragraph(nb_sentences=4)
        created_at = fake.date_time_this_year()
        
        form = Form(
            type=random.choice(types),
            answer1=random.choice(choices),
            answer2=random.choice(choices),
            answer3=random.choice(choices),
            answer4=random.choice(choices),
            answer5=random.choice(choices),
            comments=comments,
            created_at=created_at,
            employee_id=employee.id,
            department_id=employee.department_id,
            site_id=employee.site_id
        )

        forms.append(form)

    db.session.add_all(forms)

    db.session.commit()

    print("Creating messages...")

    message1 = SafetyMessage(phrase="Safety is no accident.")
    message2 = SafetyMessage(phrase="Never forget about safety.")
    message3 = SafetyMessage(phrase="Best Be Safe Today.")
    message4 = SafetyMessage(phrase="Stand up for safety.")
    message5 = SafetyMessage(phrase="Our Goal—Zero Harm.")
    message6 = SafetyMessage(phrase="We need you-work safely!")
    message7 = SafetyMessage(phrase="Prevention is better than cure.")
    message8 = SafetyMessage(phrase="Safety Is Free, Use Plenty Of It.")
    message9 = SafetyMessage(phrase="Prepare & prevent instead of repair & repent.")
    message10 = SafetyMessage(phrase="Stop! Think! Then act!")
    message11 = SafetyMessage(phrase="KISS: Keep it Safe and Sound")
    message12 = SafetyMessage(phrase="Zero compromise towards safety.")
    message13 = SafetyMessage(phrase="Leave sooner, drive slower, live longer.")
    message14 = SafetyMessage(phrase="If you don't think it will happen to you, find the person who had it happen to them.")
    message15 = SafetyMessage(phrase="Safety first and last longer.")
    message16 = SafetyMessage(phrase="Watch your step - it could be your last!")
    message17 = SafetyMessage(phrase="Failure to prepare = Preparing to fail")
    message18 = SafetyMessage(phrase="Just because you always did it that way, doesn't make it right.")
    message19 = SafetyMessage(phrase="L is for lifting - Lift with your legs and leave your back out of it.")
    message20 = SafetyMessage(phrase="Dare to be aware.")

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.add(message9)
    db.session.add(message10)
    db.session.add(message11)
    db.session.add(message12)
    db.session.add(message13)
    db.session.add(message14)
    db.session.add(message15)
    db.session.add(message16)
    db.session.add(message17)
    db.session.add(message18)
    db.session.add(message19)
    db.session.add(message20)
    db.session.commit()
    
    print("Complete.")