<template>
  <v-container>
    <img :src="require(`@/assets/img/itsch.jpg`)" hidden id="imag" alt="MDN" />
    <div style="text-decoration: underline red" hidden id="hola">Hola</div>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require(`@/assets/img/itsch.jpg`)" class="my-3" contain height="200" />
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="alumno"
            :rules="requerido"
            label="Nombre"
            required
          ></v-text-field>

          <v-text-field
            v-model="noControl"
            :rules="requerido"
            label="N° control"
            required
          ></v-text-field>

          <v-select
            :items="itemsCarrera"
            v-model="carrera"
            :rules="requerido"
            label="Carrera"
            required
          ></v-select>

          <v-text-field
            v-model="clave"
            :rules="requerido"
            label="Clave"
            required
          ></v-text-field>

          <v-select
            v-model="selectGeneracion"
            :items="itemsGeneracion"
            :rules="[(v) => !!v || 'Generacion requerida']"
            label="Generacion"
            required
          ></v-select
        ></v-form>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="correo"
            :rules="emailRules"
            label="Correo"
            required
          ></v-text-field>

          <v-text-field
            v-model="direccion"
            :rules="requerido"
            label="Direccion"
            required
          ></v-text-field>

          <v-text-field
            v-model="colonia"
            :rules="requerido"
            label="Colonia"
            required
          ></v-text-field>

          <v-text-field
            v-model="localidad"
            :rules="requerido"
            label="Localidad"
            required
          ></v-text-field>

          <v-text-field
            v-model="municipio"
            :rules="requerido"
            label="Municipio"
            required
          ></v-text-field>

          <v-text-field
            v-model="estado"
            :rules="requerido"
            label="Estado"
            required
          ></v-text-field>

          <v-text-field
            v-model="cp"
            :rules="requerido"
            label="Codigo postal"
            required
          ></v-text-field>

          <v-text-field
            v-model="telefono"
            :rules="telRules"
            label="Telefono"
            maxlength="12"
            required
          ></v-text-field>
        </v-form>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn @click="generar()" dark color="#800000" elevation="2"
        >Generar</v-btn
      >
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import { jsPDF } from "jspdf";

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();

export default {
  name: "HelloWorld",

  data: () => ({
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
    direccion: "",
    colonia: "",
    localidad: "",
    municipio: "",
    estado: "",
    cp: "",
    telefono: "",
    correo: "",

    //Validacion
    valid: true,
    emailRules: [
      (v) => !!v || "Correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "Correo no valido",
    ],
    telRules: [
      (v) => !!v || "Telefono es requerido",
      (v) => /[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{4}/.test(v) || "Telefono no valido",
    ],
    requerido: [(v) => !!v || "Dato requerido"],
  }),

  methods: {
    generar() {
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
      doc.text(
        "Ciudad Hidalgo, Michoacán, a " +
          date.getDate() +
          " de " +
          this.meses[date.getMonth()] +
          " de " +
          date.getFullYear(),
        80,
        50
      );
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text("ING. DANIEL AGUILAR ESPINO", 30, 63);
      doc.text("JEFE DEL DEPARTAMENTO DE SERVICIOS ESCOLARES", 30, 68);
      doc.text("DEL INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO", 30, 73);
      doc.setFont(undefined, "normal");
      doc.text(
        "Por medio de la presente, el (la) que suscribe " +
          this.alumno +
          " de la carrera de " +
          this.carrera +
          " con plan de estudios clave " +
          this.clave +
          " solicita ante este departamento, darse por EGRESADO(A) al finalizar semestre " +
          this.selectSemestre +
          " Al firmar esta solicitud acepta en caso de cubrir la totalidad de créditos por ningún" +
          " motivo nuevamente solicitar reinscripción y de no cubrir la totalidad de los créditos" +
          " se cancela esta solicitud y se solicita nuevamente reinscripción.",
        30,
        85,
        { maxWidth: 150, align: "justify", lineHeightFactor: 2 }
      );
      doc.text("A T E N T A M E N T E", 30, 155);
      doc.text(this.alumno, 35, 173);
      doc.text("__________________________", 30, 175);
      doc.text("Nombre y firma del alumno", 35, 180);
      doc.text("Generación " + this.selectGeneracion, 150, 200);
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("Domicilio del alumno:", 30, 215);
      doc.setFontSize(12);
      doc.setFont(undefined, "normal");
      doc.text("Dirección: " + this.direccion, 30, 220);
      doc.text("Colonia: " + this.colonia, 30, 230);
      doc.text("Localidad: " + this.colonia, 130, 230);
      doc.text("Municipio: " + this.municipio, 30, 240);
      doc.text("Estado: " + this.estado, 130, 240);
      doc.text("C.P.: " + this.cp, 30, 250);
      doc.text("Tel.: " + this.telefono, 80, 250);
      doc.text("Correo: " + this.correo, 130, 250);
      doc.text(
        "Autorizo al Instituto Tecnológico Superior de Ciudad Hidalgo, utilizar estos datos para localizarme posterior a mi egreso.",
        30,
        260,
        { maxWidth: 150, align: "justify" }
      );
      doc.text("ITSCH", 30, 280);
      doc.text("Julio 2017", 160, 280);

      doc.save("Solicitud de egreso.pdf");
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
  },
  watch: {
    // cada vez que la pregunta cambie, esta función será ejecutada
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
