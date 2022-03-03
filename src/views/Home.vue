<template>
  <div>
    <img
      :src="require(`@/assets/img/itsch.jpg`)"
      hidden
      id="imag"
      alt="logo itsch"
    />
    <Datos
      @pdfSolicitud="PDFSolicitud"
      @pdfFormatoNoAdeudos="PDFFormatoNoAdeudos"
    />
  </div>
</template>

<script>
import Datos from "../components/Datos";
import PDFVisor from "../components/PDFVisor";

export default {
  name: "Home",

  components: {
    Datos,
    PDFVisor,
  },
  data() {
    return {
      srcPDF1: "",
      srcPDF2: "",
    };
  },

  methods: {
    PDFSolicitud(src) {
      //console.log(src);
      this.srcPDF1 = src;
    },

    PDFFormatoNoAdeudos(src) {
      //console.log(src);
      this.srcPDF2 = src;
    },
  },
};
</script>
