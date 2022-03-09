<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        color="#800000"
        class="hoverManito"
        :complete="valid"
        @click="e1 = 1"
        step="1"
      >
        Datos.
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        color="#800000"
        :complete="valid2"
        @click="e1 = 2"
        class="hoverManito"
        step="2"
      >
        Contacto
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        color="#800000"
        @click="e1 = 3"
        class="hoverManito"
        step="3"
      >
        Salida PDF
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mt-6" flat>
          <v-row>
            <v-spacer></v-spacer>
            <v-text-field
              outlined
              label="N° de control"
              v-model="noControlBuscar"
              prepend-inner-icon="mdi-magnify"
              color="#800000"
            >
            </v-text-field>
            <v-btn color="#800000" class="mt-2 ml-2" dark @click="buscar()">
              Buscar
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </v-card>
        <v-card class="mb-12" flat>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" lg="5">
              <v-alert border="left" color="#80000010">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="alumno"
                    :rules="requerido"
                    label="Nombre*"
                    color="#800000"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="noControl"
                    :rules="requerido"
                    label="N° control*"
                    color="#800000"
                    required
                  ></v-text-field>

                  <v-select
                    :items="itemsCarrera"
                    v-model="carrera"
                    :rules="requerido"
                    color="#800000"
                    label="Carrera*"
                    required
                  ></v-select>

                  <v-text-field
                    v-model="clave"
                    :rules="requerido"
                    color="#800000"
                    label="Clave*"
                    required
                  ></v-text-field>

                  <v-select
                    v-model="selectGeneracion"
                    :items="itemsGeneracion"
                    :rules="[(v) => !!v || 'Generacion requerida']"
                    label="Generacion*"
                    color="#800000"
                    required
                  ></v-select
                ></v-form>
              </v-alert>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-card>
        <v-btn color="#800000" dark @click="e1 = 2"> Siguiente </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" flat>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" lg="5">
              <v-alert border="left" color="#80000010">
                <v-form ref="form2" v-model="valid2" lazy-validation>
                  <v-text-field
                    v-model="correo"
                    :rules="emailRules"
                    label="Correo*"
                    color="#800000"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="direccion"
                    :rules="requerido"
                    label="Direccion*"
                    color="#800000"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="colonia"
                    :rules="requerido"
                    label="Colonia*"
                    color="#800000"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="localidad"
                    :rules="requerido"
                    label="Localidad*"
                    color="#800000"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="municipio"
                    :rules="requerido"
                    label="Municipio*"
                    color="#800000"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="estado"
                    :rules="requerido"
                    label="Estado*"
                    color="#800000"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="cp"
                    :rules="requerido"
                    label="Codigo postal*"
                    color="#800000"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="telefono"
                    :rules="telRules"
                    label="Telefono*"
                    color="#800000"
                    maxlength="12"
                    required
                  ></v-text-field>
                </v-form>
              </v-alert>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-card>
        <v-btn color="red-grey" @click="e1 = 1"> Anterior </v-btn>
        <v-divider vertical class="ml-2 mr-2"></v-divider>
        <v-btn color="#800000" dark @click="generar()"> Generar </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-1">
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="12" lg="6">
                <PDFVisor :srcPDF="srcPDF1" />
              </v-col>
              <v-col cols="12" md="12" lg="6">
                <PDFVisor :srcPDF="srcPDF2" />
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-card class="mb-12" color="grey lighten-1">
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="12" lg="6">
                <PDFVisor :srcPDF="srcPDF3" />
              </v-col>
              <v-col cols="12" md="12" lg="6"> </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-btn color="red-grey" @click="e1 = 2"> Anterior </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { jsPDF } from "jspdf";
import PDFVisor from "../components/PDFVisor";

export default {
  components: {
    PDFVisor,
  },
  data() {
    return {
      //DATOS PDF
      srcPDF1: "",
      srcPDF2: "",

      e1: 1,
      //datos generales
      alumno: "Juan Carlos Montaño Álvarez",
      noControl: "S16030213",
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

      //Validacion
      valid: true,
      valid2: true,
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

      noControlBuscar: "",

      pdfSolicitud: "",

      srcPDF3: "",
    };
  },

  methods: {
    generar() {
      if (this.$refs.form.validate()) {
        this.e1 = 3;
        this.generarSolicitudEgreso();
        this.generarFormatoNoAdeudos();
        this.generarCartaAutorizacion();
        //doc.save("Solicitud de egreso.pdf");
        //document.getElementById("pdfVer").src = doc.output("datauristring");
      }
    },

    generarSolicitudEgreso() {
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
      doc.text("____________________________", 47, 230);
      doc.text("Localidad: " + this.localidad, 130, 230);
      doc.text("_____________", 153, 230);
      doc.text("Municipio: " + this.municipio, 30, 240);
      doc.text("__________________________", 51, 240);
      doc.text("Estado: " + this.estado, 130, 240);
      doc.text("________________", 146, 240);
      doc.text("C.P.: " + this.cp, 30, 250);
      doc.text("______________", 41, 250);
      doc.text("Tel.: " + this.telefono, 80, 250);
      doc.text("______________", 90, 250);
      doc.text("Correo: " + this.correo, 130, 250);
      doc.text("________________", 146, 250);
      doc.text(
        "Autorizo al Instituto Tecnológico Superior de Ciudad Hidalgo, utilizar estos datos para localizarme posterior a mi egreso.",
        30,
        260,
        { maxWidth: 150, align: "justify" }
      );
      doc.text("ITSCH", 30, 280);
      doc.text("Julio 2017", 160, 280);

      this.$emit("pdfSolicitud", doc.output("datauristring"));
      this.srcPDF1 = doc.output("datauristring");
    },

    generarFormatoNoAdeudos() {
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

      this.$emit("pdfFormatoNoAdeudos", doc.output("datauristring"));
      this.srcPDF2 = doc.output("datauristring", "pepe.pdf");
      //console.log(doc.output("datauristring","pepe.pdf"))
    },

    generarCartaAutorizacion() {
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
      doc.text("Cd. Hidalgo, Michoacán, " + date.getDate()+"/"+this.meses[date.getMonth()]+"/"+date.getFullYear(), 140, 50);

      doc.setFont(undefined, "bold");
      doc.text("C.", 20, 80);
      doc.text("this.jefeCarrera", 23, 80);
      doc.text("___________________________________", 23, 80);

      doc.setFontSize(10);
      doc.text("JEFE(A) DE CARRERA DE INGENIERÍA", 20, 85);
      doc.text(this.carrera.toUpperCase(), 20, 90);
      const textWidth = doc.getTextWidth(this.carrera.toUpperCase());
      doc.line(20, 90, 20 + textWidth, 90);
      doc.text("  DEL ITSCH", 20 + textWidth, 90);
      doc.text("P R E S E N T E", 20, 95);

      ///////////
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.text(
        "Por medio del presente se le envía un caluroso saludo y aprovechando la oportunidad para informarle que el (la) alumno(a) " +
          this.alumno +
          " con numero de control " +
          this.noControl +
          " de la carrera de " +
          this.carrera +
          " ha concluido su PROYECTO DE RESIDENCIAS con título " +
          "this.tituloProyecto" +
          "el cual ha sido autorizado para el proceso de entrega, para que pueda continuar con el proceso y normatividad correspondiente para acreditar sus residencias profesionales.",
        20,
        130,
        { maxWidth: 150, align: "justify" }
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

      //this.$emit("pdfFormatoNoAdeudos", doc.output("datauristring"));
      this.srcPDF3 = doc.output("datauristring", "carta.pdf");
      //console.log(doc.output("datauristring","pepe.pdf"))
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
};
</script>

<style>
.hoverManito:hover {
  cursor: pointer !important;
}

.v-list-item--active {
  background: #800000 !important;
}

.v-list-item--active .v-list-item__title {
  background: #800000 !important;
  color: white !important;
}
</style>