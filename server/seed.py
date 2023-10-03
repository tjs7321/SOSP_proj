#!/usr/bin/env python3

from random import randint, choice as rc
from datetime import datetime, timedelta
from faker import Faker
from sqlalchemy import text

from app import app
from models import db, PrepSession, User, PrepSessionUser

fake = Faker()

with app.app_context():

    print("Deleting all records...")
    PrepSession.query.delete()
    User.query.delete()
    PrepSessionUser.query.delete()

    fake = Faker()

    print("Creating users...")

    # make sure users have unique usernames
    users = []
    usernames = []

    user1= User(username='johncarges',email='johncarges@gmail.com')
    user1.password_hash = 'asdfg'

    user2 = User(username='Teddy Smith', email='tjs7321@gmail.com')
    user2.password_hash = '1234'


    db.session.add(user1)
    db.session.add(user2)
    users = [user1, user2]
    for i in range(30):
        
        username = fake.name()
        while username in usernames or len(username)<8 or len(username)>20:
            username = fake.name()
        usernames.append(username)

        email = f'{username.split(" ")[0].lower()}' \
            + username.split(" ")[1][0].lower() \
            + str(randint(1,100)) \
            + '@gmail.com'

        user = User(
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