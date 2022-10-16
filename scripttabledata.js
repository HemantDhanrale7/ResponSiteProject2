
//GET METHOD
mydata();
var data;

var objectdata;
var refID;


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
      objectdata = data;

      let tableRow = "";

      data.forEach((element) => {
        tableRow += ` <tr>
        <td>  <div class="form-check mycheck">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
        <label class="form-check-label" for="flexCheckChecked">
        </label>
        </div>
        </td>
        <td>${element.GiverFirstName} ${element.GiverSecondName}</td>
        <td>${element.Title}</td>
        <td>${element.RequestDate}</td>
        <td>${element.RecordingStatus}</td>
        <td>
        <button type="button" class="btn btn-danger deletebutton" id="dlt_btn" data-bs-toggle="modal" data-bs-target="#myModal2" ><i class="fa fa-trash" aria-hidden="true"></i></button>
        </td> 
        </tr>`;
      });

       
           
      document.getElementById("TData").innerHTML = tableRow;
      $(document).ready(function() {
        $(".tabledata").DataTable();
      });

      

         
      //Get the checkbox value
      var mycheck = document.getElementsByClassName("mycheck");
      for (let i = 0; i <= mycheck.length; i++) {
        // console.log(mycheck[i].value);
        mycheck[i].addEventListener('click', function mydata(){
          console.log(objectdata[i].GiverFirstName +" "+ objectdata[i].GiverSecondName+" " + objectdata[i].Title +" "+ objectdata[i].RefRecordingID);
          copydata(
            objectdata[i].GiverFirstName,
            objectdata[i].GiverSecondName,
            objectdata[i].Title,
            objectdata[i].RefRecordingID
          );         
          
        })
      }

        //Get the Deletebtn value
        var myDlt = document.getElementsByClassName("deletebutton");
        for (let i = 0; i <= myDlt.length; i++) {
          // console.log(myDlt[i].value);
          myDlt[i].addEventListener('click', function mydata(){
            console.log(objectdata[i].GiverFirstName +" "+ objectdata[i].GiverSecondName+" " + objectdata[i].Title +" "+ objectdata[i].RefRecordingID);
            deleteData(
              objectdata[i].RefRecordingID,
              
            );         
            
          })
        }

        

      deleteEvent();

    });

   

    
}






//Copy elements function
var fname, lname, title, refRecordingID;

function copydata(GiverFirstName, GiverSecondName, Title, ID) {
  fname = GiverFirstName;
  lname = GiverSecondName;
  title = Title;
  refRecordingID = ID;
  console.log(refRecordingID, ID)

  // deleteData(refRecordingID);
  // all data get in local veriable
  var mycopydata =
    "RecordedBy " + fname + " " + lname +" " +title +" " + "https://ignatiuz.webtalkx.com#/I2Breview/2r9QUFD/" +
    refRecordingID;
  console.log(mycopydata);

  var textarea = document.createElement("textarea");
  textarea.value = mycopydata;
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  navigator.clipboard.writeText(mycopydata);
  document.body.removeChild(textarea);
}

var copybtn = document.querySelector("#copybtn");
var GiverFirstName, GiverSecondName, Title;
copybtn.addEventListener("click",
  copydata(GiverFirstName, GiverSecondName, Title)
);








deleteEvent();
var indexData;
//Adding handler on the delete button
function deleteEvent(){
  var delete_btn = document.getElementsByClassName('deletebutton');
  console.log(delete_btn);
  if(delete_btn && delete_btn.length >= 0) {
    var btn_len = delete_btn.length;
    for(let i = 0; i < btn_len; i++) {
      console.log("delete btn", delete_btn[i]);
      if(delete_btn[i]) {
        delete_btn[i].addEventListener('click', function(){
          //getting index object of the particular button
          if(allTableData[i]){
            indexData=allTableData[i];
            console.log(indexData);
          } 
         
        });
      }
    }
  }
}
  
 
// function to delete table data via delete api
  function deleteData(RefRecordingID) {
    
    fetch("https://ignatiuz.webtalkx.com/api/I2BRecordingRequest/DeleteRecordingRequest",
      {
        method: 'PUT',
        body: JSON.stringify( {
          RefRecordingID: refRecordingID,
        },
          
        ),
        headers: { "Content-type": "application/json" }
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
      }).then((data) => {
        // console.log(data.ResponseStatus);
        if(data[0].ResponseStatus == 'Success')
        {
          mydata();
        }
      })
    
  }



 














































