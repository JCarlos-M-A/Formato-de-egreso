import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getBase64 } from "../getBase64.js";
import { Filesystem, Directory } from "@capacitor/filesystem";
export function genFRegistroProyecto(accion, alumno, contacto, proyecto) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    //get base64
    let itsch = getBase64(document.getElementById("imag"));

    doc.addImage(itsch, "jpeg", 20, 5, 20, 20);
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO", 50, 25);
    doc.setFont(undefined, "normal");
    doc.text("Asunto: Registro de proyecto para la Titulación Integral", 100, 50);

    doc.setFontSize(12);
    doc.text("C. L.I. ALMA GABRIELA RUIZ VARGA", 20, 63);
    doc.text("ENCARGADO(A) DEL PROCESO DE TITULACIÓN", 20, 68);
    doc.text("P R E S E N T E.", 20, 73);

    doc.setFontSize(12);
    doc.text("Lugar: " + contacto.direccion, 20, 88);
    doc.text("_____________________________", 32, 88);
    let fecha = new Date();
    let mes = (fecha.getMonth() < 10) ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1);
    let dia = (fecha.getDate() < 10) ? '0' + (fecha.getDate() + 1) : (fecha.getDate() + 1);
    let fechaFormato = dia + '/' + mes + '/' + fecha.getFullYear();
    doc.text("Fecha: " + fechaFormato, 120, 88);
    doc.text("__________________________", 133, 88);


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
        bodyStyles: { cellPadding: 3 },
        columnStyles: {
            0: { cellWidth: 50 },
        },
        startY: 105,
        margin: { left: 20 },

        head: [
        ],
        body: [
            [
                { content: "Nombre del Proyecto:" },
                { content: proyecto.nombreProyecto },
            ],
            [
                { content: "Nombre(s) del (de los) asesores:" },
                { content: proyecto.acesorInterno },
            ],
            [
                { content: "Número de estudiantes:" },
                { content: "1" },
            ],
        ],
    });

    doc.text("Datos del (de los) estudiante(s) :", 20, 150);

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
        bodyStyles: { cellPadding: 3 },
        columnStyles: {
            0: { cellWidth: 50 },
        },
        startY: 155,
        margin: { left: 20 },

        head: [
        ],
        body: [
            //headders
            [
                { content: "Nombre" },
                { content: "No. De control" },
                { content: "Carrera" },
            ],

            //contenido
            [   //Alumno 1 
                { content: alumno.nombre },
                { content: alumno.noControl },
                { content: alumno.carrera },
            ],
            [   //Alumno 1 
                { content: "" },
                { content: "" },
                { content: "" },
            ],
        ],
    });

    // Cuadrado lleno
    doc.setDrawColor(0);
    doc.rect(20, 200, doc.internal.pageSize.width - 35, 20);
    doc.setFont(undefined, "normal");
    doc.setFontSize(11);
    doc.text("Observaciones: ", 35, 205, "center");

    doc.setFontSize(10);
    doc.text(
        "ATENTAMENTE",
        doc.internal.pageSize.width / 2,
        230,
        "center"
    );
    doc.text(
        proyecto.jefeCarrera,
        doc.internal.pageSize.width / 2,
        240,
        "center"
    );
    doc.text(
        "___________________________________",
        doc.internal.pageSize.width / 2,
        245,
        "center"
    );
    doc.setFont(undefined, "bold");
    doc.setFontSize(10);
    doc.text(
        "Nombre y firma del(a) Jefe(a) de División",
        doc.internal.pageSize.width / 2,
        250,
        "center"
    );

    doc.setFont(undefined, "normal");
    doc.text("c.c.p. Expediente", 35, 270, "center");

    if (accion) {
        return doc.output("datauristring", "Formato de registro de proyecto.pdf");
    } else {
        doc.save("Solicitud del estudiante.pdf");
        if (navigator.userAgent.match(/Android/i)) {
            Filesystem.writeFile({
                path: "Solicitud del estudiante.pdf",
                data: doc.output("datauristring", "Solicitud del estudiante.pdf"),
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