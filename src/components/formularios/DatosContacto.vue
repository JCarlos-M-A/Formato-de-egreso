<template>
    <v-card class="mb-12 mt-16" flat>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" lg="5">
                <v-alert border="left" color="#88888810">
                    <v-form ref="form2" v-model="valid" lazy-validation>
                        <div class="d-flex">
                            <div style="width: 50%;">
                                <v-text-field v-model="correo" :rules="emailRules" label="Correo*" :color="color"
                                    required></v-text-field>
                            </div>
                            <div style="width: 50%;">
                                <v-text-field v-model="telefono" :rules="telRules" label="Telefono*" :color="color"
                                    maxlength="12" required></v-text-field>
                            </div>
                        </div>

                        <v-text-field v-model="direccion" :rules="requerido" label="Direccion*" :color="color"
                            required></v-text-field>

                        <div class="d-flex">
                            <div style="width: 50%;">
                                <v-text-field v-model="colonia" :rules="requerido" label="Colonia*" :color="color"
                                    required></v-text-field>
                            </div>
                            <div style="width: 50%;">
                                <v-text-field v-model="localidad" :rules="requerido" label="Localidad*" :color="color"
                                    required></v-text-field>
                            </div>
                        </div>

                        <v-text-field v-model="municipio" :rules="requerido" label="Municipio*" :color="color"
                            required></v-text-field>

                        <div class="d-flex">
                            <div style="width: 50%;">
                                <v-text-field v-model="estado" :rules="requerido" label="Estado*" :color="color"
                                    required></v-text-field>
                            </div>
                            <div style="width: 50%;">
                                <v-text-field v-model="cp" :rules="requerido" label="Codigo postal*" :color="color"
                                    required></v-text-field>
                            </div>
                        </div>
                    </v-form>
                </v-alert>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-card>
</template>
  
<script>
export default {
    name: 'DatosContacto',
    data() {
        return {
            //
            direccion: localStorage.getItem("direccion"),
            colonia: localStorage.getItem("colonia"),
            localidad: localStorage.getItem("localidad"),
            municipio: localStorage.getItem("municipio"),
            estado: localStorage.getItem("estado"),
            cp: localStorage.getItem("cp"),
            telefono: localStorage.getItem("telefono"),
            correo: localStorage.getItem("correo"),

            //Validacion
            requerido: [(v) => !!v || "Dato requerido"],

            valid: true,
            emailRules: [
                (v) => !!v || "Correo es requerido",
                (v) => /.+@.+\..+/.test(v) || "Correo no valido",
            ],
            telRules: [
                (v) => !!v || "Telefono es requerido",
                (v) =>
                    /[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{4}/.test(v) ||
                    "Telefono no valido",
            ],
        };
    },
    props: {
        color: String,
    },
    watch: {
        //Cada vez que la variable cambie, serán ejecutadas
        direccion(val) { localStorage.setItem("direccion", val); },
        colonia(val) { localStorage.setItem("colonia", val); },
        localidad(val) { localStorage.setItem("localidad", val); },
        municipio(val) { localStorage.setItem("municipio", val); },
        estado(val) { localStorage.setItem("estado", val); },
        cp(val) { localStorage.setItem("cp", val); },
        telefono(val) { localStorage.setItem("telefono", val); },
        correo(val) { localStorage.setItem("correo", val); },
    },
    methods: {
        datos() {
            return {
                direccion: this.direccion,
                colonia: this.colonia,
                localidad: this.localidad,
                municipio: this.municipio,
                estado: this.estado,
                cp: this.cp,
                telefono: this.telefono,
                correo: this.correo
            };
        }
    }
};
</script>