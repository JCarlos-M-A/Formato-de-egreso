<template>
  <v-app-bar app :color="colorBarra" dark>
    <div class="d-flex align-center">
      <v-img
        alt="ITSCH Logo"
        class="shrink mr-2"
        contain
        :src="require(`@/assets/img/${logo}`)"
        transition="scale-transition"
        width="40"
      />

      <!--<h1>ITSCH</h1>-->
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex align-center">
      <v-switch
        hide-details
        v-model="switch1"
        id="switch"
        inset
        label="Tema"
      ></v-switch>
    </div>
  </v-app-bar>
</template>


<script>
export default {
  name: "AppBar",

  data: () => ({
    //
    colorBarra: "#9c1010",
    logo: "itsch.jpg",
    switch1: false,
  }),
  mounted() {
    if (localStorage.getItem("switch1") == "true") {
      //console.log(localStorage.getItem("switch1"));
      document.getElementById("switch").click();
    }
  },
  watch: {
    switch1(val) {
      //
      if (val) {
        this.colorBarra = "#11366a";
        this.logo = "tnm.jpg";
      } else {
        this.colorBarra = "#9c1010";
        this.logo = "itsch.jpg";
      }
      this.$emit("cambiarTema", val);
      //console.log(val);
      localStorage.setItem("switch1", val);
    },
  },
};
</script>