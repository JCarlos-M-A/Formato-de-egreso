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
      :color="color"
    />
    <!--<embed height="1000px" width="100%" :src="srcPDF2">-->
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
  props: {
    color: String,
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
      console.log(src);
      this.srcPDF2 = src;
    },
  },
};
</script>
