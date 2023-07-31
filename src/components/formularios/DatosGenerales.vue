<template>
    <v-card class="mb-6" flat>
        <v-card-title>
            Ingresar datos generales del alumno
        </v-card-title>
        <v-row>
            <v-spacer></v-spacer>

            <v-col cols="12" lg="8">
                <v-alert border="left" color="#88888810">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="nombre" :rules="requerido" label="Nombre*" :color="color"
                            required></v-text-field>

                        <v-text-field v-model="noControl" :rules="requerido" label="N° control*" :color="color"
                            required></v-text-field>

                        <v-select :items="itemsCarrera" v-model="carrera" :rules="requerido" :color="color" label="Carrera*"
                            required></v-select>

                        <v-text-field v-model="clave" :rules="requerido" :color="color" label="Clave*"
                            required></v-text-field>

                        <div class="d-flex">
                            <div style="width: 50%;">
                                <v-select v-model="generacion" :items="itemsGeneracion"
                                    :rules="[(v) => !!v || 'Generacion requerida']" label="Generacion*" :color="color"
                                    required>
                                </v-select>
                            </div>
                            <div style="width: 50%;">
                                <v-select v-model="semestre" :items="itemsSemestre"
                                    :rules="[(v) => !!v || 'Semestre requerido']" label="Semestre*" :color="color" required>
                                </v-select>
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
    name: 'DatosGenerales',
    data() {
        return {
            //
            nombre: localStorage.getItem("nombre") ? localStorage.getItem("nombre") : "",
            noControl: localStorage.getItem("noControl") ? localStorage.getItem("noControl") : "",
            carrera: localStorage.getItem("carrera") ? localStorage.getItem("carrera") : "",
            clave: localStorage.getItem("clave") ? localStorage.getItem("clave") : "",
            generacion: localStorage.getItem("generacion") ? localStorage.getItem("generacion") : "",
            semestre: localStorage.getItem("semestre") ? localStorage.getItem("semestre") : "",
            //
            itemsCarrera: [
                "Ingenieria en sistemas computacionales",
                "Bioquimica",
                "Nanotecnologia",
                "Gestion empresarial",
                "Mecatrónica",
            ],
            itemsGeneracion: ["2014-2019", "2015-2020", "2016-2021"],
            itemsSemestre: ["febrero-junio 2022"],

            //Validacion
            requerido: [(v) => !!v || "Dato requerido"],
            valid: true,
        };
    },
    props: {
        color: String,
    },
    watch: {
        //Cada vez que la variable cambie, esta función será ejecutada
        nombre(val) { localStorage.setItem("nombre", val); },
        noControl(val) { localStorage.setItem("noControl", val); },
        carrera(val) { localStorage.setItem("carrera", val); },
        clave(val) { localStorage.setItem("clave", val); },
        generacion(val) { localStorage.setItem("generacion", val); },
        semestre(val) { localStorage.setItem("semestre", val); },
    },
    methods: {
        datos() {
            return {
                nombre: this.nombre,
                noControl: this.noControl,
                carrera: this.carrera,
                clave: this.clave,
                generacion: this.generacion,
                semestre: this.semestre
            };
        }
    }
};
</script>