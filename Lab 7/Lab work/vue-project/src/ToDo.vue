<template>
   <div>
    <h1>ToDoList</h1>
    <form @submit.prevent="handleSubmit">
        <label for="text">Comment box: </label>
            <input type="text" name="Comment box" v-model="Comment_box"/>
            <div v-show="submitted && !text">Text is required</div>
            <br /> <br /> <br />
            <button>Add a comment</button>
    </form>

   <div v-if="error">{{ error }}</div>

    <ul>
        <li v-for="(item, index) in todo_list" :key="index">
           {{item}}
        </li>
    </ul>

   </div>
</template>




<script>
export default {
    data(){
        return {
            Comment_box: "",
            todo_list : ["Husnain Ahmed"],
            submitted: false
        }
    },
    methods: {
        handleSubmit(e){
            this.submitted = true
            this.error = ""
            const {Comment_box} = this
            if(!{Comment_box}){
                return
            } else {
                this.todo_list.push(this.Comment_box);
            }
        }
    }
}
</script>