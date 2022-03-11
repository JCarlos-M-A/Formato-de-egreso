<template>
  <v-alert
    style="position: fixed; margin-top: 6rem; top: 0; left: 0"
    dense
    width="100%"
    v-model="alertError"
    border="left"
    type="warning"
  >
    {{ textError }}
  </v-alert>
</template>

<script>
export default {
  props: {
    textError: String,
    alertError: Boolean,
  },

  data: () => ({
    //
  }),
  watch: {
    //
  },
};
</script>