<template>
  <div>
    <Card :article="article" @update="updateCard" @delete = "moveToHome" />
  </div>
</template>
<script>
import axios from "axios";
import Card from "./Card"
export default {
  components:{
    Card
  },
  data() {
    return {
      article: {
        _id: null,
        content: null,
        createdAt: null,
      },
    };
  },
  created() {
    this.findOneArticle();
  },
  methods: {
    moveToHome(){
      this.$router.push({
        name: "Home"
      })
    },
    updateCard({ content }) {
      this.article.content = content;
      },
    
    async findOneArticle() {
      const articleId = this.$route.params.id;
      const { data } = await axios.get(
        `http://localhost:3000/read/${articleId}`
      );
      console.log(data);
      this.article = {
        ...data,
      };
    },
  }
}

</script>
<style >
</style>
