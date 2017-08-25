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
      this.$http.get('http://localhost:3000/api/user',{ headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNTk5OWE2NzE2ZjgxOWMyYTU5NGRjZDI0Iiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiX192IjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImFkbWluIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiZW1haWwiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJhZG1pbiI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwicGF0aHNUb1Njb3BlcyI6e30sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfX3YiOjAsImVtYWlsIjoiaG9yZGUuc3R5Z21hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFF1LkVoSFhmaUlWRUgxZHJDZmM0ZE9kNDFsN3Z6cml5cGpSUzUvRkZoOUNMZnhIbGhJN3lXIiwiYWRtaW4iOmZhbHNlLCJfaWQiOiI1OTk5YTY3MTZmODE5YzJhNTk0ZGNkMjQifSwiJGluaXQiOnRydWUsImlhdCI6MTUwMzY5NDU3OCwiZXhwIjoxNTAzNjk2MDE4fQ.Ci5T0E5U0pyRBgTWH9sY2k0K8UCW7jLqy3af3ksgDlo' } })
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