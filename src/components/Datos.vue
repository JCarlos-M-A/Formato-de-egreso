<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step
          :color="color"
          class="hoverManito"
          :complete="valid"
          @click="e1 = 1"
          step="1"
        >
          Datos.
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :color="color"
          :complete="valid2"
          @click="e1 = 2"
          class="hoverManito"
          step="2"
        >
          Contacto
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :color="color"
          :complete="valid3"
          @click="e1 = 3"
          class="hoverManito"
          step="3"
        >
          Datos proyecto
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :color="color"
          @click="e1 = 4"
          class="hoverManito"
          step="4"
        >
          Salida PDF
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mt-6" flat>
            <v-row>
              <v-col cols="12" md="6" lg="10">
                <v-text-field
                  outlined
                  label="N° de control"
                  v-model="noControlBuscar"
                  prepend-inner-icon="mdi-magnify"
                  :color="color"
                  @keyup.enter="buscar()"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" lg="2">
                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn
                    :color="color"
                    class="mt-4 ml-2"
                    dark
                    @click="buscar()"
                  >
                    Buscar
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="mb-12 mt-6" flat>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" lg="5">
                <v-alert border="left" color="#88888810">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="alumno"
                      :rules="requerido"
                      label="Nombre*"
                      :color="color"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="noControl"
                      :rules="requerido"
                      label="N° control*"
                      :color="color"
                      required
                    ></v-text-field>

                    <v-select
                      :items="itemsCarrera"
                      v-model="carrera"
                      :rules="requerido"
                      :color="color"
                      label="Carrera*"
                      required
                    ></v-select>

                    <v-text-field
                      v-model="clave"
                      :rules="requerido"
                      :color="color"
                      label="Clave*"
                      required
                    ></v-text-field>

                    <v-select
                      v-model="selectGeneracion"
                      :items="itemsGeneracion"
                      :rules="[(v) => !!v || 'Generacion requerida']"
                      label="Generacion*"
                      :color="color"
                      required
                    >
                    </v-select>
                    <v-select
                      v-model="selectSemestre"
                      :items="itemsSemestre"
                      :rules="[(v) => !!v || 'Semestre requerido']"
                      label="Semestre*"
                      :color="color"
                      required
                    >
                    </v-select>

                    <div class="text-center mt-2">
                      <v-btn :color="color" dark @click="draw"> Firma </v-btn>
                    </div>
                  </v-form>
                </v-alert>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>

          <v-btn :color="color" class="mb-10 mt-10" dark @click="e1 = 2">
            Siguiente
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" flat>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" lg="5">
                <v-alert border="left" color="#88888810">
                  <v-form ref="form2" v-model="valid2" lazy-validation>
                    <v-text-field
                      v-model="correo"
                      :rules="emailRules"
                      label="Correo*"
                      :color="color"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="direccion"
                      :rules="requerido"
                      label="Direccion*"
                      :color="color"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="colonia"
                      :rules="requerido"
                      label="Colonia*"
                      :color="color"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="localidad"
                      :rules="requerido"
                      label="Localidad*"
                      :color="color"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="municipio"
                      :rules="requerido"
                      label="Municipio*"
                      :color="color"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="estado"
                      :rules="requerido"
                      label="Estado*"
                      :color="color"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="cp"
                      :rules="requerido"
                      label="Codigo postal*"
                      :color="color"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="telefono"
                      :rules="telRules"
                      label="Telefono*"
                      :color="color"
                      maxlength="12"
                      required
                    ></v-text-field>
                  </v-form>
                </v-alert>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
          <v-btn color="red-grey" style="margin-bottom: 6rem" @click="e1 = 1">
            Anterior
          </v-btn>
          <v-divider vertical class="ml-2 mr-2"></v-divider>
          <v-btn
            :color="color"
            style="margin-bottom: 6rem"
            dark
            @click="e1 = 3"
          >
            Siguiente
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" flat>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" lg="5">
                <v-alert border="left" color="#88888810">
                  <v-form ref="form3" v-model="valid3" lazy-validation>
                    <v-text-field
                      v-model="nombreProyecto"
                      :rules="requerido"
                      label="Nombre del proyecto*"
                      :color="color"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="jefeCarrera"
                      :rules="requerido"
                      label="Jefe de carrera*"
                      :color="color"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="acesorInterno"
                      :rules="requerido"
                      label="Asesor interno*"
                      :color="color"
                      required
                    ></v-text-field>
                    <v-col>
                      <v-row>
                        <v-text-field
                          v-model="acesorExterno"
                          :rules="requerido"
                          label="Asesor externo*"
                          :color="color"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="puestoAsesorExterno"
                          :rules="requerido"
                          label="Puesto del asesor(a) externo(a)*"
                          :color="color"
                          required
                        ></v-text-field>
                      </v-row>
                    </v-col>
                    <v-text-field
                      v-model="nombreEmpresa"
                      :rules="requerido"
                      label="Nombre de la empresa*"
                      :color="color"
                      required
                    ></v-text-field>
                    <v-col>
                      <v-row>
                        <v-text-field
                          v-model="giroEmpresa"
                          :rules="requerido"
                          label="Giro, Ramo o Sector:*"
                          :color="color"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="rfcEmpresa"
                          :rules="requerido"
                          label="R.F.C.:*"
                          :color="color"
                          required
                        ></v-text-field>
                      </v-row>
                    </v-col>
                    <v-text-field
                      v-model="domicilioEmpresa"
                      :rules="requerido"
                      label="Domicilio de la empresa:*"
                      :color="color"
                      required
                    ></v-text-field>
                    <v-col>
                      <v-row>
                        <v-text-field
                          v-model="coloniaEmpresa"
                          :rules="requerido"
                          label="Colonia:*"
                          :color="color"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="cpEmpresa"
                          :rules="requerido"
                          label="C.P.:*"
                          :color="color"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="faxEmpresa"
                          :rules="requerido"
                          label="Fax:*"
                          :color="color"
                          required
                        ></v-text-field>
                      </v-row>
                    </v-col>
                    <v-text-field
                      v-model="ciudadEmpresa"
                      :rules="requerido"
                      label="Ciudad:*"
                      :color="color"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="misionEmpresa"
                      :rules="requerido"
                      label="Misión de la Empresa:*"
                      :color="color"
                      required
                    ></v-text-field>
                    <v-col>
                      <v-row>
                        <v-text-field
                          v-model="titularEmpresa"
                          :rules="requerido"
                          label="Nombre del Titular de la empresa:*"
                          :color="color"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="puestoTitularEmpresa"
                          :rules="requerido"
                          label="Puesto del Titular de la empresa:*"
                          :color="color"
                          required
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-form>
                </v-alert>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
          <v-btn color="red-grey" style="margin-bottom: 6rem" @click="e1 = 2">
            Anterior
          </v-btn>
          <v-divider vertical class="ml-2 mr-2"></v-divider>
          <v-btn
            :color="color"
            style="margin-bottom: 6rem"
            dark
            @click="e1 = 4"
          >
            Siguiente
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-expansion-panels accordion>
            <v-expansion-panel
              style="background-color: #ccc"
              v-for="item in itemsTabla"
              :key="item.categoria"
            >
              <v-expansion-panel-header>
                <h4>{{ item.categoria }}</h4>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list subheader two-line class="pb-0">
                  <v-list-item
                    class="colorPanel"
                    v-for="contenido in item.contenidos"
                    :key="contenido.id"
                    style="
                      border-top: 1px solid #000;
                      border-bottom: 1px solid #000;
                      margin-top: -1px;
                    "
                  >
                    <v-list-item-content>
                      {{ contenido.nombre }}
                    </v-list-item-content>

                    <v-list-item-action style="display: flex">
                      <v-btn icon @click="descargar(contenido.nombre)">
                        <v-icon x-large :color="color"
                          >mdi-cloud-download-outline</v-icon
                        >
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
            <v-btn color="red-grey" class="mr-2" @click="e1 = 3">
              Anterior
            </v-btn>
            <v-btn :color="color" class="ml-2" dark @click="e1 = 4">
              Enviar
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-dialog v-model="dialogFirma" fullscreen hide-overlay>
      <v-toolbar dark :color="color">
        <v-toolbar-title>Firma</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon dark @click="dialogFirma = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card>
        <canvas
          id="firmaCanvas"
          style="background-color: rgb(113, 128, 212)"
        ></canvas>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="danger"
            text
            class="mr-2"
            @click="
              contextCan.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
            "
          >
            Borrar
          </v-btn>
          <v-btn color="primary" text @click="guardaFirma"> Aceptar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!---->
    <PDFVisor
      :srcPDF="srcPDF"
      :dialogPDF="dialog"
      :tituloPDF="tituloPDF"
      :color="color"
      @update-dialog="update"
    />
    <!---->
    <AlertError :textError="textError" :alertError="alertError" />
    <AlertExito :textExito="textExito" :alertExito="alertExito" />
  </div>
</template>

<script>
import PDFVisor from "../components/PDFVisor";
import AlertError from "../components/AlertError";
import AlertExito from "../components/AlertExito";
import { generarSolicitudEgreso } from "../modules/generarSolicitudEgreso.js";
import { generarSolicitudEstudiante } from "../modules/generarSolicitudEstudiante.js";
import { generarCartaAutorizacion } from "../modules/generarCartaAutorizacion.js";
import { generarFormatoNoAdeudos } from "../modules/generarFormatoNoAdeudos.js";
import { generarCronograma } from "../modules/generarCronograma.js";
import { generarSolicitudResidencias } from "../modules/generarSolicitudResidencias.js";
import axios from "axios";

export default {
  components: {
    PDFVisor,
    AlertError,
    AlertExito,
  },
  data() {
    return {
      //Alerta error
      textError: "",
      alertError: false,

      //Alerta exito
      textExito: "",
      alertExito: false,

      //DATOS PDF
      srcPDF: "",
      dialog: false,
      tituloPDF: "",

      e1: 1,

      //Search
      noControlBuscar: "",

      //datos generales
      alumno: localStorage.getItem("alumno"),
      noControl: localStorage.getItem("noControl"),
      carrera: localStorage.getItem("carrera"),
      itemsCarrera: [
        "Ingenieria en sistemas computacionales",
        "Bioquimica",
        "Nanotecnologia",
        "Gestion empresarial",
        "Mecatrónica",
      ],
      clave: localStorage.getItem("clave"),
      selectGeneracion: localStorage.getItem("selectGeneracion"),
      selectSemestre: localStorage.getItem("selectSemestre"),
      itemsSemestre: ["febrero-junio 2022"],
      itemsGeneracion: ["2014-2019", "2015-2020", "2016-2021"],
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

      //Direccion
      direccion: localStorage.getItem("direccion"),
      colonia: localStorage.getItem("colonia"),
      localidad: localStorage.getItem("localidad"),
      municipio: localStorage.getItem("municipio"),
      estado: localStorage.getItem("estado"),
      cp: localStorage.getItem("cp"),
      telefono: localStorage.getItem("telefono"),
      correo: localStorage.getItem("correo"),

      //Proyecto
      nombreProyecto: localStorage.getItem("nombreProyecto"),
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
      valid: true,
      valid2: true,
      valid3: true,
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
      requerido: [(v) => !!v || "Dato requerido"],

      //Tabla
      itemsTabla: [
        {
          categoria: "Formatos de egreso",
          contenidos: [
            { nombre: "Solicitud de egreso" },
            { nombre: "Formato de no adeudos" },
          ],
        },
        {
          categoria: "Formatos de titulación",
          contenidos: [{ nombre: "Solicitud del estudiante" }],
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
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Acciones", value: "acciones" },
      ],

      //firma
      mainCanvas: "",
      mainCanvas64: "",
      contextCan: "",
      dialogFirma: false,
    };
  },

  props: {
    color: String,
  },
  mounted() {
    //
    this.draw();
    setTimeout(() => {
      this.dialogFirma = false;
    }, 1);
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

    guardaFirma() {
      this.mainCanvas64 = this.mainCanvas.toDataURL();
      this.dialogFirma = false;
    },

    generar() {
      if (this.$refs.form.validate()) {
        this.e1 = 4;
      }
    },

    ver(nombre) {
      switch (nombre) {
        case "Solicitud de egreso":
          this.srcPDF = generarSolicitudEgreso(
            true,
            this.meses,
            this.alumno,
            this.carrera,
            this.clave,
            this.selectSemestre,
            this.selectGeneracion,
            this.direccion,
            this.colonia,
            this.localidad,
            this.municipio,
            this.estado,
            this.cp,
            this.telefono,
            this.correo
          );
          this.dialog = true;
          this.tituloPDF = "Solicitud de egreso";
          break;
        case "Formato de no adeudos":
          this.srcPDF = generarFormatoNoAdeudos(
            true,
            this.alumno,
            this.noControl,
            this.carrera,
            this.selectGeneracion,
            this.municipio,
            this.estado,
            this.meses
          );
          this.dialog = true;
          this.tituloPDF = "Solicitud del estudiante";
          break;
        case "Solicitud del estudiante":
          this.srcPDF = generarSolicitudEstudiante(
            true,
            this.jefeCarrera,
            this.alumno,
            this.carrera,
            this.noControl,
            this.selectSemestre,
            this.selectGeneracion,
            this.direccion,
            this.colonia,
            this.localidad,
            this.municipio,
            this.estado,
            this.cp,
            this.telefono,
            this.correo
          );
          this.dialog = true;
          this.tituloPDF = "Solicitud del estudiante";
          break;
        case "Carta de autorizacion":
          this.srcPDF = generarCartaAutorizacion(
            true,
            this.meses,
            this.jefeCarrera,
            this.carrera,
            this.alumno,
            this.noControl,
            this.nombreProyecto,
            this.acesorInterno
          );
          this.dialog = true;
          this.tituloPDF = "Carta de autorización";
          break;
        case "Cronograma":
          this.srcPDF = generarCronograma(
            true,
            this.carrera,
            this.alumno,
            this.noControl,
            this.nombreEmpresa,
            this.acesorExterno,
            this.acesorInterno,
            this.nombreProyecto
          );
          this.dialog = true;
          this.tituloPDF = "Cronograma";
          break;
        case "Solicitud de recidencias":
          this.srcPDF = generarSolicitudResidencias(
            true,
            this.meses,
            this.jefeCarrera,
            this.carrera,
            this.nombreProyecto,
            this.nombreEmpresa,
            this.giroEmpresa,
            this.rfcEmpresa,
            this.domicilioEmpresa,
            this.cpEmpresa,
            this.faxEmpresa,
            this.coloniaEmpresa,
            this.telefonoEmpresa,
            this.ciudadEmpresa,
            this.misionEmpresa,
            this.titularEmpresa,
            this.puestoTitularEmpresa,
            this.acesorExterno,
            this.puestoAsesorExterno,
            this.alumno,
            this.noControl,
            this.direccion,
            this.correo,
            this.localidad
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
        case "Solicitud de egreso":
          let resultado = new generarSolicitudEgreso(
            false,
            this.meses,
            this.alumno,
            this.carrera,
            this.clave,
            this.selectSemestre,
            this.selectGeneracion,
            this.direccion,
            this.colonia,
            this.localidad,
            this.municipio,
            this.estado,
            this.cp,
            this.telefono,
            this.correo
          );
          this.alertExito = resultado.alertExito;
          this.textExito = resultado.textExito;
          setTimeout(() => {
            this.alertExito = false;
          }, 2000);
          break;
        case "Formato de no adeudos":
          resultado = new generarFormatoNoAdeudos(
            false,
            this.alumno,
            this.noControl,
            this.carrera,
            this.selectGeneracion,
            this.municipio,
            this.estado,
            this.meses
          );
          this.alertExito = resultado.alertExito;
          this.textExito = resultado.textExito;
          setTimeout(() => {
            this.alertExito = false;
          }, 2000);
          break;
        case "Solicitud del estudiante":
          resultado = new generarSolicitudEstudiante(
            false,
            this.jefeCarrera,
            this.alumno,
            this.carrera,
            this.noControl,
            this.selectSemestre,
            this.selectGeneracion,
            this.direccion,
            this.colonia,
            this.localidad,
            this.municipio,
            this.estado,
            this.cp,
            this.telefono,
            this.correo
          );
          this.alertExito = resultado.alertExito;
          this.textExito = resultado.textExito;
          setTimeout(() => {
            this.alertExito = false;
          }, 2000);
          break;
        case "Carta de autorizacion":
          resultado = new generarCartaAutorizacion(
            false,
            this.meses,
            this.jefeCarrera,
            this.carrera,
            this.alumno,
            this.noControl,
            this.nombreProyecto,
            this.acesorInterno
          );
          this.alertExito = resultado.alertExito;
          this.textExito = resultado.textExito;
          setTimeout(() => {
            this.alertExito = false;
          }, 2000);
          break;
        case "Cronograma":
          resultado = new generarCronograma(
            false,
            this.carrera,
            this.alumno,
            this.noControl,
            this.nombreEmpresa,
            this.acesorExterno,
            this.acesorInterno,
            this.nombreProyecto
          );
          this.alertExito = resultado.alertExito;
          this.textExito = resultado.textExito;
          setTimeout(() => {
            this.alertExito = false;
          }, 2000);
          break;
        case "Solicitud de recidencias":
          resultado = new generarSolicitudResidencias(
            false,
            this.meses,
            this.jefeCarrera,
            this.carrera,
            this.nombreProyecto,
            this.nombreEmpresa,
            this.giroEmpresa,
            this.rfcEmpresa,
            this.domicilioEmpresa,
            this.cpEmpresa,
            this.faxEmpresa,
            this.coloniaEmpresa,
            this.telefonoEmpresa,
            this.ciudadEmpresa,
            this.misionEmpresa,
            this.titularEmpresa,
            this.puestoTitularEmpresa,
            this.acesorExterno,
            this.puestoAsesorExterno,
            this.alumno,
            this.noControl,
            this.direccion,
            this.correo,
            this.localidad
          );
          this.alertExito = resultado.alertExito;
          this.textExito = resultado.textExito;
          setTimeout(() => {
            this.alertExito = false;
          }, 2000);
          break;

        default:
          break;
      }
    },

    update(dialog) {
      this.dialog = dialog;
    },

    getBase64(img) {
      // Create canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      // Set width and height
      canvas.width = img.width;
      canvas.height = img.height;
      // Draw the image
      ctx.drawImage(img, 0, 0);

      return canvas.toDataURL("img/itsch.jpg");
    },

    buscar() {
      //
      axios
        .get("/alumno/alumnoNoControl?noControl=" + this.noControlBuscar)
        .then((response) => {
          //console.log(response.data);
          this.alumno =
            response.data[0].nombre +
            response.data[0].apellidoP +
            response.data[0].apellidoM;
          this.noControl = response.data[0].noControl;
        })
        .catch((error) => {
          //console.log(error+"");
          this.alertError = true;
          this.textError = error + "";
          setTimeout(() => {
            this.alertError = false;
          }, 2000);
        });
    },
  },
  watch: {
    // cada vez que la variable cambie, esta función será ejecutada
    //Datos Generales
    alumno(val) {
      localStorage.setItem("alumno", val);
    },
    noControl(val) {
      localStorage.setItem("noControl", val);
    },
    carrera(val) {
      localStorage.setItem("carrera", val);
    },
    clave(val) {
      localStorage.setItem("clave", val);
    },
    selectGeneracion(val) {
      localStorage.setItem("selectGeneracion", val);
    },
    selectSemestre(val) {
      localStorage.setItem("selectSemestre", val);
    },

    mainCanvas64(val) {
      localStorage.setItem("mainCanvas64", val);
    },

    //Direccion
    direccion(val) {
      localStorage.setItem("direccion", val);
    },
    colonia(val) {
      localStorage.setItem("colonia", val);
    },
    localidad(val) {
      localStorage.setItem("localidad", val);
    },
    municipio(val) {
      localStorage.setItem("municipio", val);
    },
    estado(val) {
      localStorage.setItem("estado", val);
    },
    cp(val) {
      localStorage.setItem("cp", val);
    },

    telefono(val) {
      localStorage.setItem("telefono", val);
    },
    correo(val) {
      localStorage.setItem("correo", val);
    },

    //Proyecto
    nombreProyecto(val) {
      localStorage.setItem("nombreProyecto", val);
    },
    jefeCarrera(val) {
      localStorage.setItem("jefeCarrera", val);
    },
    acesorInterno(val) {
      localStorage.setItem("acesorInterno", val);
    },
    acesorExterno(val) {
      localStorage.setItem("acesorExterno", val);
    },
    puestoAsesorExterno(val) {
      localStorage.setItem("puestoAsesorExterno", val);
    },
    nombreEmpresa(val) {
      localStorage.setItem("nombreEmpresa", val);
    },
    giroEmpresa(val) {
      localStorage.setItem("giroEmpresa", val);
    },
    rfcEmpresa(val) {
      localStorage.setItem("rfcEmpresa", val);
    },
    domicilioEmpresa(val) {
      localStorage.setItem("domicilioEmpresa", val);
    },

    coloniaEmpresa(val) {
      localStorage.setItem("coloniaEmpresa", val);
    },
    cpEmpresa(val) {
      localStorage.setItem("cpEmpresa", val);
    },
    faxEmpresa(val) {
      localStorage.setItem("faxEmpresa", val);
    },
    telefonoEmpresa(val) {
      localStorage.setItem("telefonoEmpresa", val);
    },
    ciudadEmpresa(val) {
      localStorage.setItem("ciudadEmpresa", val);
    },
    misionEmpresa(val) {
      localStorage.setItem("misionEmpresa", val);
    },
    titularEmpresa(val) {
      localStorage.setItem("titularEmpresa", val);
    },
    puestoTitularEmpresa(val) {
      localStorage.setItem("puestoTitularEmpresa", val);
    },
  },
  computed: {
    //
  },
};
</script>

<style>
.hoverManito:hover {
  cursor: pointer !important;
}

.v-list-item--active {
  background: #888888;
}

.v-list-item--active .v-list-item__title {
  background: #888888;
  color: white;
}
.nms {
  border: #888888, 3px, solid;
}

.tabla {
  margin-left: 10% !important;
  margin-right: 10% !important;
  margin-bottom: 5% !important;
  margin-top: 5% !important;
}

.titulo {
  border-bottom: #002655 solid 2px !important;
}

.colorPanel {
  background-color: #ccc;
}
</style>