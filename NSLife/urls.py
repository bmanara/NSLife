from django.urls import path

from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("register", views.register, name="register"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("tracker", views.booking_tracker, name="tracker"),
    path("scoring", views.scoring, name="scoring"),
    path("reservist", views.reservist_view, name="reservist"),
    path("booking", views.booking, name="booking"),
    path("edit/exercise/<int:id>", views.edit_exercise, name="edit_exercise"),
    path("delete/exercise/<int:id>", views.delete_exercise, name="delete_exercise"),
    path("profile", views.profile_view, name="profile"),
    
    # API Routes
    path("delete/manning/<int:id>", views.delete_manning, name="delete_manning")
]