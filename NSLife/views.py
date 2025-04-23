from django.shortcuts import render, redirect
from django.contrib import messages
from django.db import IntegrityError
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

import datetime

from .forms import RegisterForm, LoginForm
from .models import User, Exercise, Manning


LOCATIONS = {
    "maju-fcc": "Maju FCC",
    "kranji-fcc": "Kranji FCC",
    "khatib-fcc": "Khatib FCC",
    "bedok-fcc": "Bedok FCC",
    "bishan-park": "Bishan-Ang Mo Kio Park",
    "marina-bay": "Marina City Gallery @ Marina Bay",
    "punggol-park": "Punggol Park",
    "home": "FIT @ Home (Video Conference)",
    "clementi-camp": "Clementi Camp",
    "yishun-camp": "Dieppe Barracks",
    "hendon-camp": "Hendon Camp",
    "gedong-camp": "Sungei Gedong Camp",
    "jurong-camp": "Jurong Camp II",
    "khatib-camp": "Khatib Camp",
    "kranji-camp": "Kranji Camp II",
    "maju-camp": "Maju Camp"
}



# Create your views here.

def index(request):
    if request.user.is_authenticated:
        now = datetime.date.today()
        user = request.user
        birthdate = user.birthdate
        birthday = birthdate.replace(year=now.year)
        delta = birthday - now

        if 0 < delta.days < 62:
            booked = False
            try:
                tests = Exercise.objects.filter(user=user, type="ippt")
                for test in tests:
                    test_date = test.datetime.date()
                    delta_two = birthday - test_date
                    if 0 < delta_two.days < 365:
                        booked = True
            except:
                pass   

            if booked:
                messages.success(request, f"You will attempt/have attempted your IPPT for this work year. Good Job!")
            else:
                messages.warning(request, f"Reminder: Book your IPPT Test if you have not completed at least 10 sessions of NS FIT, before your birthday in order to clear your fitness requirement for the work year. You have {delta.days} days left to attempt your test.")
    
    return render(request, "NSLife/index.html")


def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            first_name = form.cleaned_data["first_name"]
            last_name = form.cleaned_data["last_name"]
            email = form.cleaned_data["email"]
            password = form.cleaned_data["password"]
            birthdate = form.cleaned_data["birthdate"]

            # Check if both password fields are the same
            if password == form.cleaned_data["confirm_password"]:

                # Check if email already exists
                try:
                    User.objects.get(email=email)
                except:
                    # Check if username already exists
                    try:
                        new_user = User.objects.create_user(username=username, 
                                                            first_name=first_name, 
                                                            last_name=last_name,
                                                            email=email,
                                                            password=password,
                                                            birthdate=birthdate
                                                            )
                        new_user.save()
                    except IntegrityError:
                        messages.error(request, "Username already taken.")
                        return render(request, "NSLife/register.html", {
                            "form": form
                        })
                    
                    login(request, new_user)
                    return redirect("index")
                else:
                    messages.error(request, "The email entered has already been registered to our system, try logging in instead?")
                    return redirect("login")

            else:  
                messages.error(request, "'Password' and 'Confirm password' fields are not the same, please ensure you enter your password correctly.")
                return render(request, "NSLife/register.html", {
                    "form": form
                })
    else:
        return render(request, "NSLife/register.html", {
            "form": RegisterForm()
        })
    

def login_view(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            print(username, password)
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect("index")
            else:
                messages.error(request, "Invalid Username and/or Password.")
                return redirect("login")

    else:
        return render(request, "NSLife/login.html", {
            'form': LoginForm()
        })
    

@login_required
def logout_view(request):
    logout(request)
    return redirect("index")


@login_required
def profile_view(request):
    user = request.user
    if request.method == 'POST':
        new_username = request.POST["new_username"]
        new_birthdate = request.POST["new_birthdate"]

        user.username = new_username
        user.birthdate = new_birthdate
        user.save()
        return redirect('profile')

    else:
        date = user.birthdate.strftime('%Y-%m-%d')
        return render(request, "NSLife/profile.html", {
            "user": user,
            "date": date
        })


@login_required
def booking_tracker(request):
    user = request.user
    ippt_exercises = user.user_exercises.filter(type="ippt")
    ippt_exercises = ippt_exercises.order_by('datetime').reverse()
    ippt_exercises = [exercise for exercise in ippt_exercises]

    nsfit_exercises = user.user_exercises.filter(type="nsfit")
    nsfit_exercises = nsfit_exercises.order_by('datetime').reverse()
    nsfit_exercises = [exercise for exercise in nsfit_exercises]

    now = datetime.datetime.now()

    for exercise in ippt_exercises:
        exercise.location = LOCATIONS[exercise.location]

        if now > exercise.datetime.replace(tzinfo=None) and exercise.score == 0:
            exercise.score = 1

    for exercise in nsfit_exercises:
        exercise.location = LOCATIONS[exercise.location]

        if now > exercise.datetime.replace(tzinfo=None):
            exercise.score = 1

    return render(request, "NSLife/tracker.html", {
        'ippt_exercises': ippt_exercises,
        'nsfit_exercises': nsfit_exercises
    })


@login_required
def booking(request):
    if request.method == "POST":
        exercise = request.POST["exercise-type"]
        location = request.POST.get("locations", False)
        date = request.POST["exercise-datetime"]

        if not location:
            messages.error(request, "You did not enter a valid location, try again.")
            return redirect("booking")

        if exercise == "ippt":
            score = request.POST["exercise-score"]
            if score == '':
                score = 0   
            # Check that user has attempted IPPT, if not attempted, put score as zero 
            now = datetime.datetime.now()  
            if now < datetime.datetime.strptime(date, "%Y-%m-%dT%H:%M"):
                score = 0
        else:
            score = 0

        new_record = Exercise(user=request.user, type=exercise, location=location, datetime=date, score=score)
        new_record.save()
        return redirect("tracker")
    
    else:
        return render(request, "NSLife/booking.html")
    

@login_required
def edit_exercise(request, id):
    exercise = Exercise.objects.get(pk=id)
    if request.method == "POST":
        location = request.POST.get("locations", False)
        if location:
            exercise.location = location

        date = request.POST["exercise-datetime"]
        try:
            score = request.POST["exercise-score"]
        except:
            score = 0

        now = datetime.datetime.now()  
        if now < datetime.datetime.strptime(date, "%Y-%m-%dT%H:%M"):
            score = 0
        
        
        exercise.datetime = date
        exercise.score = score
        exercise.save()

        return redirect('tracker')
    else:
        original_location = LOCATIONS[exercise.location]
        print(exercise.datetime)
        date = exercise.datetime.strftime('%Y-%m-%d %H:%M:%S')
        return render(request, "NSLife/edit.html", {
            "exercise": exercise,
            "original_location": original_location,
            "date": date
        })
    

@login_required
def delete_exercise(request, id):
    exercise = Exercise.objects.get(pk=id)
    if request.method == "POST":
        exercise.delete()
        return redirect('tracker')


def scoring(request):
    start_age = 22
    end_age = 60
    return render(request, "NSLife/scoring.html", {
        'range': range(start_age, end_age + 1)
    })


@login_required
def reservist_view(request):
    if request.method == "POST":
        location = request.POST.get("ict_locations", False)
        intensity = request.POST["intensity"]
        start_datetime = request.POST["start-ict-datetime"]
        end_datetime = request.POST["end-ict-datetime"]
        
        if not location:
            messages.error(request, "You did not enter a valid location, try again.")
            return redirect("reservist")

        elif start_datetime > end_datetime:
            messages.error(request, 'Invalid start date and end date, please ensure you keyed in the dates correctly.')
            return redirect('reservist')

        manning = Manning(user=request.user, location=location, intensity=intensity, start_datetime=start_datetime, end_datetime=end_datetime)
        manning.save()
        return redirect('reservist')

    else:
        mannings = Manning.objects.filter(user=request.user)
        mannings = mannings.order_by('start_datetime').reverse()
        mannings = [manning for manning in mannings]
        now = datetime.datetime.now()
        for manning in mannings:
            manning.location = LOCATIONS[manning.location]
            if now < manning.end_datetime.replace(tzinfo=None):
                manning.completed = True
            else:
                manning.completed = False

        return render(request, "NSLife/reservist.html", {
            "mannings": mannings
        })


@login_required
def delete_manning(request, id):
    manning = Manning.objects.get(pk=id)
    manning.delete()
    return HttpResponse(status=204)
