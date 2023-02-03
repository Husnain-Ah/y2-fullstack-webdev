
<template>
<!-- 
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
    <RouterView />
  </div> -->

    <div>
      <h1>{{welcome_message}}</h1>
      <p>Counter: {{counter}}</p>
      <button v-on:click="increment">Add One</button>

      <p v-if="counter >= 5">Big number</p>
      <p v-else>Little number</p>

      <Login />
      <toDo />
      <Comment/>
      <CommentList/>


    </div>
</template>

<script>
  import Login from "./Login.vue";
  import ToDo from "./ToDo.vue";
  import Comment from './Comment.vue';
  import CommentList from './CommentList.vue';

  export default {
    data(){
      return {
        welcome_message: "Hello World!",
        counter: 0
      }
    },
    methods: {
      increment(){
        this.counter ++;
      }
    },
    components: {
      Login,
      ToDo,
      Comment,
      CommentList
    }
  }
</script>

<style scoped>

</style>

