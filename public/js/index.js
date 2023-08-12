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

let dashboard = ()=>{
    location.href = "/dashboard"
}


