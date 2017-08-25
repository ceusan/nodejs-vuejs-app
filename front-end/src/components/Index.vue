<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <h2> Index page </h2>

    </div>
  </div>
</template>

<script>
import auth from '../auth'
import Navbar from './navbar/Navbar'

export default {
  name: 'index',
  components:{
    'navbar': Navbar
  },
  data () {
    return {
      user: auth.user
    }
  },
  beforeMount(){
    if(!this.user.authenticated){
      this.$router.push('/login');
    }
    console.log(localStorage.getItem('token'))
  },
  methods: {
    logout(){
      auth.logout();
    }
  }

}
</script>