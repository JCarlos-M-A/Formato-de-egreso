<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile :color="color">
      <v-card-text class="py-2 white--text text-center negro">
        {{ new Date().getFullYear() }} —
        <strong>TecNM - Campus Ciudad Hidalgo</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>


<script>
export default {
  name: "Footer",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
  props: {
    color: String,
  },
  watch: {
    //
  },
};
</script>
<style scoped>
.negro {
  background: #393c3e;
  color: white;
}
</style>