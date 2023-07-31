<template>
    <v-card class="mb-12" flat>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" lg="5">
                <v-alert border="left" color="#88888810">
                    <v-form ref="form3" v-model="valid" lazy-validation>
                        <v-text-field v-model="nombreProyecto" :rules="requerido" label="Nombre del proyecto*"
                            :color="color" required></v-text-field>

                        <v-text-field v-model="producto" :rules="requerido" label="Producto generado de la Titulación ejem: tesis profesional, tesina, etc.
                      *" :color="color" required></v-text-field>

                        <v-text-field v-model="jefeCarrera" :rules="requerido" label="Jefe de carrera*" :color="color"
                            required></v-text-field>
                        <v-text-field v-model="acesorInterno" :rules="requerido" label="Asesor interno*" :color="color"
                            required></v-text-field>
                        <v-col>
                            <v-row>
                                <v-text-field v-model="acesorExterno" :rules="requerido" label="Asesor externo*"
                                    :color="color" required></v-text-field>
                                <v-text-field v-model="puestoAsesorExterno" :rules="requerido"
                                    label="Puesto del asesor(a) externo(a)*" :color="color" required></v-text-field>
                            </v-row>
                        </v-col>
                        <v-text-field v-model="nombreEmpresa" :rules="requerido" label="Nombre de la empresa*"
                            :color="color" required></v-text-field>
                        <v-col>
                            <v-row>
                                <v-text-field v-model="giroEmpresa" :rules="requerido" label="Giro, Ramo o Sector:*"
                                    :color="color" required></v-text-field>
                                <v-text-field v-model="rfcEmpresa" :rules="requerido" label="R.F.C.:*" :color="color"
                                    required></v-text-field>
                            </v-row>
                        </v-col>
                        <v-text-field v-model="domicilioEmpresa" :rules="requerido" label="Domicilio de la empresa:*"
                            :color="color" required></v-text-field>
                        <v-col>
                            <v-row>
                                <v-text-field v-model="coloniaEmpresa" :rules="requerido" label="Colonia:*" :color="color"
                                    required></v-text-field>
                                <v-text-field v-model="cpEmpresa" :rules="requerido" label="C.P.:*" :color="color"
                                    required></v-text-field>
                                <v-text-field v-model="faxEmpresa" :rules="requerido" label="Fax:*" :color="color"
                                    required></v-text-field>
                            </v-row>
                        </v-col>
                        <v-text-field v-model="ciudadEmpresa" :rules="requerido" label="Ciudad:*" :color="color"
                            required></v-text-field>
                        <v-text-field v-model="misionEmpresa" :rules="requerido" label="Misión de la Empresa:*"
                            :color="color" required></v-text-field>
                        <v-col>
                            <v-row>
                                <v-text-field v-model="titularEmpresa" :rules="requerido"
                                    label="Nombre del Titular de la empresa:*" :color="color" required></v-text-field>
                                <v-text-field v-model="puestoTitularEmpresa" :rules="requerido"
                                    label="Puesto del Titular de la empresa:*" :color="color" required></v-text-field>
                            </v-row>
                        </v-col>
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
            nombreProyecto: localStorage.getItem("nombreProyecto") ? localStorage.getItem("nombreProyecto") :"",
            producto: localStorage.getItem("producto"),
            jefeCarrera: localStorage.getItem("jefeCarrera"),
            acesorInterno: localStorage.getItem("acesorInterno"),
            acesorExterno: localStorage.getItem("acesorExterno"),
            puestoAsesorExterno: localStorage.getItem("puestoAsesorExterno"),
            nombreEmpresa: localStorage.getItem("nombreEmpresa"),
            giroEmpresa: localStorage.getItem("giroEmpresa"),
            rfcEmpresa: localStorage.getItem("rfcEmpresa"),
            domicilioEmpresa: localStorage.getItem("domicilioEmpresa"),
            coloniaEmpresa: localStorage.getItem("coloniaEmpresa"),
            cpEmpresa: localStorage.getItem("cpEmpresa"),
            faxEmpresa: localStorage.getItem("faxEmpresa"),
            telefonoEmpresa: localStorage.getItem("telefonoEmpresa"),
            ciudadEmpresa: localStorage.getItem("ciudadEmpresa"),
            misionEmpresa: localStorage.getItem("misionEmpresa"),
            titularEmpresa: localStorage.getItem("titularEmpresa"),
            puestoTitularEmpresa: localStorage.getItem("puestoTitularEmpresa"),

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
        nombreProyecto(val) { localStorage.setItem("nombreProyecto", val); },
        producto(val) { localStorage.setItem("producto", val); },
        jefeCarrera(val) { localStorage.setItem("jefeCarrera", val); },
        acesorInterno(val) { localStorage.setItem("acesorInterno", val); },
        acesorExterno(val) { localStorage.setItem("acesorExterno", val); },
        puestoAsesorExterno(val) { localStorage.setItem("puestoAsesorExterno", val); },
        nombreEmpresa(val) { localStorage.setItem("nombreEmpresa", val); },
        giroEmpresa(val) { localStorage.setItem("giroEmpresa", val); },
        rfcEmpresa(val) { localStorage.setItem("rfcEmpresa", val); },
        domicilioEmpresa(val) { localStorage.setItem("domicilioEmpresa", val); },
        coloniaEmpresa(val) { localStorage.setItem("coloniaEmpresa", val); },
        cpEmpresa(val) { localStorage.setItem("cpEmpresa", val); },
        faxEmpresa(val) { localStorage.setItem("faxEmpresa", val); },
        telefonoEmpresa(val) { localStorage.setItem("telefonoEmpresa", val); },
        ciudadEmpresa(val) { localStorage.setItem("ciudadEmpresa", val); },
        misionEmpresa(val) { localStorage.setItem("misionEmpresa", val); },
        titularEmpresa(val) { localStorage.setItem("titularEmpresa", val); },
        puestoTitularEmpresa(val) { localStorage.setItem("puestoTitularEmpresa", val); },
    },
    methods: {
        datos() {
            return {
                nombreProyecto: this.nombreProyecto,
                producto: this.producto,
                jefeCarrera: this.jefeCarrera,
                acesorInterno: this.acesorInterno,
                acesorExterno: this.acesorExterno,
                puestoAsesorExterno: this.puestoAsesorExterno,
                nombreEmpresa: this.nombreEmpresa,
                giroEmpresa: this.giroEmpresa,
                rfcEmpresa: this.rfcEmpresa,
                domicilioEmpresa: this.domicilioEmpresa,
                coloniaEmpresa: this.coloniaEmpresa,
                cpEmpresa: this.cpEmpresa,
                faxEmpresa: this.faxEmpresa,
                telefonoEmpresa: this.telefonoEmpresa,
                ciudadEmpresa: this.ciudadEmpresa,
                misionEmpresa: this.misionEmpresa,
                titularEmpresa: this.titularEmpresa,
                puestoTitularEmpresa: this.puestoTitularEmpresa,
            };
        }
    }
};
</script>