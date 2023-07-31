<template>
  <div>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :color="color" class="hoverPointer" :complete="valid" @click="step = 1" step="1">
          Datos.
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :color="color" :complete="valid2" @click="step = 2" class="hoverPointer" step="2">
          Contacto
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :color="color" :complete="valid3" @click="step = 3" class="hoverPointer" step="3">
          Datos proyecto
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :color="color" @click="step = 4" class="hoverPointer" step="4">
          Salida PDF
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <!-- By numero de control -->
          <Busqueda :color="color" @resultBusqueda="resultBusqueda" />
          <!-- Datos generales componente -->
          <DatosGenerales :color="color" ref="datosGenerales" />

          <v-btn :color="color" class="mb-10" dark @click="step = 2">
            Siguiente
          </v-btn>
        </v-stepper-content>

        <v-stepper-content style="margin-bottom: 4rem;" step="2">
          <!-- DatosContacto -->
          <DatosContacto :color="color" ref="datosContacto" />

          <v-btn color="red-grey" class="mb-10 mr-5" @click="step = 1">
            Anterior
          </v-btn>
          <v-btn :color="color" class="mb-10" dark @click="step = 3">
            Siguiente
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">

          <!-- datos del proyecto -->
          <DatosProyecto :color="color" ref="datosProyecto" />

          <v-btn color="red-grey" style="margin-bottom: 6rem" @click="step = 2">
            Anterior
          </v-btn>
          <v-divider vertical class="ml-2 mr-2"></v-divider>
          <v-btn :color="color" style="margin-bottom: 6rem" dark @click="step = 4">
            Siguiente
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-expansion-panels accordion>
            <v-expansion-panel style="background-color: #ccc" v-for="item in itemsPanel" :key="item.categoria">
              <v-expansion-panel-header>
                <h4>{{ item.categoria }}</h4>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list subheader two-line class="pb-0">
                  <v-list-item class="colorPanel" v-for="contenido in item.contenidos" :key="contenido.id" style="
                      border-top: 1px solid #000;
                      border-bottom: 1px solid #000;
                      margin-top: -1px;
                    ">
                    <v-list-item-content>
                      {{ contenido.nombre }}
                    </v-list-item-content>

                    <v-list-item-action style="display: flex">
                      <v-btn icon @click="descargar(contenido.nombre)">
                        <v-icon x-large :color="color">mdi-cloud-download-outline</v-icon>
                      </v-btn>
                    </v-list-item-action>
                    <v-list-item-action style="display: flex">
                      <v-btn icon @click="ver(contenido.nombre)">
                        <v-icon x-large :color="color">mdi-eye-outline</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <div class="mt-4 mb-4 d-flex">
            <v-btn color="red-grey" class="mr-2" @click="step = 3">
              Anterior
            </v-btn>
            <v-btn :color="color" class="ml-2" dark @click="step = 4">
              Enviar
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <!---->
    <PDFVisor :srcPDF="srcPDF" :dialogPDF="dialog" :tituloPDF="tituloPDF" :color="color" @update-dialog="update" />
    <AlertaGeneral :textoAGeneral="textoAGeneral" :alertaGeneral="alertaGeneral" :tipoAGeneral="tipoAGeneral" />

  </div>
</template>

<script>
//Documentos Egreso
import { genFSolicitudEgreso } from "../modules/FEgresos/01-FSolicitudEgreso";

//Documentos Titulacion
import { genFSolicitudEstudiante } from "../modules/FTitulacion/01-FSolicitudEstudiante";
import { genFRegistroProyecto } from "../modules/FTitulacion/02-FRegistroProyecto.js"
import { genFLiberacionProyectoTitulacionIntegral } from "../modules/FTitulacion/03-FLiberacionProyectoTitulacionIntegral"
import { genFPortadaEmpastadoDocummentoTitulacion } from "../modules/FTitulacion/04-FPortadaEmpastadoDocumentoTitulación"
import { genFNoAdeudos } from "../modules/FTitulacion/06-FNoAdeudos"
import { genFFirma } from "../modules/FTitulacion/07-FFirma"
import { genFSolicitudCedula } from "../modules/FTitulacion/08-FSolicitudCedula"

//Documentos Recidencias
import { genFCartaAutorizacion } from "../modules/FRecidencias/01-FCartaAutorizacion";
import { genFCronograma } from "../modules/FRecidencias/02-FCronograma";
import { genFSolicitudResidencias } from "../modules/FRecidencias/03-FSolicitudRecidencias";

import PDFVisor from "../components/PDFVisor";
import AlertaGeneral from "./AlertaGeneral";
import DatosGenerales from "../components/formularios/DatosGenerales";
import DatosContacto from "../components/formularios/DatosContacto";
import DatosProyecto from "../components/formularios/DatosProyecto";
import Busqueda from "./Busqueda.vue";

export default {
  components: {
    PDFVisor,
    AlertaGeneral,
    DatosGenerales,
    DatosContacto,
    DatosProyecto,
    Busqueda
  },
  data() {
    return {
      //Alerta general
      alertaGeneral: false,
      textoAGeneral: '',
      tipoAGeneral: 'error',

      //DATOS PDF
      srcPDF: "",
      dialog: false,
      tituloPDF: "",

      //variable step
      step: 1,
      valid: true,
      valid2: true,
      valid3: true,

      //Search
      noControlBuscar: "",

      //meses
      meses: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],

      //Tabla
      itemsPanel: [
        {
          categoria: "Formatos de egreso",
          contenidos: [
            { nombre: "Solicitud de egreso" },
            { nombre: "	Formato de registro de proyecto" },
          ],
        },
        {
          categoria: "Formatos de titulación",
          contenidos: [
            { nombre: "Solicitud del estudiante" },
            { nombre: "Formato de registro de proyecto" },
            { nombre: "Formato de liberación del proyecto para la Titulación integral" },
            { nombre: "Portada para empastado y documento de Titulación" },
            { nombre: "Portada para discos de Titulación" },
            { nombre: "Formato de no adeudos titulacion" },
            { nombre: "Formato de firma" },
            { nombre: "Solicitud de cedula" }
          ],
        },
        {
          categoria: "Formatos recidencias",
          contenidos: [
            { nombre: "Carta de autorizacion" },
            { nombre: "Cronograma" },
            { nombre: "Solicitud de recidencias" },
          ],
        },
      ],

      //firma
      mainCanvas64: "",
    };
  },

  props: {
    color: String,
  },
  mounted() {
    //
  },
  methods: {
    draw() {
      this.dialogFirma = true;
      setTimeout(() => {
        //Guardar el elemento y el contexto
        this.mainCanvas = document.getElementById("firmaCanvas");
        this.contextCan = this.mainCanvas.getContext("2d");

        //variables
        let paiting = false;

        this.mainCanvas.width = window.innerWidth;
        this.mainCanvas.height = window.innerHeight;

        const startPosition = (e) => {
          paiting = true;
          draw(e);
          console.log("inicio");
        };

        const finshPosition = () => {
          paiting = false;
          this.contextCan.beginPath();
          console.log("fin");
        };

        const draw = (e) => {
          if (!paiting) return;
          this.contextCan.lineWhidth = 4;
          this.contextCan.lineCap = "round";

          this.contextCan.lineTo(e.clientX, e.clientY);
          this.contextCan.stroke();
          this.contextCan.beginPath();
          this.contextCan.moveTo(e.clientX, e.clientY);
          console.log("draw");
        };

        /*
        // Eventos
        this.mainCanvas.addEventListener("mousedown", startPosition);
        this.mainCanvas.addEventListener("mouseup", finshPosition);
        this.mainCanvas.addEventListener("mousemove", draw);

        // Eventos pantallas táctiles
        this.mainCanvas.addEventListener("touchstart", startPosition);
        this.mainCanvas.addEventListener("touchend", finshPosition);
        this.mainCanvas.addEventListener("touchmove", draw);
        */

        this.mainCanvas.onpointerdown = startPosition;
        this.mainCanvas.onpointerup = finshPosition;
        this.mainCanvas.onpointermove = draw;
      }, 250);
    },

    //metodo que emite el componente de busqueda
    resultBusqueda(res) {
      console.log(res)
    },

    ver(nombre) {
      switch (nombre) {
        //Formatos egresos
        case "Solicitud de egreso":
          this.srcPDF = genFSolicitudEgreso(
            true,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.meses
          );
          this.dialog = true;
          this.tituloPDF = "Solicitud de egreso";
          break;
        //Formatos de titulacion
        case "Solicitud del estudiante":
          this.srcPDF = genFSolicitudEstudiante(
            true,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.$refs.datosProyecto.datos(),
          );
          this.dialog = true;
          this.tituloPDF = "Solicitud del estudiante";
          break;
        case "Formato de registro de proyecto":
          this.srcPDF = genFRegistroProyecto(
            true,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.$refs.datosProyecto.datos(),
          );
          this.dialog = true;
          this.tituloPDF = "Formato de registro de proyecto";
          break;
        case "Formato de liberación del proyecto para la Titulación integral":
          this.srcPDF = genFLiberacionProyectoTitulacionIntegral(
            true,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.$refs.datosProyecto.datos(),
          );
          this.dialog = true;
          this.tituloPDF = "Formato de liberación del proyecto para la Titulación integral";
          break;
        case "Portada para empastado y documento de Titulación":
          this.srcPDF = genFPortadaEmpastadoDocummentoTitulacion(
            true,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.$refs.datosProyecto.datos(),
          );
          this.dialog = true;
          this.tituloPDF = "Portada para empastado y documento de Titulación";
          break;
        case "Portada para discos de Titulación":
          this.srcPDF = genFPortadaDiscosTitulacion(
            true,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.meses
          );
          this.dialog = true;
          this.tituloPDF = "Portada para discos de Titulación";
          break;
        case "Formato de no adeudos":
          this.srcPDF = genFNoAdeudos(
            true,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.meses
          );
          this.dialog = true;
          this.tituloPDF = "Solicitud del estudiante";
          break;
        case "Formato de no adeudos titulacion":
          this.srcPDF = genFNoAdeudos(
            true,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.$refs.datosProyecto.datos(),
            this.meses
          );
          this.dialog = true;
          this.tituloPDF = "Formato de no adeudos";
          break;
        case "Formato de firma":
          this.srcPDF = genFFirma(
            true
          );
          this.dialog = true;
          this.tituloPDF = "Formato de firma";
          break;
        case "Solicitud de cedula":
          this.srcPDF = genFSolicitudCedula(
            true
          );
          this.dialog = true;
          this.tituloPDF = "Solicitud de cedula";
          break;
        //Formatos de recidencia
        case "Carta de autorizacion":
          this.srcPDF = genFCartaAutorizacion(
            true,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosProyecto.datos(),
            this.meses
          );
          this.dialog = true;
          this.tituloPDF = "Carta de autorización";
          break;
        case "Cronograma":
          this.srcPDF = genFCronograma(
            true,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosProyecto.datos()
          );
          this.dialog = true;
          this.tituloPDF = "Cronograma";
          break;
        case "Solicitud de recidencias":
          this.srcPDF = genFSolicitudResidencias(
            true,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.$refs.datosProyecto.datos(),
            this.meses
          );
          this.dialog = true;
          this.tituloPDF = "Solicitud de residencias";
          break;
        default:
          break;
      }
    },

    descargar(nombre) {
      switch (nombre) {
        //Formatos egresos
        case "Solicitud de egreso":
          let resultado = genFSolicitudEgreso(
            false,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.meses
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        //Formatos de titulacion
        case "Solicitud del estudiante":
        resultado = genFSolicitudEstudiante(
          false,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.$refs.datosProyecto.datos(),
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        case "Formato de registro de proyecto":
          resultado = genFRegistroProyecto(
            false,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.$refs.datosProyecto.datos(),
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        case "Formato de liberación del proyecto para la Titulación integral":
          resultado = genFLiberacionProyectoTitulacionIntegral(
            false,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.$refs.datosProyecto.datos(),
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        case "Portada para empastado y documento de Titulación":
          resultado = genFPortadaEmpastadoDocummentoTitulacion(
            false,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.$refs.datosProyecto.datos(),
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        case "Portada para discos de Titulación":
          resultado = genFPortadaDiscosTitulacion(
            false,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.meses
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        case "Formato de no adeudos":
          resultado = genFNoAdeudos(
            false,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.meses
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        case "Formato de no adeudos titulacion":
          resultado = genFNoAdeudos(
            false,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.$refs.datosProyecto.datos(),
            this.meses
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        case "Formato de firma":
          resultado = genFFirma(
            false
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        case "Solicitud de cedula":
          resultado = genFSolicitudCedula(
            false
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        //Formatos de recidencia
        case "Carta de autorizacion":
          resultado = genFCartaAutorizacion(
            false,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosProyecto.datos(),
            this.meses
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        case "Cronograma":
          resultado = genFCronograma(
            false,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosProyecto.datos()
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        case "Solicitud de recidencias":
          resultado = genFSolicitudResidencias(
            false,
            this.$refs.datosGenerales.datos(),
            this.$refs.datosContacto.datos(),
            this.$refs.datosProyecto.datos(),
            this.meses
          );
          this.alertaGeneral = resultado.alertExito;
          this.tipoAGeneral = 'success';
          this.textoAGeneral = resultado.textExito;
          setTimeout(() => {
            this.alertaGeneral = false;
          }, 2000);
          break;
        default:
          break;
      }
    },

    update(dialog) {
      this.dialog = dialog;
    },

    validDatosGenerales(datos) {
      let validacion = true;
      if (!datos.nombre) {
        validacion = false;
      }
      if (!datos.noControl) {
        validacion = false;
      }
      if (!datos.carrera) {
        validacion = false;
      }
      if (!datos.clave) {
        validacion = false;
      }
      if (!datos.generacion) {
        validacion = false;
      }
      if (!datos.semestre) {
        validacion = false;
      }

      return validacion;
    }
  },
  watch: {
    // cada vez que la variable cambie, esta función será ejecutada
    mainCanvas64(val) {
      localStorage.setItem("mainCanvas64", val);
    },
  }
};
</script>

<style>
.hoverPointer:hover {
  cursor: pointer !important;
}

.v-list-item--active {
  background: #888888;
}

.v-list-item--active .v-list-item__title {
  background: #888888;
  color: white;
}

.tabla {
  margin-left: 10% !important;
  margin-right: 10% !important;
  margin-bottom: 5% !important;
  margin-top: 5% !important;
}

.colorPanel {
  background-color: #ccc;
}
</style>