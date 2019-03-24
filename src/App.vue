   <template>
  <div id="app">

   <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app'
 

}


</script>

<style>
html {
  font-size: 20px;
}

body {
  margin:0;
  font-size:0.7rem;
}

#app{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    
}
</style>
