pragma solidity >= 0.8.11 <= 0.8.11;
pragma experimental ABIEncoderV2;
//Booking solidity code
contract Booking {

    uint public userCount = 0; 
    mapping(uint => user) public userList; 
     struct user
     {
       string username;
       string password;
       string phone;
       string email;
       string user_type;
       string vehicle_no;
     }
 
   // events 
   event userCreated(uint indexed _userId);
   
   //function  to save user details to Blockchain
   function saveUser(string memory uname, string memory pass, string memory phone, string memory email, string memory ut, string memory vno) public {
      userList[userCount] = user(uname, pass, phone, email, ut,vno);
      emit userCreated(userCount);
      userCount++;
    }

     //get user count
    function getUserCount()  public view returns (uint) {
          return  userCount;
    }

    uint public bookCount = 0; 
    mapping(uint => book) public bookList; 
     struct book
     {
       string book_id; 
       string passenger_name;
       string location;
       string book_time;
       string vehicle_no;   
       string amount;
       string status;
       string payment_details;
     }
 
   // events 
   event bookCreated(uint indexed _bookId);
   
   //function  to save booking details to Blockchain
   function saveBooking(string memory bid, string memory pname, string memory loc, string memory btime, string memory vno, string memory amt, string memory st, string memory pd) public {
      bookList[bookCount] = book(bid, pname, loc, btime, vno, amt, st, pd);
      emit bookCreated(bookCount);
      bookCount++;
    }

    //get book count
    function getBookCount()  public view returns (uint) {
          return  bookCount;
    }

    uint public reviewCount = 0; 
    mapping(uint => review) public reviewList; 
     struct review
     {
       string passenger;
       string driver;
       string feedback;
       string ratings;
     }
 
   // events 
   event reviewCreated(uint indexed _reviewId);
   
   //function  to save review details to Blockchain
   function saveReview(string memory passenger, string memory driver, string memory feedback, string memory ratings) public {
      reviewList[reviewCount] = review(passenger, driver, feedback, ratings);
      emit reviewCreated(reviewCount);
     reviewCount++;
    }

     //get review count
    function getReviewCount()  public view returns (uint) {
          return  reviewCount;
    }


    function getUsername(uint i) public view returns (string memory) {
        user memory doc = userList[i];
	return doc.username;
    }

    function getPassword(uint i) public view returns (string memory) {
        user memory doc = userList[i];
	return doc.password;
    }

    function getPhone(uint i) public view returns (string memory) {
        user memory doc = userList[i];
	return doc.phone;
    }    

    function getEmail(uint i) public view returns (string memory) {
        user memory doc = userList[i];
	return doc.email;
    }

    function getUserType(uint i) public view returns (string memory) {
        user memory doc = userList[i];
	return doc.user_type;
    }

    function getVehicleNo(uint i) public view returns (string memory) {
        user memory doc = userList[i];
	return doc.vehicle_no;
    }

    function updateVehicle(uint i, string memory vno) public { 
      bookList[i].vehicle_no = vno;
    }

    function updateStatus(uint i, string memory st) public { 
      bookList[i].status = st;
    }

    function updateAmount(uint i, string memory amt) public { 
      bookList[i].amount = amt;
    }

    function updatePayment(uint i, string memory pd) public { 
      bookList[i].payment_details = pd;
    }

   function getBookingid(uint i) public view returns (string memory) {
        book memory doc = bookList[i];
	return doc.book_id;
    }

    function getPassengername(uint i) public view returns (string memory) {
        book memory doc = bookList[i];
	return doc.passenger_name;
    }

    function getLocation(uint i) public view returns (string memory) {
        book memory doc = bookList[i];
	return doc.location;
    }
    
    function getBookTime(uint i) public view returns (string memory) {
        book memory doc = bookList[i];
	return doc.book_time;
    }

    function getVehicleNumber(uint i) public view returns (string memory) {
        book memory doc = bookList[i];
	return doc.vehicle_no;
    }

    function getAmount(uint i) public view returns (string memory) {
        book memory doc = bookList[i];
	return doc.amount;
    }

    function getStatus(uint i) public view returns (string memory) {
        book memory doc = bookList[i];
	return doc.status;
    }

    function getPaymentdetails(uint i) public view returns (string memory) {
        book memory doc = bookList[i];
	return doc.payment_details;
    }

    function getPassenger(uint i) public view returns (string memory) {
        review memory doc = reviewList[i];
	return doc.passenger;
    }

    function getDriver(uint i) public view returns (string memory) {
        review memory doc = reviewList[i];
	return doc.driver;
    }

    function getFeedback(uint i) public view returns (string memory) {
        review memory doc = reviewList[i];
	return doc.feedback;
    }
    function getRating(uint i) public view returns (string memory) {
        review memory doc = reviewList[i];
	return doc.ratings;
    }
    
}