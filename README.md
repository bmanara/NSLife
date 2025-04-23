# NSLife
Check out the live demo of the website [here](https://www.youtube.com/watch?v=NGfERTh1FGg)!
---

## Background
---

This app is mainly built for NSMen in Singapore. Who are these NSMen? In Singapore, all Singaporean Males are required to serve National Service (NS) in the military for 2 years. Males who are currently still serving their 2 years in the military are known as National Service Full-Time (NSF), while those who are done with the 2 years and are put into the "Reserve Force", are known as (NSMen). So, this app is for those who have completed the 2 years and are part of the "Reserve Force" of Singapore. 

NSMen usually go back for training every year, varying in intensity, either a high key training or a low key training. NSMen are also required to book and attempt their Individual Physical Proficiency Test (IPPT). Failure to do so will call for an investigation and subject to disciplinary action, hence it is important that as NSMen, we keep track of our IPPT progress, our deadlines, and also the dates when we are called back for training. 

Thus, this app aims to help NSMen do exactly that.

## Overview
---

This django app is built to help NSMen keep track of their NS Journey and to ensure that we are ready for our IPPT tests and our ICTs.

Users will be able to create an account and keep track of their past IPPT attempts, their future IPPT/NS FIT bookings and dates, and also keep track of their callups and mannings. Not only that but there is an in-built calculator that everyone can use without signing in, to see whether they are able to pass their IPPT test based on their age. The grading is based on the Singapore Armed Forces IPPT grading system. 

## Distinctiveness and Complexity
--- 

The application is built with the django framework for the back-end, with Javascript on the front-end. 
User authentication, updates to SQLite databases, are all done with django, while Javascript is used to handle the user interface and how it reacts. Bootstrap library is also used for the design of the user interface.
The app is also mobile-responsive. 

The app has 3 distinct features that help to tackle the problems listed above. 

### 1. IPPT / NS FIT Tracker
This allows NSMen to keep track of their past IPPT scores to ensure that they continue to keep fit and stay operationally ready until the end of their reservist trainings. 
Not only that, but users can also keep track of their future IPPT dates and test locations as a reminder for their upcoming tests.

NS FIT is the alternative to IPPT, whereby instead of a test, NSMen can opt to go for fitness workouts instead. The app also allows users to keep track of their progress and future bookings of NS FIT workouts.

On the homepage, if the user's birthday is in 2 months, the app will check if the user has attempted or booked an IPPT test before their birthday. This reminds NSMen to book their test if they have not done so.

Users can also edit the info they have added whenever they need to.


### 2. IPPT Score Calculator
The grading system for IPPT can be a little confusing, because of the different age groups and scoring tables for each station, hence it can be quite hard to calculate the score we will get based on the number of reps and timing we do. 

As such, the IPPT Score Calculator makes it easier for NSMen to calculate their scores. All they need to do is enter their age, enter their reps and timings and the website calculates for them tier score.

The calculation is done by Javascript and is client-side.


### 3. Manage Call-Ups & Mannings
Similar to the IPPT/NS FIT Tracker, users can keep track of their past callups and keep track of their future callups/mannings. 

Users are not able to edit info they have added in but are allowed to delete them if needed. This is to prevent users from accidentally editing important information about their future callups.


## File Contents
---
Inside the NSLife folder(main django app), these are some of the files created:
- models.py
- views.py 
- urls.py
- forms.py
- static/NSLife
- templates/NSLife

### models.py
There are 3 different models used, User, Exercise, and Manning.:
- User model is used to store user information and used for user authentication.
- Exercise model is used to store information on IPPT and NS FIT.
- Manning model is used to store information on callups and mannings.

### views.py
Contains the functions of the web application, and helps to render web pages based on requests being made to the server. 

### urls.py
Handles URLs of our web application and lists all endpoints.

### forms.py
2 forms inside this folder:
- RegisterForm, used to register any new users to the app
- LoginForm, used to login users into the app

### static/NSLife
There are 3 Javascript files and 1 CSS file inside this directory:
- add.js: Handles the 'Manage call-ups and mannings' page
- booking.js: Handles the page in charge of adding new IPPT and NS FIT data
- scoring.js: Handles the 'IPPT Score Calculator' page, does the calculation of the scores
- styles.css: Styling of the web application

### templates/NSLife
There are 10 HTML files inside this directory:
- booking.html: Page for adding new IPPT and NS FIT data
- edit.html: Page for editing IPPT and NS FIT data
- index.html: Homepage for the website
- layout.html: Layout of website, navbar included
- login.html: Login page 
- profile.html: Profile page
- register.html: Register new user page
- reservist.html: 'Manage Call-ups and Mannings' Page
- scoring.html: 'IPPT Score Calculator' Page
- tracker.html: 'IPPT & NS FIT Tracker' Page


## Running the application
--- 
```
python manage.py makemigrations NSLife
python manage.py migrate
python manage.py runserver
```
