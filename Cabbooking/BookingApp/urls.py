from django.urls import path

from . import views

urlpatterns = [path("index.html", views.index, name="index"),
	       path('Login.html', views.Login, name="Login"), 
	       path('Register.html', views.Register, name="Register"),
	       path('RegisterAction', views.RegisterAction, name="RegisterAction"),
	       path('UserLogin', views.UserLogin, name="UserLogin"),	     
	       path('BookCab', views.BookCab, name="BookCab"),	
	       path('BookCabAction', views.BookCabAction, name="BookCabAction"),
	       path('CancelRide', views.CancelRide, name="CancelRide"),
	       path('ViewPastRides', views.ViewPastRides, name="ViewPastRides"),
	       path('Feedback', views.Feedback, name="Feedback"),
	       path('FeedbackAction', views.FeedbackAction, name="FeedbackAction"),
	       path('ViewRatings', views.ViewRatings, name="ViewRatings"),
	       path('AcceptBooking', views.AcceptBooking, name="AcceptBooking"),
	       path('AcceptBookingAction', views.AcceptBookingAction, name="AcceptBookingAction"),
	       path('ViewEarning', views.ViewEarning, name="ViewEarning"),
	       path('ViewOwnRatings', views.ViewOwnRatings, name="ViewOwnRatings"),	  
	       path('PaymentAction', views.PaymentAction, name="PaymentAction"),
	       path('AcceptPayment', views.AcceptPayment, name="AcceptPayment"),
	       path('AcceptPaymentAction', views.AcceptPaymentAction, name="AcceptPaymentAction"),
	       path('ViewMap', views.ViewMap, name="ViewMap"),
           path('MakePayment', views.MakePayment, name="MakePayment"),

]