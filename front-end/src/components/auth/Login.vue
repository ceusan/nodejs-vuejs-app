<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <form @submit.prevent="submit()">
      <input type="text" placeholder="Enter email address" v-model="credentials.email" />
      <input type="text" placeholder="Enter password" v-model="credentials.password" />
      <input type="submit" value="Login" />
    </form>
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
      error: ''
    }
  },

  methods: {
    submit() {
      var credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      }
      auth.login(this, credentials, '/')
    }
  }
  
}
</script>