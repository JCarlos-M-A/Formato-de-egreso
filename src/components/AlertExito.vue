<template>
  <v-alert
    style="position: fixed; margin-top: 6rem; top: 0; left: 0"
    dense
    width="100%"
    v-model="alertExito"
    border="left"
    type="success"
  >
    {{ textExito }}
  </v-alert>
</template>

<script>
export default {
  props: {
    textExito: String,
    alertExito: Boolean,
  },

  data: () => ({
    //
  }),
  watch: {
    //
  },
};
</script>