var mail, fname, lname, linkdin,requestitle;

//POST METHOD
var form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  // preventing  Auto submition inputs
  e.preventDefault();
  var message = document.getElementById("message").value;
  mail = document.getElementById("email").value;
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  requestitle = document.getElementById("requestitle").value;
  linkdin = document.getElementById("linkdin").value;
  var reqDesc = document.getElementById("reqDesc").value;
  var question1 = document.getElementById("question1").value;
  var question2 = document.getElementById("question2").value;
  var question3 = document.getElementById("question3").value;
  var  question_field = document.getElementsByClassName('question_field');
  var question = document.getElementsByClassName("question");
  var checkconsent = document.getElementById("mychkbox").value
  var mydata;
  var refRecordingID;


  // Fetch Message section
  var myfechMsg =
    "https://ignatiuz.webtalkx.com/api/I2BRecordingRequest/InsertRecordingRequest";

  fetch(myfechMsg, {
    method: "POST",
    body: JSON.stringify({
      Message: message,
      GiverEmailID: mail,
      GiverFirstName: fname,
      GiverSecondName: lname,
      Title : requestitle,
      GiverLinkedIn: linkdin,
      Instructions: reqDesc,
      RequesterID: 6,
    }),
    
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((myresponse) => {
      if (myresponse) {
        return myresponse.json();
      }
    })

    .then((data) => {
      mydata = data[0];
      console.log(mydata);
      refRecordingID = mydata.RefRecordingID;
      console.log(refRecordingID);
      
      if (mydata.ResponseStatus == "Success") {
        //Now call the insert user function
        insertUser(refRecordingID);

        //Now call the question functio to insert the question
        if(question_field.length > 0){
          for(let i = 0; i < question_field.length; i++){
            insertQuestion(refRecordingID, question_field[i], i+1);
          }
        }

          pageredirect();
     
      }
                 
    });
});




function insertQuestion(refRecordingID, elm, index){
  let element = elm, value;
  value = element ? element.value : '';
  if(value) {
    // Questions Section
    var myfechQue =
      "https://ignatiuz.webtalkx.com/api/I2BRecordingRequest/InsertRecordingQuestions";

    fetch(myfechQue, {
      method: "POST",

      body: JSON.stringify({
        QuestionOrder: index,
        QuestionText: value,
        RefRecordingID :refRecordingID          
      }),

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
    .then((myresponse) => {
      if (myresponse) {
        return myresponse.json();
      }
    })
    .then((data) => {

      if(data.ResponseStatus == "Success"){
               
      }
      
    });
  }
}


var formdatanew;
function insertUser(refRecordingID){
  let element = refRecordingID;
  
    // Questions Section
    var myfechQue =
      "https://ignatiuz.webtalkx.com/api/I2B_Users/InsertGiverCreation";

    fetch(myfechQue, {
      method: "POST",

      body: JSON.stringify({
        EmailID: mail,
        FirstName: fname,
        LastName: lname,
        LinkedIn: linkdin,
        UserID: 6,
        RefRecordingID : refRecordingID          
      }),

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
    .then((myresponse) => {
      if (myresponse) {
        return myresponse.json();
      }
    })
    .then((data) => {
    
      
    });
   
}

function pageredirect(){
  window.open(
      "file:///E:/Task_3/formdatatable.html", "_current"
  );
  form.reset();
}




//Add the input question fields
var mayquelength ,myque,mydiv;
   
    function addquestion(){     
       myque = document.getElementsByClassName('question_field');
    var quest;
    var inputquestion="";
     mayquelength = myque.length;
      var rowdiv = document.getElementById("rowdiv");
      console.log(rowdiv);
      inputquestion = `
                        <div class="form-group mt-4 queinput">
                        <label class="mb-2" for="question2">Enter your question :</label>
                         <input class=" question_field" value="" class="question"
                         placeholder="Enter your question" rows="5" id="question2" style="width:92.5%; height:38px ;">
                         <button class="btn btn-default mydltbtn" type="button" style="color:red;">X</button>
                        </div> 
                      `

            rowdiv.innerHTML += inputquestion;
            console.log(rowdiv);

            deletequestion();

          }





  // Delete Question fields
  function deletequestion(){
    var getdltbtn = document.getElementsByClassName("mydltbtn");
    console.log(getdltbtn);
    if(getdltbtn.length > 0){
      for(var i=0; i < getdltbtn.length; i++){
        console.log(getdltbtn[i]);
        console.log(getdltbtn[i].parentNode,getdltbtn[i].parentElement );
        var myelem = getdltbtn[i];
        if(myelem){
          myelem.addEventListener('click', function(){
            var myparentelem = myelem.parentNode;
            if(myparentelem){
              myparentelem.remove();
              console.log(myparentelem);
              deletequestion();
            }
            
          })
        }
       
        
      }
    }

    
  }

function goback(){
  window.open(
    "file:///E:/Task_3/index.html", "_current"
);

}