<template>
  <div>
    <img :src="require(`@/assets/img/itsch.jpg`)" hidden id="imag" alt="logo itsch" />
    <Datos :color="color" />
  </div>
</template>

<script>
import Datos from "../components/Datos";

export default {
  name: "Home",
  data() {
    return {
      //
    };
  },
  components: {
    Datos
  },
  props: {
    color: String,
  },
};
</script>
