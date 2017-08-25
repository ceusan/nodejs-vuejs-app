<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/navbar/Navbar'

export default {
  name: 'app',
  components:{
    'navbar': Navbar
  }
}
</script>

