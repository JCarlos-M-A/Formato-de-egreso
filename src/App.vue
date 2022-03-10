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
    color: "#800000",
  }),
  methods: {
    //
    cambiarTema(val) {
      //console.log(val);
      if (val) {
        this.color = "#005";
      } else {
        this.color = "#800000";
      }
    },
  },

  computed: {
    //
  },
};
</script>
