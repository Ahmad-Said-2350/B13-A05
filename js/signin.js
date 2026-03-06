 document.getElementById("signInBtn").addEventListener("click",() =>{

    const usernameInput = document.getElementById("username");
    const username = usernameInput.value;

    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;

    if(username === "admin" && password === "admin123"){
        window.location.assign("main.html")
    }
    else{
        alert("Invalid Input")
    }



 })
