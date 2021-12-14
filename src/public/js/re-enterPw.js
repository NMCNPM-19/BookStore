function checkPass() {
	
    pass1 = document.getElementById('password'),
    pass2 = document.getElementById('password2'),
    message = document.getElementById('confirmMessage'),
    colors = {
    goodColor: "#fff",
    goodColored: "#087a08",
    badColor: "#fff",
    badColored:"#ed0b0b"
    },
    strings = {
    "confirmMessage": ["Match", "Unmatch"]
    };
    
    if(password.value === password2.value && (password.value + password2.value) !== "") {
    password2.style.backgroundColor = colors["goodColor"];
    message.style.color = colors["goodColored"];
    message.innerHTML = strings["confirmMessage"][0];
    }
    else if(!(password2.value === "")) {
    password2.style.backgroundColor = colors["badColor"];
    message.style.color = colors["badColored"];
    message.innerHTML = strings["confirmMessage"][1];
    }
    else {
    message.innerHTML = "";	
    }
    
    }  