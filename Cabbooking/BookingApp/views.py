from django.shortcuts import render
from datetime import datetime
from django.template import RequestContext
from django.contrib import messages
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
import os
import json
from web3 import Web3, HTTPProvider
import base64

global username, bookList, reviewList, usersList, vehicle_no
global contract, web3

# Function to call contract
def getContract():
    global contract, web3
    blockchain_address = 'http://127.0.0.1:9545'
    web3 = Web3(HTTPProvider(blockchain_address))
    web3.eth.defaultAccount = web3.eth.accounts[0]
    compiled_contract_path = 'Booking.json' #Booking contract file
    deployed_contract_address = '0x225a9E92Afa2e6e70Aaa5324C9Fd5B5046453137' #contract address
    with open(compiled_contract_path) as file:
        contract_json = json.load(file)  # load contract info as JSON
        contract_abi = contract_json['abi']  # fetch contract's abi - necessary to call its functions
    file.close()
    contract = web3.eth.contract(address=deployed_contract_address, abi=contract_abi)
getContract()

def getUsersList():
    global usersList, contract
    usersList = []
    count = contract.functions.getUserCount().call()
    for i in range(0, count):
        username = contract.functions.getUsername(i).call()
        password = contract.functions.getPassword(i).call()
        phone = contract.functions.getPhone(i).call()
        email = contract.functions.getEmail(i).call()
        utype = contract.functions.getUserType(i).call()
        vehicle = contract.functions.getVehicleNo(i).call()
        usersList.append([username, password, phone, email, utype, vehicle])

def getReviewList():
    global reviewList, contract
    reviewList = []
    count = contract.functions.getReviewCount().call()
    for i in range(0, count):
        passenger = contract.functions.getPassenger(i).call()
        driver = contract.functions.getDriver(i).call()
        feedback = contract.functions.getFeedback(i).call()
        rating = contract.functions.getRating(i).call()
        reviewList.append([passenger, driver, feedback, rating])

def getBookList():
    global bookList, contract
    bookList = []
    count = contract.functions.getBookCount().call()
    for i in range(0, count):
        bookid = contract.functions.getBookingid(i).call()
        passenger = contract.functions.getPassengername(i).call()
        location = contract.functions.getLocation(i).call()
        book_time = contract.functions.getBookTime(i).call()
        vehicle = contract.functions.getVehicleNumber(i).call()
        amount = contract.functions.getAmount(i).call()
        status = contract.functions.getStatus(i).call()
        payment = contract.functions.getPaymentdetails(i).call()
        bookList.append([bookid, passenger, location, book_time, vehicle, amount, status, payment])
getUsersList()
getReviewList()    
getBookList()

def PaymentAction(request):
    if request.method == 'POST':
        global bookList, username, vehicle_no
        name = request.POST.get('t1', False)  # Booking ID
        card = request.POST.get('t2', False)  # Card number
        cvv = request.POST.get('t3', False)   # CVV
        amount = request.POST.get('t4', False)  # Amount
        
        # Update blockchain entries
        contract.functions.updatePayment(int(name), "Card = " + card + ", CVV = " + cvv).transact()
        contract.functions.updateStatus(int(name), "Completed").transact()
        contract.functions.updateAmount(int(name), amount).transact()
        
        # Update local cache
        blist = bookList[int(name)]
        blist[6] = "Completed"
        blist[7] = "Card = " + card + ", CVV = " + cvv
        blist[5] = amount
        
        # Determine the correct page based on user type
        page = 'UserScreen.html'  # Default for passengers
        for i in range(len(usersList)):
            ulist = usersList[i]
            if username == ulist[0]:  # Match current session username
                if ulist[4] == "Driver" and blist[4] == vehicle_no:  # Driver-specific condition
                    page = 'UserScreen.html'
                break
        
        context = {'data': "Payment Successfully Recorded in Blockchain"}
        return render(request, page, context)

def AcceptPaymentAction(request):
    if request.method == 'GET':
        global bookList, username, vehicle_no
        name = request.GET.get('bid', False)
        output = '<tr><td><font size="3" color="black">Booking&nbsp;ID</b></td><td><input type="text" name="t1" size="15" value="'+name+'" readonly/></td></tr>'
        context= {'data1': output}
        return render(request, 'Payment.html', context)

def AcceptPayment(request):
    if request.method == 'GET':
        global bookList, username, vehicle_no
        total_amount = 0
        output = '<table border=1 align=center>'
        output+='<tr><th><font size=3 color=black>Booking ID</font></th>'
        output+='<th><font size=3 color=black>Passenger</font></th>'
        output+='<th><font size=3 color=black>Location</font></th>'
        output+='<th><font size=3 color=black>Booking Time</font></th>'
        output+='<th><font size=3 color=black>View Route Map</font></th>'
        output+='<th><font size=3 color=blue>Click Here to Accept</font></tr>'
        for i in range(len(bookList)):
            blist = bookList[i]
            if blist[6] == "Accepted":
                output+='<tr><td><font size=3 color=black>'+blist[0]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[1]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[2]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[3]+'</font></td>'
                output+='<td><a href=\'ViewMap?location='+blist[2]+'\'><font size=3 color=blue>View Route Map</font></a></td>'
                output+='<td><a href=\'AcceptPaymentAction?bid='+str(i)+'\'><font size=3 color=blue>Click To Complete Ride</font></a></td></tr>'      
        output += "</table><br/><br/><br/><br/>"
        context= {'data':output}        
        return render(request,'DriverScreen.html', context)  

def AcceptBookingAction(request):
    if request.method == 'GET':
        global bookList, username, vehicle_no
        name = request.GET.get('bid', False)
        blist = bookList[int(name)]
        contract.functions.updateVehicle(int(name), vehicle_no).transact()
        contract.functions.updateStatus(int(name), "Accepted").transact()
        blist[6] = "Accepted"
        blist[4] = vehicle_no
        context= {'data':"<font size=3 color=blue>Request Accepted & Booking Confirmed</font><br/><br/><br/>"}
        return render(request, 'DriverScreen.html', context)

def ViewMap(request):
    if request.method == 'GET':
        name = request.GET.get('location', False)
        output = '<iframe width="625" height="650" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q='+name+'&amp;ie=UTF8&amp;&amp;output=embed"></iframe><br/>'
        context= {'data':output}
        return render(request, 'DriverScreen.html', context)

def AcceptBooking(request):
    if request.method == 'GET':
        global bookList, username, vehicle_no
        total_amount = 0
        output = '<table border=1 align=center>'
        output+='<tr><th><font size=3 color=black>Booking ID</font></th>'
        output+='<th><font size=3 color=black>Passenger</font></th>'
        output+='<th><font size=3 color=black>Location</font></th>'
        output+='<th><font size=3 color=black>Booking Time</font></th>'
        output+='<th><font size=3 color=black>View Route Map</font></th>'
        output+='<th><font size=3 color=blue>Click Here to Accept</font></tr>'
        for i in range(len(bookList)):
            blist = bookList[i]
            if blist[6] == "Booking Request":
                output+='<tr><td><font size=3 color=black>'+blist[0]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[1]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[2]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[3]+'</font></td>'
                output+='<td><a href=\'ViewMap?location='+blist[2]+'\'><font size=3 color=blue>View Route Map</font></a></td>'
                output+='<td><a href=\'AcceptBookingAction?bid='+str(i)+'\'><font size=3 color=blue>Accept Booking</font></a></td></tr>'      
        output += "</table><br/><br/><br/><br/>"
        context= {'data':output}        
        return render(request,'DriverScreen.html', context)  

def ViewEarning(request):
    if request.method == 'GET':
        global bookList, username, vehicle_no
        total_amount = 0
        output = '<table border=1 align=center>'
        output+='<tr><th><font size=3 color=black>Booking ID</font></th>'
        output+='<th><font size=3 color=black>Passenger</font></th>'
        output+='<th><font size=3 color=black>Location</font></th>'
        output+='<th><font size=3 color=black>Booking Time</font></th>'
        output+='<th><font size=3 color=black>Vehicle No</font></th>'
        output+='<th><font size=3 color=black>Amount</font></th>'
        output+='<th><font size=3 color=black>Status</font></th>'
        output+='<th><font size=3 color=black>Payment Details</font></th></tr>'
        for i in range(len(bookList)):
            blist = bookList[i]
            if blist[4] == vehicle_no:
                if blist[6] == "Completed":
                    total_amount += float(blist[5])
                output+='<tr><td><font size=3 color=black>'+blist[0]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[1]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[2]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[3]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[4]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[5]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[6]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[7]+'</font></td></tr>'
        output+='<tr><tr><td><font size=3 color=blue>Total Earning = '+str(total_amount)+'</font></td></tr>'        
        output += "</table><br/><br/><br/><br/>"
        context= {'data':output}        
        return render(request,'DriverScreen.html', context)   

def ViewOwnRatings(request):
    if request.method == 'GET':
        global reviewList, username
        output = '<table border=1 align=center>'
        output+='<tr><th><font size=3 color=black>Passenger Name</font></th>'
        output+='<th><font size=3 color=black>Driver Name</font></th>'
        output+='<th><font size=3 color=black>Feedback</font></th>'
        output+='<th><font size=3 color=black>Ratings</font></th></tr>'
        for i in range(len(reviewList)):
            blist = reviewList[i]
            if blist[1] == username:
                output+='<tr><td><font size=3 color=black>'+blist[0]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[1]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[2]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[3]+'</font></td></tr>'
        output += "</table><br/><br/><br/><br/>"
        context= {'data':output}        
        return render(request,'DriverScreen.html', context) 

def ViewRatings(request):
    if request.method == 'GET':
        global reviewList, username
        output = '<table border=1 align=center>'
        output+='<tr><th><font size=3 color=black>Passenger Name</font></th>'
        output+='<th><font size=3 color=black>Driver Name</font></th>'
        output+='<th><font size=3 color=black>Feedback</font></th>'
        output+='<th><font size=3 color=black>Ratings</font></th></tr>'
        for i in range(len(reviewList)):
            blist = reviewList[i]
            output+='<tr><td><font size=3 color=black>'+blist[0]+'</font></td>'
            output+='<td><font size=3 color=black>'+blist[1]+'</font></td>'
            output+='<td><font size=3 color=black>'+blist[2]+'</font></td>'
            output+='<td><font size=3 color=black>'+blist[3]+'</font></td></tr>'
        output += "</table><br/><br/><br/><br/>"
        context= {'data':output}        
        return render(request,'UserScreen.html', context)    

def FeedbackAction(request):
    if request.method == 'POST':
        global reviewList, username, contract
        driver = request.POST.get('t1', False)
        feedback = request.POST.get('t2', False)
        ratings = request.POST.get('t3', False)
        msg = contract.functions.saveReview(username, driver, feedback, ratings).transact()
        tx_receipt = web3.eth.waitForTransactionReceipt(msg)
        reviewList.append([username, driver, feedback, ratings])
        context= {'data':'<font size="3" color="blue">Your feedback & ratings accapted for driver : '+driver+'</font><br/><br/>'}
        return render(request, 'UserScreen.html', context) 

def Feedback(request):
    if request.method == 'GET':
        global bookList, usersList, username
        past_rides = []
        default_ride = None
        # Collect completed rides for the current passenger
        for i, blist in enumerate(bookList):
            if blist[1] == username and blist[6] == "Completed" and blist[7] != "pending":
                # Find driver details from usersList using vehicle number
                driver_username = None
                driver_vehicle = blist[4]
                for ulist in usersList:
                    if ulist[4] == "Driver" and ulist[5] == driver_vehicle:
                        driver_username = ulist[0]
                        break
                if driver_username:
                    ride = {
                        'id': blist[0],  # Booking ID
                        'driver': {'username': driver_username, 'vehicle_no': driver_vehicle}
                    }
                    past_rides.append(ride)
        # Select the most recent completed ride (highest index)
        if past_rides:
            default_ride = max(past_rides, key=lambda x: int(x['id']))
        context = {'past_rides': past_rides, 'default_ride': default_ride}
        return render(request, 'Feedback.html', context)

def ViewPastRides(request):
    if request.method == 'GET':
        global bookList, username
        output = '<table border=1 align=center>'
        output+='<tr><th><font size=3 color=black>Booking ID</font></th>'
        output+='<th><font size=3 color=black>Passenger</font></th>'
        output+='<th><font size=3 color=black>Location</font></th>'
        output+='<th><font size=3 color=black>Booking Time</font></th>'
        output+='<th><font size=3 color=black>Vehicle No</font></th>'
        output+='<th><font size=3 color=black>Amount</font></th>'
        output+='<th><font size=3 color=black>Status</font></th>'
        output+='<th><font size=3 color=black>Payment Details</font></th></tr>'
        for i in range(len(bookList)):
            blist = bookList[i]
            if blist[1] == username:
                output+='<tr><td><font size=3 color=black>'+blist[0]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[1]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[2]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[3]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[4]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[5]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[6]+'</font></td>'
                output+='<td><font size=3 color=black>'+blist[7]+'</font></td></tr>'
        output += "</table><br/><br/><br/><br/>"
        context= {'data':output}        
        return render(request,'UserScreen.html', context)    

def CancelRide(request):
    if request.method == 'GET':
        global bookList, username
        book_id = "None"
        status = "Booking cannot be cancel as is already confirmed"
        for i in range(len(bookList)):
            blist = bookList[i]
            if blist[1] == username:
                if blist[6] == 'Booking Request':
                    blist[6] = "Cancelled Booking"
                    contract.functions.updateStatus(int(i), "Cancelled Booking").transact()
                    book_id = blist[0]
                    status = 'Booking Successfully Cancelled with Booking Id = '+book_id
                    break                
        context= {'data':'<font size="3" color="blue">'+status+'</font>'}
        return render(request, 'UserScreen.html', context)                 

def BookCabAction(request):
    if request.method == 'POST':
        global bookList, username, contract
        location = request.POST.get('t1', False)
        now = datetime.now()
        book_time = str(now.strftime("%Y-%m-%d %H:%M:%S"))
        print(book_time)
        book_id = str(len(bookList) + 1)
        msg = contract.functions.saveBooking(book_id, username, location, book_time, "pending", "0", "Booking Request", "pending").transact()
        tx_receipt = web3.eth.waitForTransactionReceipt(msg)
        bookList.append([book_id, username, location, book_time, "pending", "0", "Booking Request", "pending"])
        context= {}
        return render(request, 'BookCab.html', context)     
    
def MakePayment(request):
    if request.method == 'GET':
        global bookList, username
        payment_details = ""
        booking_found = False
        # Find the booking where passenger == current username and status is "Accepted" or "Payment Pending"
        for i in range(len(bookList)):
            blist = bookList[i]
            if blist[1] == username and blist[6] in ["Accepted", "Payment Pending"]:
                payment_details = '<tr><td><font size="3" color="black">Booking ID</font></td><td><input type="text" name="t1" size="15" value="'+str(i)+'" readonly/></td></tr>'
                booking_found = True
                break
        if not booking_found:
            context = {'data': '<font size="3" color="red">No rides pending payment.</font>'}
            return render(request, 'UserScreen.html', context)
        context = {'data1': payment_details}
        return render(request, 'Payment.html', context)

def AcceptPaymentAction(request):
    if request.method == 'GET':
        global bookList, username, vehicle_no
        name = request.GET.get('bid', False)
        contract.functions.updateStatus(int(name), "Payment Pending").transact()
        bookList[int(name)][6] = "Payment Pending"
        context= {'data':"<font size=3 color=blue>Ride completed. Waiting for passenger payment.</font><br/><br/><br/>"}
        return render(request, 'DriverScreen.html', context)

def BookCab(request):
    if request.method == 'GET':
        return render(request,'BookCab.html', {}) 

def index(request):
    if request.method == 'GET':
        return render(request,'index.html', {}) 

def Register(request):
    if request.method == 'GET':
       return render(request, 'Register.html', {})
    
def Login(request):
    if request.method == 'GET':
       return render(request, 'Login.html', {})

def RegisterAction(request):
    if request.method == 'POST':
        global usersList
        username = request.POST.get('username', False)
        password = request.POST.get('password', False)
        phone = request.POST.get('contact', False)
        email = request.POST.get('email', False)
        usertype = request.POST.get('type', False)
        vehicle = request.POST.get('vehicle', False)
        status = "none"
        for i in range(len(usersList)):
            users = usersList[i]
            if username == users[0]:
                status = "exists"
                break
        if status == "none":
            msg = contract.functions.saveUser(username, password, phone, email, usertype, vehicle).transact()
            tx_receipt = web3.eth.waitForTransactionReceipt(msg)
            usersList.append([username, password, phone, email, usertype, vehicle])
            context= {'data':'<font size="3" color="blue">Signup Process Completed</font><br/><br/>'}
            return render(request, 'Register.html', context)
        else:
            context= {'data':'Given username already exists'}
            return render(request, 'Register.html', context)

def UserLogin(request):
    if request.method == 'POST':
        global username, contract, usersList, vehicle_no
        username = request.POST.get('username', False)
        password = request.POST.get('password', False)
        status = 'none'
        page = "Login.html"
        print(usersList)
        for i in range(len(usersList)):
            ulist = usersList[i]
            user1 = ulist[0]
            pass1 = ulist[1]
            utype = ulist[4]
            if user1 == username and pass1 == password:
                status = "success"
                vehicle_no = ulist[5]
                if utype == "Driver":
                    page = "DriverScreen.html"
                if utype == "Passenger":
                    page = "UserScreen.html"
                break
        if status == 'success':
            output = 'Welcome '+username
            context= {'data':output}
            return render(request, page, context)
        if status == 'none':
            context= {'data':'Invalid login details'}
            return render(request, page, context)