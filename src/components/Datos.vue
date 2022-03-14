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
                    ></v-select
                  ></v-form>
                </v-alert>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card>
          <v-btn
            :color="color"
            style="margin-bottom: 6rem"
            dark
            @click="e1 = 2"
          >
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
          <v-card class="mb-12" flat>
            <v-container fluid>
              <v-data-table
                :headers="headers"
                :items="itemsTabla"
                item-key="nombre"
                group-by="categoriaorden"
                :items-per-page="-1"
                hide-default-header
                hide-default-footer
                :footer-props="{
                  'items-per-page-text': 'Elementos por pagina',
                  'items-per-page-all-text': 'Todos',
                  'page-text': '{0}-{1} de {2}',
                }"
                class="elevation-0 tabla"
              >
                <template
                  v-slot:[`group.header`]="{
                    group,
                    headers,
                    toggle,
                    isOpen,
                    items,
                  }"
                >
                  <th
                    :colspan="headers.length"
                    @click="toggle"
                    :data-open="isOpen"
                    style="background-color: white; cursor: pointer"
                  >
                    <v-col>
                      <v-row align="center">
                        <v-btn small icon :ref="group" :data-open="isOpen">
                          <v-icon dense>{{
                            isOpen ? "mdi-chevron-up" : "mdi-chevron-down"
                          }}</v-icon>
                        </v-btn>
                        <h3>{{ items[0].categoria }}</h3>
                      </v-row>
                    </v-col>
                  </th>
                </template>

                <template v-slot:[`item.acciones`]="{ item }">
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mx-2" @click="ver(item.nombre)">
                      <v-icon large> mdi-eye</v-icon>
                    </v-btn>

                    <v-btn icon class="mx-2" @click="descargar(item.nombre)">
                      <v-icon large> mdi-cloud-download</v-icon>
                    </v-btn>
                  </v-row>
                </template>
              </v-data-table>
            </v-container>
          </v-card>
          <v-btn color="red-grey" style="margin-bottom: 6rem" @click="e1 = 3">
            Anterior
          </v-btn>
          <v-divider vertical class="ml-2 mr-2"></v-divider>
          <v-btn
            :color="color"
            style="margin-bottom: 6rem"
            dark
            @click="e1 = 4"
          >
            Enviar
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
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
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import PDFVisor from "../components/PDFVisor";
import AlertError from "../components/AlertError";
import axios from "axios";

export default {
  components: {
    PDFVisor,
    AlertError,
  },
  data() {
    return {
      //Alerta error
      textError: "",
      alertError: false,

      //DATOS PDF
      srcPDF: "",
      dialog: false,
      tituloPDF: "",

      e1: 1,

      //Search
      noControlBuscar: "",
      //datos generales
      alumno: "",
      noControl: "",
      carrera: "Ingenieria en sistemas computacionales",
      itemsCarrera: [
        "Ingenieria en sistemas computacionales",
        "Bioquimica",
        "Nanotecnologia",
        "Gestion empresarial",
        "Mecatrónica",
      ],
      clave: "ISIC-2010-224",
      selectGeneracion: "2016-2021",
      selectSemestre: "febrero-junio 2022",
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
      direccion: "Andador de la mariposa apolo",
      colonia: "Villa natura",
      localidad: "Celaya",
      municipio: "Celaya",
      estado: "Guanajuato",
      cp: "38115",
      telefono: "447-108-5892",
      correo: "carlitosjl77@gmail.com",

      //Proyecto
      nombreProyecto: "asdasd ",
      jefeCarrera: "asdasd asd aasd",
      acesorInterno: "ssssssss sssss",
      acesorExterno: "pepe",
      puestoAsesorExterno: "asdd",
      nombreEmpresa: "Empresa",
      giroEmpresa: "giro",
      rfcEmpresa: "ASAS545454",
      domicilioEmpresa: "dasdasd",
      coloniaEmpresa: "asdasd",
      cpEmpresa: "454554",
      faxEmpresa: "454554",
      telefonoEmpresa: "000-000-0000",
      ciudadEmpresa: "dasdad",
      misionEmpresa: "sadad",
      titularEmpresa: "dasda",
      puestoTitularEmpresa: "asdasd",

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

      itemsTabla: [
        {
          nombre: "Solicitud de egreso",
          categoriaorden: 1,
          categoria: "Formatos de egreso",
        },
        {
          nombre: "Formato de no adeudos",
          categoriaorden: 1,
          categoria: "Formatos de egreso",
        },
        {
          nombre: "Carta de autorizacion",
          categoriaorden: 2,
          categoria: "Formatos recidencias",
        },
        {
          nombre: "Cronograma",
          categoriaorden: 2,
          categoria: "Formatos recidencias",
        },
        {
          nombre: "Solicitud de recidencias",
          categoriaorden: 2,
          categoria: "Formatos recidencias",
        },
      ],
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Acciones", value: "acciones" },
      ],
    };
  },

  props: {
    color: String,
  },

  methods: {
    generar() {
      if (this.$refs.form.validate()) {
        this.e1 = 4;
        //this.generarSolicitudEgreso();
        //this.generarFormatoNoAdeudos();
        //this.generarCartaAutorizacion();
        //doc.save("Solicitud de egreso.pdf");
        //document.getElementById("pdfVer").src = doc.output("datauristring");
      }
    },

    ver(nombre) {
      switch (nombre) {
        case "Solicitud de egreso":
          this.generarSolicitudEgreso(true);
          break;
        case "Formato de no adeudos":
          this.generarFormatoNoAdeudos(true);
          break;
        case "Carta de autorizacion":
          this.generarCartaAutorizacion(true);
          break;
        case "Cronograma":
          this.generarCronograma(true);
          break;
        case "Solicitud de recidencias":
          this.generarSolicitudResidencias(true);
          break;

        default:
          break;
      }
    },

    descargar(nombre) {
      switch (nombre) {
        case "Solicitud de egreso":
          this.generarSolicitudEgreso(false);
          break;
        case "Formato de no adeudos":
          this.generarFormatoNoAdeudos(false);
          break;
        case "Carta de autorizacion":
          this.generarCartaAutorizacion(false);
          break;
        case "Cronograma":
          this.generarCronograma(false);
          break;
        case "Solicitud de recidencias":
          this.generarSolicitudResidencias(false);
          break;

        default:
          break;
      }
    },

    generarSolicitudEgreso(accion) {
      // Default export is a4 paper, portrait, using millimeters for units
      const doc = new jsPDF();
      //get base64
      let itsch = this.getBase64(document.getElementById("imag"));
      //get fecha
      let date = new Date();

      doc.addImage(itsch, "jpeg", 30, 5, 20, 20);
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO", 50, 25);
      doc.setFontSize(14);
      doc.text("SOLICITUD DE EGRESO", 80, 38);
      doc.setFont(undefined, "normal");
      doc.text("Ciudad Hidalgo, Michoacán, a ", 75, 50);
      doc.text(date.getDate() + "", 145, 50);
      doc.text("___", 143, 50);
      doc.text(" de ", 152, 50);
      doc.text(this.meses[date.getMonth()] + "", 161, 50);
      doc.text("______", 161, 50);
      doc.text(" de ", 178, 50);
      doc.text(date.getFullYear() + "", 187, 50);
      doc.text("_____", 186, 50);

      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("ING. DANIEL AGUILAR ESPINO", 30, 63);
      doc.text("JEFE DEL DEPARTAMENTO DE SERVICIOS ESCOLARES", 30, 68);
      doc.text("DEL INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO", 30, 73);
      doc.setFont(undefined, "normal");
      doc.text("Por medio de la presente, el (la) que suscribe ", 30, 85);
      doc.text("___________________________", 116, 85);
      doc.text(this.alumno, 120, 85);
      doc.text("de la carrera de ", 30, 93);
      doc.text("_________________________________", 61, 93);
      doc.text(this.carrera, 63, 93);
      doc.text("con plan de estudios ", 142, 93);
      doc.text("clave ", 30, 101);
      doc.text("_____________", 41, 101);
      doc.text(this.clave, 42, 101);
      doc.text("solicita ante este departamento, darse por", 72, 101);
      doc.setFont(undefined, "bold");
      doc.text("EGRESADO(A)", 152, 101);
      doc.setFont(undefined, "normal");
      doc.text("al finalizar semestre ", 30, 109);
      doc.text("________________", 70, 109);
      doc.text(this.selectSemestre + ".", 72, 109);
      doc.text("Al firmar esta solicitud acepta en caso", 110, 109);
      doc.text(
        "de cubrir la totalidad de créditos por ningún motivo nuevamente solicitar reinscripción y de no cubrir la totalidad de los créditos se cancela esta solicitud y se solicita nuevamente reinscripción.",
        30,
        117,
        { maxWidth: 150, align: "justify", lineHeightFactor: 2 }
      );
      doc.text("A T E N T A M E N T E", 30, 155);
      doc.text(this.alumno, 35, 173);
      doc.text("__________________________", 30, 175);
      doc.text("Nombre y firma del alumno", 35, 180);
      doc.text("Generación " + this.selectGeneracion, 140, 200);
      doc.text("_________", 162, 200);
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("Domicilio del alumno:", 30, 215);
      doc.setFontSize(12);
      doc.setFont(undefined, "normal");
      doc.text("Dirección: " + this.direccion, 30, 220);
      doc.text(
        "_________________________________________________________",
        50,
        220
      );
      doc.text("Colonia: " + this.colonia, 30, 230);
      doc.text("___________________________", 47, 230);
      doc.text("Localidad: " + this.localidad, 120, 230);
      doc.text("___________________", 140, 230);
      doc.text("Municipio: " + this.municipio, 30, 240);
      doc.text("__________________________", 51, 240);
      doc.text("Estado: " + this.estado, 120, 240);
      doc.text("_____________________", 136, 240);
      doc.text("C.P.: " + this.cp, 30, 250);
      doc.text("______________", 41, 250);
      doc.text("Tel.: " + this.telefono, 75, 250);
      doc.text("____________", 85, 250);
      doc.text("Correo: " + this.correo, 120, 250);
      doc.text("_____________________", 136, 250);
      doc.text(
        "Autorizo al Instituto Tecnológico Superior de Ciudad Hidalgo, utilizar estos datos para localizarme posterior a mi egreso.",
        30,
        260,
        { maxWidth: 150, align: "justify" }
      );
      doc.text("ITSCH", 30, 280);
      doc.text("Julio 2017", 160, 280);

      if (accion) {
        this.srcPDF = doc.output("datauristring", "Solicitud de egreso.pdf");
        this.dialog = true;
        this.tituloPDF = "Solicitud de egreso";
      } else {
        doc.save("Solicitud de egreso.pdf");
      }
    },

    generarFormatoNoAdeudos(accion) {
      // Default export is a4 paper, portrait, using millimeters for units
      const doc = new jsPDF({ filename: "asdasdasdad.pdf" });
      //get base64
      let itsch = this.getBase64(document.getElementById("imag"));
      //get fecha
      let date = new Date();

      doc.addImage(itsch, "jpeg", 15, 5, 20, 20);
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO", 55, 18);
      doc.text("ALUMNOS PRÓXIMOS A EGRESAR", 80, 28);
      doc.text(
        "FORMATO DE NO ADEUDOS CON EL INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO",
        115,
        35,
        { maxWidth: 170, align: "center" }
      );
      doc.text("Nombre:", 25, 45);
      doc.text(this.alumno, 44, 45);
      doc.text("___________________________________", 43, 45);
      doc.text("No. Control:", 128, 45);
      doc.text(this.noControl, 154, 45);
      doc.text("____________", 153, 45);
      doc.text("Carrera:", 25, 50);
      doc.text(this.carrera, 44, 50);
      doc.text("___________________________________", 43, 50);
      doc.text("Generación:", 128, 50);
      doc.text(this.selectGeneracion, 154, 50);
      doc.text(" ____________ ", 152, 50);

      ///////////
      doc.rect(10, 55, 95, 35);
      doc.text("CENTRO DE INFORMACIÓN.", 30, 60);
      doc.setFontSize(7);
      doc.text("ANOTAR NOMBRE Y FIRMA EL RESPONSABLE DEL ÁREA.", 24, 63);
      doc.setFontSize(12);
      doc.text(this.alumno, 25, 80);
      doc.setFontSize(7);
      doc.text(
        "________________________________________________________",
        20,
        80
      );
      doc.setFontSize(10);
      doc.text("NOMBRE Y FIRMA", 40, 85);

      doc.rect(105, 55, 95, 35);
      doc.setFontSize(12);
      doc.text("JEFE DE CARRERA.", 132, 60);
      doc.setFontSize(7);
      doc.text("ANOTAR NOMBRE Y FIRMA EL RESPONSABLE DEL ÁREA.", 118, 63);
      doc.setFontSize(12);
      doc.text(this.alumno, 120, 80);
      doc.setFontSize(7);
      doc.text(
        "________________________________________________________",
        115,
        80
      );
      doc.setFontSize(10);
      doc.text("NOMBRE Y FIRMA", 140, 85);

      ///////////
      doc.rect(10, 90, 95, 35);
      doc.setFontSize(12);
      doc.text("LAB. DE CÓMPUTO.", 35, 95);
      doc.setFontSize(7);
      doc.text("ANOTAR NOMBRE Y FIRMA EL RESPONSABLE DEL ÁREA.", 24, 98);
      doc.setFontSize(12);
      doc.text(this.alumno, 25, 115);
      doc.setFontSize(7);
      doc.text(
        "________________________________________________________",
        20,
        115
      );
      doc.setFontSize(10);
      doc.text("NOMBRE Y FIRMA", 40, 120);

      doc.rect(105, 90, 95, 35);
      doc.setFontSize(12);
      doc.text("EXTRAESCOLARES.", 132, 95);
      doc.setFontSize(7);
      doc.text("ANOTAR NOMBRE Y FIRMA EL RESPONSABLE DEL ÁREA.", 118, 98);
      doc.setFontSize(12);
      doc.text(this.alumno, 120, 115);
      doc.setFontSize(7);
      doc.text(
        "________________________________________________________",
        115,
        115
      );
      doc.setFontSize(10);
      doc.text("NOMBRE Y FIRMA", 140, 120);

      ///////////
      doc.rect(10, 125, 95, 35);
      doc.setFontSize(12);
      doc.text("LAB. DE BIOQUÍMICA.", 35, 130);
      doc.setFontSize(7);
      doc.text("ANOTAR NOMBRE Y FIRMA EL RESPONSABLE DEL ÁREA.", 24, 133);
      doc.setFontSize(12);
      doc.text(this.alumno, 25, 150);
      doc.setFontSize(7);
      doc.text(
        "________________________________________________________",
        20,
        150
      );
      doc.setFontSize(10);
      doc.text("NOMBRE Y FIRMA", 40, 155);

      doc.rect(105, 125, 95, 35);
      doc.setFontSize(12);
      doc.text("COORD. LENGUAS EXTRANJERAS.", 117, 130);
      doc.setFontSize(7);
      doc.text("ANOTAR NOMBRE Y FIRMA EL RESPONSABLE DEL ÁREA.", 118, 133);
      doc.setFontSize(12);
      doc.text(this.alumno, 120, 150);
      doc.setFontSize(7);
      doc.text(
        "________________________________________________________",
        115,
        150
      );
      doc.setFontSize(10);
      doc.text("NOMBRE Y FIRMA", 140, 155);

      ///////////
      doc.rect(10, 160, 95, 35);
      doc.setFontSize(12);
      doc.text("LAB. DE MÉTODOS.", 35, 165);
      doc.setFontSize(7);
      doc.text("ANOTAR NOMBRE Y FIRMA EL RESPONSABLE DEL ÁREA.", 24, 168);
      doc.setFontSize(12);
      doc.text(this.alumno, 25, 185);
      doc.setFontSize(7);
      doc.text(
        "________________________________________________________",
        20,
        185
      );
      doc.setFontSize(10);
      doc.text("NOMBRE Y FIRMA", 40, 190);

      doc.rect(105, 160, 95, 35);
      doc.setFontSize(12);
      doc.text("LAB. DE ELECTRÓNICA", 132, 165);
      doc.setFontSize(7);
      doc.text("ANOTAR NOMBRE Y FIRMA EL RESPONSABLE DEL ÁREA.", 118, 168);
      doc.setFontSize(12);
      doc.text(this.alumno, 120, 185);
      doc.setFontSize(7);
      doc.text(
        "________________________________________________________",
        115,
        185
      );
      doc.setFontSize(10);
      doc.text("NOMBRE Y FIRMA", 140, 190);

      ///////////
      doc.rect(10, 195, 95, 35);
      doc.setFontSize(12);
      doc.text("DEPTO. DE TUTORIAS.", 35, 200);
      doc.setFontSize(7);
      doc.text("ANOTAR NOMBRE Y FIRMA EL RESPONSABLE DEL ÁREA.", 24, 203);
      doc.setFontSize(12);
      doc.text(this.alumno, 25, 220);
      doc.setFontSize(7);
      doc.text(
        "________________________________________________________",
        20,
        220
      );
      doc.setFontSize(10);
      doc.text("NOMBRE Y FIRMA", 40, 225);

      doc.rect(105, 195, 95, 35);
      doc.setFontSize(12);
      doc.text("SEGUIMIENTO A EGRESADOS.", 122, 200);
      doc.setFontSize(7);
      doc.text("ANOTAR NOMBRE Y FIRMA EL RESPONSABLE DEL ÁREA.", 118, 203);
      doc.setFontSize(12);
      doc.text(this.alumno, 120, 220);
      doc.setFontSize(7);
      doc.text(
        "________________________________________________________",
        115,
        220
      );
      doc.setFontSize(10);
      doc.text("NOMBRE Y FIRMA", 140, 225);
      ///////
      doc.rect(10, 230, 190, 35);
      doc.setFontSize(12);
      doc.text("SERVICIOS ESCOLARES.", 80, 235);
      doc.setFontSize(7);
      doc.text("ANOTAR NOMBRE Y FIRMA EL RESPONSABLE DEL ÁREA.", 70, 238);
      doc.setFontSize(12);
      doc.text(this.alumno, 75, 255);
      doc.setFontSize(7);
      doc.text(
        "_____________________________________________________________________________________________",
        40,
        255
      );
      doc.setFontSize(10);
      doc.text("NOMBRE Y FIRMA", 85, 260);
      ///
      doc.setFontSize(11);
      doc.text(
        "LUGAR Y FECHA __________________________ a _____de ______________del_______",
        30,
        275
      );

      doc.text(this.municipio + ", " + this.estado, 63, 275);
      doc.text(date.getDate() + "", 128, 275);
      doc.text(this.meses[date.getMonth()] + "", 142, 275);
      doc.text(date.getFullYear() + "", 178, 275);

      doc.text("ITSCH", 30, 285);
      doc.text("Septiembre 2019", 155, 285);

      if (accion) {
        this.srcPDF = doc.output("datauristring", "Formato de no adeudos.pdf");
        this.dialog = true;
        this.tituloPDF = "Formato de no adeudos";
      } else {
        doc.save("Formato de no adeudos.pdf");
      }
    },

    generarCartaAutorizacion(accion) {
      // Default export is a4 paper, portrait, using millimeters for units
      const doc = new jsPDF();
      //get base64
      let itsch = this.getBase64(document.getElementById("imag"));
      //get fecha
      let date = new Date();

      doc.addImage(itsch, "jpeg", 20, 15, 20, 20);
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO", 40, 35);
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.text(
        "Cd. Hidalgo, Michoacán, " +
          date.getDate() +
          "/" +
          this.meses[date.getMonth()] +
          "/" +
          date.getFullYear(),
        140,
        60
      );

      doc.setFont(undefined, "bold");
      doc.text("C.", 20, 80);
      doc.text(this.jefeCarrera, 23, 80);
      doc.text("___________________________________", 23, 80);

      doc.setFontSize(10);
      doc.text("JEFE(A) DE CARRERA DE INGENIERÍA", 20, 85);
      doc.text(this.carrera.toUpperCase(), 20, 90);
      const textWidth = doc.getTextWidth(this.carrera.toUpperCase());
      doc.line(20, 91, 20 + textWidth, 91);
      doc.text("  DEL ITSCH", 20 + textWidth, 90);
      doc.text("P R E S E N T E", 20, 95);

      ///////////
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.text(
        "Por medio del presente se le envía un caluroso saludo y aprovechando la oportunidad para informarle que el (la) alumno(a)",
        20,
        130
      );
      doc.text(this.alumno, 20, 133);
      const textWidth2 = doc.getTextWidth(this.alumno);
      doc.line(20, 134, 20 + textWidth2, 134);
      doc.text("con numero de control ", 20 + textWidth2, 133);
      const textWidth3 = doc.getTextWidth(" con numero de control ");
      doc.text(this.noControl, 20 + textWidth2 + textWidth3, 133);
      const textWidth4 = doc.getTextWidth(this.noControl);
      doc.line(
        20 + textWidth2 + textWidth3,
        134,
        20 + textWidth2 + textWidth3 + textWidth4,
        134
      );
      doc.text(
        " de la carrera de ",
        20 + textWidth2 + textWidth3 + textWidth4,
        133
      );
      const textWidth5 = doc.getTextWidth(" de la carrera de ");
      doc.text(
        this.carrera,
        20 + textWidth2 + textWidth3 + textWidth4 + textWidth5,
        133
      );
      const textWidth6 = doc.getTextWidth(this.carrera);
      doc.line(
        20 + textWidth2 + textWidth3 + textWidth4 + textWidth5,
        134,
        20 + textWidth2 + textWidth3 + textWidth4 + textWidth5 + textWidth6,
        134
      );

      doc.text("ha concluido su ", 20, 137);
      doc.setFont(undefined, "bold");
      const textWidth7 = doc.getTextWidth("ha concluido su ");
      doc.text("PROYECTO DE RESIDENCIAS ", 20 + textWidth7, 137);
      doc.setFont(undefined, "normal");
      const textWidth8 = doc.getTextWidth("PROYECTO DE RESIDENCIAS ");
      doc.text(" con título ", 20 + textWidth7 + textWidth8, 137);
      const textWidth9 = doc.getTextWidth(" con título ");
      doc.text(
        this.nombreProyecto,
        20 + textWidth7 + textWidth8 + textWidth9,
        137
      );

      doc.text(
        "____________________________________________________",
        20 + textWidth7 + textWidth8 + textWidth9,
        138
      );

      doc.text(
        "el cual ha sido autorizado para el proceso de entrega, para que pueda continuar con el proceso y normatividad correspondiente para acreditar sus residencias profesionales.",
        20,
        141,
        { maxWidth: 176, align: "justify" }
      );
      //
      doc.setFontSize(9);
      doc.setFont(undefined, "bold");
      doc.text(
        "A T E N T A M E N T E",
        doc.internal.pageSize.width / 2,
        200,
        "center"
      );

      doc.setFont(undefined, "italic");
      doc.setFontSize(7);
      doc.text(
        "“Educación,  Herencia para el éxito”",
        doc.internal.pageSize.width / 2,
        203,
        "center"
      );

      doc.text(
        this.acesorInterno,
        doc.internal.pageSize.width / 2,
        230,
        "center"
      );

      doc.text(
        "______________________________________",
        doc.internal.pageSize.width / 2,
        230,
        "center"
      );

      doc.setFontSize(9);
      doc.setFont(undefined, "normal");

      doc.text(
        "ASESOR INTERNO",
        doc.internal.pageSize.width / 2,
        236,
        "center"
      );

      if (accion) {
        this.srcPDF = doc.output("datauristring", "Carta de autorización.pdf");
        this.dialog = true;
        this.tituloPDF = "Carta de autorización";
      } else {
        doc.save("Carta de autorización.pdf");
      }
    },

    generarCronograma(accion) {
      // Default export is a4 paper, portrait, using millimeters for units
      const doc = new jsPDF({ orientation: "l" });
      //get base64
      let itsch = this.getBase64(document.getElementById("imag"));
      //get fecha
      let date = new Date();

      doc.addImage(itsch, "jpeg", 20, 15, 20, 20);
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(
        "INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO",
        doc.internal.pageSize.width / 2,
        35,
        "center"
      );
      doc.text(
        "SUBDIRECCIÓN ACADÉMICA",
        doc.internal.pageSize.width / 2,
        50,
        "center"
      );
      doc.text(
        "DIVISIÓN DE " + this.carrera.toUpperCase(),
        doc.internal.pageSize.width / 2,
        55,
        "center"
      );
      doc.text(
        "SEGUIMIENTO DE PROYECTO DE RESIDENCIAS PROFESIONALES",
        doc.internal.pageSize.width / 2,
        60,
        "center"
      );
      doc.setFontSize(9);
      doc.setFont(undefined, "italic");
      doc.text("ALUMNO:", 70, 75);
      const textWidthA = doc.getTextWidth("ALUMNO:");
      doc.text(this.alumno, 70 + textWidthA, 75);
      doc.text(
        "_________________________________________________________",
        70 + textWidthA,
        76
      );
      doc.text("No. DE CONTROL:", 190, 75);
      const textWidthN = doc.getTextWidth("No. DE CONTROL:");
      doc.text(this.noControl, 190 + textWidthN, 75);
      doc.text("______________________________", 190 + textWidthN, 76);

      doc.text("PERIODO DE REALIZACIÓN:", 41, 80);
      doc.text(
        " del      de          del 2021 al     de              del 2021",
        90,
        80
      );
      doc.text(
        "_________________________________________________________",
        84,
        81
      );
      doc.text("EMPRESA:", 201, 80);
      doc.text(" " + this.nombreEmpresa, 217, 81);
      doc.text("______________________________", 217, 81);

      doc.text("ASESOR EXTERNO:", 54, 85);
      doc.text(" " + this.acesorExterno, 84, 86);
      doc.text(
        "_________________________________________________________",
        84,
        86
      );
      doc.text("ASESOR INTERNO:", 188, 85);
      doc.text(" " + this.acesorInterno, 217, 86);
      doc.text("______________________________", 217, 86);

      doc.text("NOMBRE DEL PROYECTO:", 44, 90);
      doc.text(" " + this.nombreProyecto, 84, 91);
      doc.text(
        "_________________________________________________________________________________________________________",
        84,
        91
      );
      doc.setFontSize(12);
      doc.setFont(undefined, "normal");
      doc.autoTable({
        theme: "grid",
        styles: {
          lineColor: [0, 0, 0],
          lineWidth: 0.1,
          textColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [200, 200, 200],
        },
        bodyStyles: { cellPadding: 0 },
        columnStyles: {
          0: { cellWidth: 50 },
        },
        margin: { top: 98, bottom: 0 },
        head: [
          [
            "ACTIVIDAD",
            " ",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
          ],
        ],
        body: [
          [
            { content: "", rowSpan: 2 },
            { content: "P", styles: { halign: "center" } },
            { content: "" },
          ],
          [{ content: "R", styles: { halign: "center" } }, { content: "" }],
          [
            { content: "", rowSpan: 2 },
            { content: "P", styles: { halign: "center" } },
            { content: "" },
          ],
          [{ content: "R", styles: { halign: "center" } }, { content: "" }],
          [
            { content: "", rowSpan: 2 },
            { content: "P", styles: { halign: "center" } },
            { content: "" },
          ],
          [{ content: "R", styles: { halign: "center" } }, { content: "" }],
          [
            { content: "", rowSpan: 2 },
            { content: "P", styles: { halign: "center" } },
            { content: "" },
          ],
          [{ content: "R", styles: { halign: "center" } }, { content: "" }],
          [
            { content: "", rowSpan: 2 },
            { content: "P", styles: { halign: "center" } },
            { content: "" },
          ],
          [{ content: "R", styles: { halign: "center" } }, { content: "" }],
          [
            { content: "", rowSpan: 2 },
            { content: "P", styles: { halign: "center" } },
            { content: "" },
          ],
          [{ content: "R", styles: { halign: "center" } }, { content: "" }],
          // ...
        ],
      });

      doc.autoTable({
        styles: {
          lineColor: [0, 0, 0],
          lineWidth: 0.1,
          textColor: [0, 0, 0],
        },
        theme: "grid",
        headStyles: {
          fillColor: [200, 200, 200],
        },
        columnStyles: {
          0: { cellWidth: 40, fillColor: [200, 200, 200] },
          1: { cellWidth: 20, fillColor: [255, 255, 255] },
        },
        margin: 0,

        head: [
          [
            { content: "OBSERVACIONES", colSpan: 2, fillColor: [0, 255, 0] },
            { content: "" },
            { content: "" },
            { content: "" },
          ],
        ],
        body: [
          [
            { content: "ENTREGA DE REPORTES", rowSpan: 3 },
            { content: "Docente" },
            { content: "" },
          ],
          ["Alumno", ""],
          ["Jefe(a) Div.", ""],
          // ...
        ],
      });

      if (accion) {
        this.srcPDF = doc.output("datauristring", "Cronograma.pdf");
        this.dialog = true;
        this.tituloPDF = "Cronograma";
      } else {
        doc.save("Cronograma.pdf");
      }
    },

    generarSolicitudResidencias(accion) {
      // Default export is a4 paper, portrait, using millimeters for units
      const doc = new jsPDF();
      //get base64
      let itsch = this.getBase64(document.getElementById("imag"));
      //get fecha
      let date = new Date();

      doc.addImage(itsch, "jpeg", 20, 20, 20, 20);
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO", 40, 40);
      doc.setFontSize(10);
      doc.text(
        "INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO",
        doc.internal.pageSize.width / 2,
        50,
        "center"
      );
      doc.setFontSize(12);
      doc.text(
        "RESIDENCIAS PROFESIONALES",
        doc.internal.pageSize.width / 2,
        55,
        "center"
      );
      doc.setFontSize(10);
      doc.text(
        "SOLICITUD DE RESIDENCIAS PROFESIONALES",
        doc.internal.pageSize.width / 2,
        60,
        "center"
      );

      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.text("Lugar: Ciudad Hidalgo, Michoacán", 20, 68);
      doc.text(
        "____________________________________",
        21 + doc.getTextWidth("Lugar:"),
        69
      );
      doc.text("Fecha:", 100, 68);
      doc.text(
        "______________________________________________",
        100 + doc.getTextWidth("Fecha:"),
        69
      );
      doc.text(date.getDate() + " de ", 101 + doc.getTextWidth("Fecha:"), 68);
      doc.text(
        this.meses[date.getMonth()] + " del ",
        101 +
          doc.getTextWidth("Fecha:") +
          doc.getTextWidth(date.getDate() + " de "),
        68
      );
      doc.text(
        date.getFullYear() + "",
        101 +
          doc.getTextWidth("Fecha:") +
          doc.getTextWidth(date.getDate() + " de ") +
          doc.getTextWidth(this.meses[date.getMonth()] + " del "),
        68
      );

      doc.text("C. " + this.jefeCarrera, 20, 78);

      doc.text("Jefe de la División de ", 20, 85);
      doc.text(
        this.carrera,
        20 + doc.getTextWidth("Jefe de la División de "),
        85
      );

      doc.rect(20, 95, 50, 8);
      doc.text("NOMBRE DEL PROYECTO:", 21, 101);
      doc.rect(75, 95, 115, 8);
      doc.text(this.nombreProyecto, 76, 101);

      doc.rect(20, 105, 40, 8);
      doc.text("OPCION ELEGIDA:", 21, 111);

      doc.rect(65, 105, 30, 8);
      doc.rect(95, 105, 8, 8);
      doc.text("Banco de Proyectos", 66, 111);

      doc.rect(109, 105, 30, 8);
      doc.rect(139, 105, 8, 8);
      doc.text("Propuesta propia", 111, 111);

      doc.rect(152, 105, 30, 8);
      doc.rect(182, 105, 8, 8);
      doc.text("Trabajador", 153, 111);

      doc.rect(20, 115, 50, 8);
      doc.text("PERIODO PROYECTADO:", 21, 121);
      doc.rect(75, 115, 80, 8);
      doc.rect(155, 115, 27, 8);
      doc.rect(182, 115, 8, 8);
      doc.text("", 76, 121);
      doc.text("Número de", 156, 118);
      doc.text("Residentes", 156, 121);

      doc.setFont(undefined, "bold");
      doc.text("Datos de la empresa:", 20, 132);

      doc.setFont(undefined, "normal");
      doc.rect(20, 133, 20, 8);
      doc.rect(40, 133, 150, 8);
      doc.text("Nombre:", 21, 136);
      doc.text(this.nombreEmpresa, 41, 136);

      doc.rect(20, 141, 20, 8);
      doc.rect(40, 141, 100, 8);
      doc.rect(140, 141, 12, 8);
      doc.rect(152, 141, 38, 8);
      doc.text("Giro, Ramo", 21, 144);
      doc.text("o Sector:", 21, 147);
      doc.text(this.giroEmpresa, 41, 144);
      doc.text("R.F.C.", 141, 144);
      doc.text(this.rfcEmpresa, 153, 144);

      doc.rect(20, 149, 20, 8);
      doc.rect(40, 149, 150, 8);
      doc.text("Domicilio:", 21, 152);
      doc.text(this.domicilioEmpresa, 41, 152);

      doc.rect(20, 157, 20, 8);
      doc.rect(40, 157, 80, 8);
      doc.rect(120, 157, 12, 8);
      doc.text("C.P.", 121, 160);
      doc.text(this.cpEmpresa, 133, 160);
      doc.rect(132, 157, 20, 8);
      doc.rect(152, 157, 12, 8);
      doc.text("Fax:", 153, 160);
      doc.text(this.faxEmpresa, 165, 160);
      doc.rect(164, 157, 26, 8);
      doc.text("Colonia:", 21, 160);
      doc.text(this.coloniaEmpresa, 41, 160);

      doc.rect(20, 165, 20, 8);
      doc.rect(40, 165, 80, 8);
      doc.rect(120, 165, 20, 8);
      doc.text("Teléfono:", 121, 168);
      doc.text(this.telefonoEmpresa, 141, 168);
      doc.rect(140, 165, 50, 8);
      doc.text("Ciudad:", 21, 168);
      doc.text(this.ciudadEmpresa, 41, 168);

      doc.rect(20, 173, 20, 32);
      doc.rect(40, 173, 150, 32);
      doc.text("Misión de la", 21, 176);
      doc.text("Empresa:", 21, 180);
      doc.text(this.misionEmpresa, 41, 176);

      doc.rect(20, 205, 35, 8);
      doc.text("Nombre del Titular de", 21, 208);
      doc.text("la empresa:", 21, 211);
      doc.text(this.titularEmpresa, 56, 208);
      doc.rect(55, 205, 65, 8);
      doc.rect(120, 205, 20, 8);
      doc.text(" Puesto:", 121, 208);
      doc.text(this.puestoTitularEmpresa, 141, 208);
      doc.rect(140, 205, 50, 8);

      doc.rect(20, 213, 35, 8);
      doc.text("Nombre del", 21, 216);
      doc.text("Asesor(a) Externo(a):", 21, 219);
      doc.text(this.acesorExterno, 56, 216);
      doc.rect(55, 213, 65, 8);
      doc.rect(120, 213, 20, 8);
      doc.text(" Puesto:", 121, 216);
      doc.text(this.puestoAsesorExterno, 141, 216);
      doc.rect(140, 213, 50, 8);

      doc.rect(20, 221, 50, 10);
      doc.text("Nombre de la persona que", 21, 224);
      doc.text("firmará el acuerdo de trabajo.", 21, 227);
      doc.text("Alumno(a)- Escuela-Empresa", 21, 230);
      doc.rect(120, 221, 20, 10);
      doc.text(" Puesto:", 121, 224);
      doc.rect(140, 221, 50, 10);
      doc.rect(70, 221, 50, 10);

      doc.addPage();

      doc.addImage(itsch, "jpeg", 20, 20, 20, 20);
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO", 40, 40);
      doc.setFontSize(9);
      doc.text("Datos del/la Residente:", 20, 60);

      doc.autoTable({
        styles: {
          lineColor: [0, 0, 0],
          lineWidth: 0.1,
          textColor: [0, 0, 0],
        },
        theme: "grid",
        headStyles: {
          fillColor: [255, 255, 255],
        },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 40 },
          2: { cellWidth: 20 },
          3: { cellWidth: 30 },
        },
        margin: { top: 65 },

        body: [
          [
            { content: "Nombre:", colSpan: 1 },
            { content: this.alumno, colSpan: 5 },
          ],
          [
            { content: "Carrera:", colSpan: 1 },
            { content: this.carrera, colSpan: 2 },
            { content: "No. de control:", colSpan: 1 },
            { content: this.noControl, colSpan: 2 },
          ],
          [
            { content: "Domicilio:", colSpan: 1 },
            { content: this.direccion, colSpan: 5 },
          ],
          [
            { content: "E-mail:", colSpan: 1, rowSpan: 2 },
            { content: this.correo, colSpan: 2, rowSpan: 2 },
            { content: "Para Seguridad Social acudir", colSpan: 1, rowSpan: 2 },
            { content: "IMSS ( )", colSpan: 1, rowSpan: 1 },
            { content: "ISSSTE ( )       OTROS( )", colSpan: 1, rowSpan: 1 },
          ],
          [{ content: "No. :", colSpan: 2 }],
          [
            { content: "Ciudad:", colSpan: 1 },
            { content: this.localidad, colSpan: 2 },
            { content: "Teléfono: (no celular)", colSpan: 1 },
            { content: "", colSpan: 2 },
          ],
        ],
      });

      doc.text(this.alumno, doc.internal.pageSize.width / 2, 150, "center");
      doc.text(
        "__________________________",
        doc.internal.pageSize.width / 2,
        150,
        "center"
      );
      doc.text(
        "Firma del alumno(a)",
        doc.internal.pageSize.width / 2,
        155,
        "center"
      );

      if (accion) {
        this.srcPDF = doc.output(
          "datauristring",
          "Solicitud de residencias.pdf"
        );
        this.dialog = true;
        this.tituloPDF = "Solicitud de residencias";
      } else {
        doc.save("Solicitud de residencias.pdf");
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
    telefono(val) {
      let nuevo = val;
      if (val.length == 4) {
        this.telefono = nuevo[0] + nuevo[1] + nuevo[2] + "-";
      } else {
        if (val.length == 7) {
          this.telefono =
            nuevo[0] +
            nuevo[1] +
            nuevo[2] +
            "-" +
            nuevo[4] +
            nuevo[5] +
            nuevo[6] +
            "-";
        }
      }
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
</style>