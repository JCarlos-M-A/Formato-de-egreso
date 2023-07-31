<template>
  <div class="d-flex justify-space-between mx-4 mt-2">
    <v-text-field outlined label="N° de control" v-model="busqueda" prepend-inner-icon="mdi-magnify" :color="color"
      @keyup.enter="buscar()">
    </v-text-field>
    <v-btn :color="color" class="ml-3 mt-2" dark @click="buscar()">
      Buscar
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    busqueda: "",
  }),
  props: {
    noControl: {
      type: String,
      default: "",
    },
    color: String,
  },
  methods: {
    buscar() {
      //
      axios
        .get("/alumno/alumnoNoControl?noControl=" + this.busqueda)
        .then((response) => {
          //console.log(response.data);
          //emite response
        })
        .catch((error) => {
          //emite error
        });
    },
  }
};
</script>