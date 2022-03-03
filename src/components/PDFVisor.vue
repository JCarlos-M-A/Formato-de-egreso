<template>
  <v-card elevation="0" flat>
    <iframe :src="srcPDF" id="pdfVer" height="1000px" width="100%"></iframe>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      //
    };
  },
  props: {
    srcPDF: {
      type: String,
      default: "",
    },
  },
};
</script>