#!/usr/bin/env python3

from random import randint, choice as rc
from datetime import datetime, timedelta
from faker import Faker
from sqlalchemy import text
import random

from app import app
from models import *

fake = Faker()

with app.app_context():

    print("Deleting all records...")
    Form.query.delete()
    Employee.query.delete()
    Department.query.delete()

    fake = Faker()

    print("Creating departments...")

    department1 = Department(name='maintenance')
    department2 = Department(name='operations')
    department3 = Department(name='chemistry')
    department4 = Department(name='radiation protection')
    department5 = Department(name='supply chain')
    department6 = Department(name='site services')
    department7 = Department(name='engineering')

    print("Creating employees...")

    # make sure users have unique usernames
    users = []
    usernames = []

    employee_types = ['employee', 'manager', 'admin']

    employee1= Employee(name='John Carges')
    employee1.password_hash = '12345'
    employee1.type = 'manager'

    employee2 = Employee(name='Teddy Smith')
    employee2.password_hash = '12345'
    employee2.type = 'admin'

    employee3 = Employee(name='BreElle Wells')
    employee3.password_hash = '12345'
    employee3.type = 'manager'
    
    employee4 = Employee(name='Curtis Odell')
    employee4.password_hash = '12345'
    employee4.type = 'employee'


    db.session.add(employee1)
    db.session.add(employee2)
    db.session.add(employee3)
    db.session.add(employee4)
    employees = [employee1, employee2, employee3, employee4]
    for i in range(30):
        name = fake.name()
        type = 'employee'
        department_id = random.randint(1,7)

        user = Employee(
            username=username,
            email=email #fake.email()
        )

        user.password_hash = user.username + 'password'

        users.append(user)
    
    query = text('DELETE FROM follow')
    db.session.execute(query)               ## Deletes all follows

    for user in users:
        for i in range(30):
            if user != users[i]:
                user.followers.append(users[i])

    db.session.add_all(users)

    print("Creating PrepSessions...")
    prep_sessions = []
    start_day = datetime.now() - timedelta(days=30)
    end_day = start_day +timedelta(days=60)
    for i in range(1000):
        description = fake.paragraph(nb_sentences=8)
        start = fake.date_time_between_dates(datetime_start=start_day, datetime_end=end_day)
        end = start + timedelta(hours=1)
        
        prep_session = PrepSession(
            title=fake.sentence(),
            description=description,
            start=start,
            end=end,
        )

        prep_sessions.append(prep_session)

    db.session.add_all(prep_sessions)
    
    print("Adding users to sessions...")
    prep_session_users = [PrepSessionUser(
        user=rc(users),
        prep_session=rc(prep_sessions)
        ) for _ in range(600)]
    for session in prep_sessions:
        user = rc(users)
        prep_session_users.append(
            PrepSessionUser(
                user=user,
                prep_session=session
            )
        )
    
    db.session.add_all(prep_session_users)

    db.session.commit()
    
    print("Complete.")