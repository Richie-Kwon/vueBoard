<template>
  <article>
    <div v-if="!isEditing" class="content">{{ article.content }}</div>
    <textarea v-else class="content" v-model="content"></textarea>
    <div class="created-at">
      {{ article.createdAt | moment("YYYY.MM.DD HH:mm:ss") }}
    </div>
    <button v-if = "!isEditing" @click="moveToArticle">Move</button>
    <button @click="toggleTextArea">
      {{ !isEditing ? "Edit" : "Cancel" }}
    </button>
    <button v-if="!isEditing" @click="deleteArticle">Delete</button>
    <button v-else @click="updateArticle">Edit!</button>
    <!-- <button @click="updateArticle">Delete</button> -->
  </article>
</template>
<script>
import axios from "axios";
export default { 
  props: {
    article: {
      default: {
        content: null,
        _id: null,
        createdAt: null,
      },
    },
  },
  data() {
    return { content: "", isEditing: false };
  },

  methods: {
    moveToArticle(){
        this.$router.push({
            name: "Article",
            params: {
                id: this.article._id
            }
        }) 
    },
    toggleTextArea() {
      this.content = this.article.content;
      this.isEditing = !this.isEditing;
    },
    async updateArticle() {
      const { data } = await axios.patch("http://localhost:3000/update", {
        id: this.article._id,
        content: this.content,
      });
      if (!data) return
      this.$emit("update", {id: this.article._id, content: this.content})
      this.isEditing =false
    },
    async deleteArticle() {
        const {data} = await axios.delete (`http://localhost:3000/delete/${this.article._id}`)
        if (!data) return
        this.$emit("delete", this.article._id)
    },
  },
};
</script>
<style>
article {
  padding: 1em;
  box-shadow: 0 3px 3px #22222222;
  margin-bottom: 1em;
  background-color: #fafafa;
}
</style>