var message = document.getElementById("message").value;
var mail = document.getElementById("email");
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var requestitle = document.getElementById("requestitle");
var linkdin = document.getElementById("linkdin");
var reqDesc = document.getElementById("reqDesc");
var  question_field = document.getElementsByClassName('question_field');





//GET METHOD
mydata();
var data;

var objectdata;

function mydata() {
  fetch(
      
    "https://ignatiuz.webtalkx.com/api/I2BRecordingRequest/GetRecordingRequest",
    

    {
      method: "POST",

      body: JSON.stringify({
        RequesterID: 6,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((myresponse) => {
      return myresponse.json();
    })
    .then((data) => {
      // console.log(data);
      objectdata= data;

    //   let tableRow = "";
    var formdata = "";

      data.forEach((element) => {
       
        formdata += `
        <form action="formdata.html" method="get" target="_blank" id="form">
        <div class="form-group">
            <label class="text-white" for="message">Message to include in recording request:</label>
            <textarea class="form-control mt-4" placeholder="Please enter message" rows="3"
                id="message"></textarea>
        </div>  
        <div class="form-check-inline mt-4">
            <label class="form-check-label text-white">
                <input type="checkbox" class="form-check-input" value="${element.Message}">Check box to restrict sharing of
                this recording
            </label>
        </div><br><br>
        <h2 class="text-white">Enter your details :</h2>
        <div class="form-group mt-4">
            <label class="text-white" for="email"> Email address : </label>
            <input type="email" class="form-control rounded-pill" placeholder="Email address" value="${element.GiverEmailID}"
                id="email">
        </div>
        <div class="form-group mt-4 ">
            <label class="text-white" for="fname">First name :</label>
            <input type="text" class="form-control rounded-pill" placeholder="First name" value="${element.GiverFirstName}"
                id="fname">
        </div>
        <div class="form-group mt-4 ">
            <label class="text-white" for="lname">Last Name : </label>
            <input type="text" class="form-control form-check-inline rounded-pill" placeholder="Last Name"
                value="${element.GiverSecondName}" id="lname">
        </div>
        <div class="form-group mt-4 ">
            <label class="text-white" for="requestitle">Recording request title : </label>
            <input type="text" class="form-control form-check-inline rounded-pill"
                placeholder="Recording request title" value="${element.Title}" id="requestitle"> 
        </div>
        <div class="form-group mt-4 ">
            <label class="text-white" for="linkdin">Linkdin profile link : </label>
            <input type="text" class="form-control form-check-inline rounded-pill"
                placeholder="Linkdin profile link" value="${element.GiverLinkedIn}" id="linkdin">
        </div>
        <div class="form-group mt-4">
            <label class="text-white" for="reqDesc">Enter the recording request description</label>
            <textarea class="form-control " value="${element.ResponseStatus}"
                placeholder="Enter the recording request description" rows="3" id="reqDesc"></textarea>
        </div> <br> <br>

        <h3 class="text-white">Enter Your Questions</h3>

        <div class="form-group mt-4">
            <label class="text-white" for="question1">Enter your question : </label>
            <input class="form-control question_field" value="${element.QuestionText}" class="question" placeholder="Enter your question" rows="5" id="question1">
        </div>
        <div class="form-group mt-4">
            <label class="text-white" for="question2">Enter your question :</label>
            <input class="form-control question_field" value="" class="question" placeholder="Enter your question" rows="5" id="question2">
        </div>
        <div class="form-group mt-4">
            <label class="text-white" for="question3">Enter your question :</label>
            <input class="form-control question_field" value="" class="question" placeholder="Enter your question" rows="5" id="question3">
        </div>
        <br><br>
        <center> <input type="submit" class="btn btn-primary w-25   m-2" value="Submit"></center>
    </form>  `

      });

    document.getElementById("form").innerHTML = formdata;
    });

}