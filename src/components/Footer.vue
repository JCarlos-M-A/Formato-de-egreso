<template>
  <v-footer dark padless class="mt-6">
    <v-card class="flex" flat tile :color="color">
      <v-card-title>
        <strong class="subheading"> Redes sociales </strong>

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center negro">
        {{ new Date().getFullYear() }} —
        <strong>Todos los derechos reservados</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>


<script>
export default {
  name: "Footer",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
  props: {
    color: String,
  },
  watch: {
    //
  },
};
</script>
<style scoped>
.negro {
  background: #000;
  color: white;
}
</style>