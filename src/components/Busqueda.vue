<template>
  <v-text-field
    style="margin-right: 2rem; margin-top: 1rem"
    outlined
    label="Busqueda"
    v-model="busqueda"
    prepend-inner-icon="mdi-magnify"
  >
  </v-text-field>
</template>

<script>
export default {
  props: {
    buscar: {
      type: String,
      default: "",
    },
  },
  watch: {
    busqueda(val) {
      this.$emit("update-buscar", val);
    },
    buscar() {
      this.busqueda = this.buscar;
    },
  },

  data: () => ({
    busqueda: "",
  }),
};
</script>