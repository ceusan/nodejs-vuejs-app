const API_URL = 'http://localhost:3000'
const LOGIN_URL = API_URL + '/api/user/login'
const SIGNUP_URL = API_URL + '/api/user/signup'
export default {

  user: {
    authenticated: false
  },

  // login(context, creds, redirect) {
  //   context.$http.post(LOGIN_URL, creds, (data) => {
  //     localStorage.setItem('token', data.token)
  //     this.user.authenticated = true
  //     if(redirect) {
  //       this.$router.go(redirect)        
  //     }

  //   }).catch((err) => {
  //     context.error = err
  //   })
  // },

  login(context, creds, redirect){
    context.$http.post(LOGIN_URL,{'email': creds.email, 'password': creds.password})
      .then(response => {
        if(response.data.success == false){
          context.$router.push('/login');
        }else{
          localStorage.setItem('token', response.data.token);
          this.user.authenticated = true;
          context.$router.push(redirect);
        }
        
      })
      .catch((error) => {
        console.log(error);
      })
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('token', data.id_token)

      this.user.authenticated = true

      if(redirect) {
        this.$router.go(redirect)        
      }

    }).error((err) => {
      context.error = err
    })
  },

  logout() {
    localStorage.removeItem('token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },


  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }
}