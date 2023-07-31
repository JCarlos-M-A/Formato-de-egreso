<template>
    <v-alert style="position: fixed; 
    margin-top: 6rem; top: 0; 
    left: 0" width="100%" v-model="alertaGeneral" border="left" :type="tipoAGeneral">
        {{ textoAGeneral }}
    </v-alert>
</template>
  
<script>
export default {
    props: {
        alertaGeneral: Boolean,
        textoAGeneral: String,
        tipoAGeneral: String
    },
};
</script>