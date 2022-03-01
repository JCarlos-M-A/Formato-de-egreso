<template>
  <v-app>
    <v-app-bar
      app
      color="#800000"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="ITSCH Logo"
          class="shrink mr-2"
          contain
          :src="require(`@/assets/img/itsch.jpg`)"
          transition="scale-transition"
          width="40"
        />

        <h1>ITSCH</h1>
      </div>

      <v-spacer></v-spacer>


    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
