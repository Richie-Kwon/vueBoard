<template>
  <div>
    <h1>Create a new post</h1>
    <textarea v-model="content"></textarea>
    <div>
      <button @click="createArticle">Create!</button>
    </div>
    <h2>Article list</h2>

    <Card
      v-for="a in articles"
      :key="a._id"
      :article="a"
      @update="updateCard"
      @delete="deleteCard"
    />
  </div>
</template>
<script>
import axios from "axios";
import Card from "@/components/Card";
export default {
  components: {
    Card,
  },
  data() {
    return {
      content: "",
      articles: [],
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    deleteCard(id) {
      const idx = this.articles.findIndex((v) => v._id === id);
      if (idx > -1) {
        this.articles.splice(idx, 1)
      }
    },
    updateCard({ id, content }) {
      const idx = this.articles.findIndex((v) => v._id === id);
      if (idx > -1) {
        this.articles[idx].content = content;
      }
    },
    async getArticle() {
      const { data } = await axios.get("http://localhost:3000/read");
      this.articles = data;
    },

    async createArticle() {
      if (this.content.length === 0) {
        window.alert("Nothing in the box");
        return;
      }
      const { data } = await axios.post("http://localhost:3000/create", {
        content: this.content,
      });
      if (!data) {
        window.alert("Failure");
        return;
      }
      // window.alert("success!");
      this.articles.push(data);
      this.content = "";
    },
  },
};
</script>
<style>
</style>