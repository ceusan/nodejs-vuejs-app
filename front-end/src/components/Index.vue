<template>
  <div>
    {{user}}
    <div v-if="user.authenticated"><a @click="logout()">Logout</a></div>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  name: 'index',
  data () {
    return {
      user: auth.user
    }
  },
  methods: {
    logout(){
      auth.logout();
    }
  }

}
</script>