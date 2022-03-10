<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark :color="color">
          <v-toolbar-title>{{ tituloPDF }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="cerrar">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <iframe :src="srcPDF" height="1000px" width="100%"></iframe>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      //
      dialog: false,
    };
  },
  props: {
    srcPDF: {
      type: String,
      default: "",
    },
    dialogPDF: {
      type: Boolean,
      default: false,
    },
    tituloPDF: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "#800000",
    },
  },

  watch: {
    dialogPDF(val) {
      this.dialog = val;
    },
  },

  methods: {
    cerrar() {
      this.$emit("update-dialog", false);
    },
  },
};
</script>