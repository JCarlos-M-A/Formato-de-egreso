<template>
  <v-app>
    <AppBar @cambiarTema="cambiarTema" />

    <v-main>
      <router-view :color="color"/>
    </v-main>

    <Footer :color="color" />
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
    color: "#9c1010",
  }),
  methods: {
    //
    cambiarTema(val) {
      //console.log(val);
      if (val) {
        this.color = "#11366a";
      } else {
        this.color = "#9c1010";
      }
    },
  },

  computed: {
    //
  },
};
</script>
