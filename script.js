var user_name = document.getElementById("user_name");

var myusername =  localStorage.getItem("name");
user_name.innerText = myusername;



function logoutpage(){
    localStorage.clear();
    window.open(
        "file:///E:/login%20page/login.html ", "_current"
    );
}