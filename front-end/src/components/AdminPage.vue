<template>
  <div>
    <h1> This is the admin page </h1>
    <p v-if="error">{{error}}</p>
    <div v-for="user in users">
        <p> {{user.username}} </p>
    </div>
  </div>
</template>

<script>
import auth from '../auth/index'

export default {
  name: 'index',
  data () {
    return {
        users : [],
        error: ''
    }
  },
  mounted(){
      this.$http.get('http://localhost:3000/api/user',{headers: auth.getAuthHeader()})
        .then(response => {
            users.push(response.data);
        })
        .catch((error) => {
            this.error = error
        })
  },
  route: {
      canActivate(){
          return auth.user.authenticated;
      }
  }

}
</script>