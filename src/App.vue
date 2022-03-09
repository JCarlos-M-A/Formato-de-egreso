<template>
  <v-app>
    <AppBar @cambiarTema="cambiarTema" />

    <v-main>
      <router-view />
    </v-main>

    <Footer :color="colors" />
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    AppBar,
    Footer,
  },
  data: () => ({
    //
    color: "#800000",
  }),
  methods: {
    //
    cambiarTema(val) {
      console.log(val);
      if (this.val) {
        this.color = "#005";
        this.colors = "#005";
      } else {
        this.color = "#800000";
        this.colors = "#800000";
      }
    },
  },

  computed: {
    colors(val) {
      
      return "#800000";
    },
  },
};
</script>
