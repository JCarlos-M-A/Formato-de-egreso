<template>
  <v-app>
    <AppBar @cambiarTema="cambiarTema" />

    <v-main>
      <router-view :color="color" />
    </v-main>

    <Footer :color="color" />
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import Footer from "@/components/Footer.vue";
//import { Word } from "pdf-officegen";

import { SplashScreen } from "@capacitor/splash-screen";
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
      if (val) {
        this.color = "#11366a";
      } else {
        this.color = "#9c1010";
      }
    },
  },
  mounted() {
    // Hide the splash (you should do this on app launch)
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  },
};
</script>
