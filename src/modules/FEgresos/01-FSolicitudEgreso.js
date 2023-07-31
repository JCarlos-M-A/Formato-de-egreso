import { jsPDF } from "jspdf";
import { getBase64 } from "../getBase64.js";
import { Filesystem, Directory } from "@capacitor/filesystem";
export function genFSolicitudEgreso(accion, alumno, contacto, meses) {
  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();
  //get base64
  let itsch = getBase64(document.getElementById("imag"));
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
  doc.text(meses[date.getMonth()] + "", 161, 50);
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
  doc.text(alumno.nombre, 120, 85);
  doc.text("de la carrera de ", 30, 93);
  doc.text("_________________________________", 61, 93);
  doc.text(alumno.carrera, 63, 93);
  doc.text("con plan de estudios ", 142, 93);
  doc.text("clave ", 30, 101);
  doc.text("_____________", 41, 101);
  doc.text(alumno.clave, 42, 101);
  doc.text("solicita ante este departamento, darse por", 72, 101);
  doc.setFont(undefined, "bold");
  doc.text("EGRESADO(A)", 152, 101);
  doc.setFont(undefined, "normal");
  doc.text("al finalizar semestre ", 30, 109);
  doc.text("________________", 70, 109);
  doc.text(alumno.semestre + ".", 72, 109);
  doc.text("Al firmar esta solicitud acepta en caso", 110, 109);
  doc.text(
    "de cubrir la totalidad de créditos por ningún motivo nuevamente solicitar reinscripción y de no cubrir la totalidad de los créditos se cancela esta solicitud y se solicita nuevamente reinscripción.",
    30,
    117,
    { maxWidth: 150, align: "justify", lineHeightFactor: 2 }
  );
  doc.text("A T E N T A M E N T E", 30, 155);
  doc.text(alumno.nombre, 35, 173);
  doc.text("__________________________", 30, 175);
  doc.text("Nombre y firma del alumno", 35, 180);
  doc.text("Generación " + alumno.generacion, 140, 200);
  doc.text("_________", 162, 200);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Domicilio del alumno:", 30, 215);
  doc.setFontSize(12);
  doc.setFont(undefined, "normal");
  doc.text("Dirección: " + alumno.direccion, 30, 220);
  doc.text(
    "_________________________________________________________",
    50,
    220
  );
  doc.text("Colonia: " + contacto.colonia, 30, 230);
  doc.text("___________________________", 47, 230);
  doc.text("Localidad: " + contacto.localidad, 120, 230);
  doc.text("___________________", 140, 230);
  doc.text("Municipio: " + contacto.municipio, 30, 240);
  doc.text("__________________________", 51, 240);
  doc.text("Estado: " + contacto.estado, 120, 240);
  doc.text("_____________________", 136, 240);
  doc.text("C.P.: " + contacto.cp, 30, 250);
  doc.text("______________", 41, 250);
  doc.text("Tel.: " + contacto.telefono, 75, 250);
  doc.text("____________", 85, 250);
  doc.text("Correo: " + contacto.correo, 120, 250);
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
    return doc.output("datauristring", "Solicitud de egreso.pdf");
  } else {
    doc.save("Solicitud de egreso.pdf");
    if (navigator.userAgent.match(/Android/i)) {
      Filesystem.writeFile({
        path: "Solicitud de egreso.pdf",
        data: doc.output("datauristring", "Solicitud de egreso.pdf"),
        directory: Directory.Documents,
        //encoding: Encoding.UTF8,
      }).then(
        (writeFileResponse) => {
          console.log("writeFile success => ", writeFileResponse);
          //this.alertExito = true;
          //this.textExito = "Guardado en documentos";
        },
        (error) => {
          console.log("writeFile error => ", error);

          //this.alertError = true;
          //.textError = error + "";
          setTimeout(() => {
            //this.alertError = false;
          }, 2000);
        }
      );
    }
  }

  return {
    alertExito: true,
    textExito: "Guardado en documentos",
  };
}