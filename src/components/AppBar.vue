<template>
  <v-app-bar app :color="colorBarra" dark>
    <div class="d-flex align-center">
      <v-img
        alt="ITSCH Logo"
        class="shrink mr-2"
        contain
        :src="require(`@/assets/img/itsch.jpg`)"
        transition="scale-transition"
        width="40"
      />

      <!--<h1>ITSCH</h1>-->
    </div>

    <v-spacer></v-spacer>

    <v-switch
      v-model="switch1"
      inset
      label="Tema"
    ></v-switch>
  </v-app-bar>
</template>


<script>
export default {
  name: "AppBar",

  data: () => ({
    //
    colorBarra: "#800000",
    switch1: false,
  }),
  mounted() {
    //this.colorBarra = "#025";
  },
  watch: {
    switch1(val) {
      //
      if (this.switch1) {
        this.colorBarra = "#005";
      } else {
        this.colorBarra = "#800000";
      }
      this.$emit("cambiarTema", val);
    },
  },

};
</script>