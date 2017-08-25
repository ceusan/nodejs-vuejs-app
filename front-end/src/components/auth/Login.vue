<template>
  <div>
      <div class="container login">
          <div class="box">
              <div class="content">
                  <h1> Sign In </h1>
                  <form @submit.prevent="submit()">
                      <input type="email" name="email" placeholder="Enter email address" v-model="credentials.email" required/>
                      <input type="password" name="password" placeholder="Enter password" v-model="credentials.password" required />
                      <input type="submit" value="Sign in" class="btn waves-effect waves-light" />
                  </form>
              </div>
              <div class="footer">
                  <div v-if="loading == true" class="progress">
                      <div class="indeterminate"></div>
                  </div>
                  <div class="footer-bar"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import auth from '../../auth/index'

export default {

  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      error: '',
      loading: ''
    }
  },
  methods: {
    submit() {
      this.loading = true;
      var credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      }
      auth.login(this, credentials, '/')
      this.loading = false;
    }
  }
  
}
</script>