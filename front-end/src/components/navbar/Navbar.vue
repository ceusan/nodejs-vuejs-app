<template>
    <div id="container">
        <div id="content">
          <a href="#" data-activates="slide-out" class="button-collapse hide-on-large-only"><i class="material-icons burger">menu</i></a>
            <div id="menu">
              <ul id="slide-out" class="side-nav fixed show-on-large-only">
                <div class="side-container">
                  <div>
                        <span> Welcome, </span><br>
                        <span style="font-weight: bold; font-size:1.2em"> Super User </span>
                  </div>
                </div>
                <li><a href="/"><i class="material-icons">home</i>Home</a></li>
                <li v-if="user.authenticated"><a href="#" v-on:click.prevent="logout()"><i class="material-icons">power_settings_new</i>Logout</a></li>
                <li class="no-padding">
                  <ul class="collapsible collapsible-accordion">
                    <li>
                      <a class="collapsible-header">Help</a>
                      <div class="collapsible-body">
                        <ul>
                          <li><span> Ask Chuck Norris. </span></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
    </div>

</template>

<script>

import auth from '../../auth'

export default {
  name: 'navbar',
  data () {
    return{
      user: auth.user
    }
  },
  methods: {
    logout(){
      auth.logout(this, '/login');
    }
  }
}

</script>