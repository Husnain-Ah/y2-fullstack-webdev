<template>
    <div>
        <h1>Comments</h1>
        <Comment v-for="(comment, index) in comments" :key="index"
        :comment_text="comment.comment_text"
        :author="comment.author"
        :date_published="comment.date_published"
        />
    </div>
</template>

<script>
import Comment from './Comment.vue';
export default{
    data() {
        return {
            comments : [
                {comment_text: "vue is bad", author: "husnain", date_published:"30/11/2022"},
                {comment_text: "vue bad", author: "husnain1", date_published:"30/11/2022"},
                {comment_text: "bad vue", author: "husnain2", date_published:"30/11/2022"}
            ]
        }
    },
    components: {
        Comment
    }
}
</script>