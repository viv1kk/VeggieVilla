let signupform = document.getElementById("signup-form")
let signinform = document.getElementById("signin-form")

let showSignup = ()=>{
    signinform.style.display = 'none'
    signupform.style.display = 'flex'
}

let showSignin = ()=>{
    signinform.style.display = 'flex'
    signupform.style.display = 'none'
}

let login = ()=>{
    // location.href = "/auth/login"
    const email = document.getElementById("signin-email").value
    const password = document.getElementById("signin-password").value
    const remember = document.getElementById("remember")

    const loginData = {
        email: email,
        password: password,
        remember: remember.checked?true:false 
    };
    
    axios.post('/auth/login', loginData, {
        headers: {
            'Content-Type': 'application/json',
          }
    })
        .then(response => {
            if(response.status == 201) // Login Successful
            {
                let token = response.data.token;
                location.assign("dashboard")
            }
        })
        .catch(error => {
            const status = error.response.status
            if(status == 404 ||status == 400 || status == 500)
            {
                $.notify(error.response.data.message, "error");
            }
        });
}


let signup = ()=>{
    // location.href = "/auth/login"
    const name = document.getElementById("signup-name").value
    const email = document.getElementById("signup-email").value
    const password = document.getElementById("signup-password").value
    const confirm_password = document.getElementById("signup-confirm-password").value

    const loginData = {
        name: name,
        email: email,
        password: password,
        confirm_password: confirm_password
    };
    
    axios.post('/auth/signup', loginData, {
        headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
            if(response.status == 201)
            {
                location.href = "/";
            }
        })
        .catch(error => {
            const status = error.response.status
            if(status == 401 ||status == 400 || status == 500)
            {
                $.notify(error.response.data.message, "error");
            }
        });
}
