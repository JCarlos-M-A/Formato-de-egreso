import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getBase64 } from "../getBase64.js";
import { Filesystem, Directory } from "@capacitor/filesystem";//amdroid
//importamos los datos necesarios 
export function genFLiberacionProyectoTitulacionIntegral(accion, jefeCarrera, alumno, carrera, noControl, nombreProyecto, selectGeneracion, direccion, colonia, localidad, municipio, estado, cp, telefono, correo, producto) {

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    //get base64
    let itsch = getBase64(document.getElementById("imag"));

    doc.addImage(itsch, "jpeg", 20, 5, 20, 20);
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO", 50, 25);

    doc.setFontSize(12);
    doc.setFont(undefined, "normal");
    doc.text("Lugar y fecha:", 120, 50);
    //doc.line(152, 52, 180, 52);
    let fecha = new Date();
    let mes = (fecha.getMonth() < 10) ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1);
    let dia = (fecha.getDate() < 10) ? '0' + (fecha.getDate() + 1) : (fecha.getDate() + 1);
    let fechaFormato = dia + '/' + mes + '/' + fecha.getFullYear();
    doc.text(fechaFormato, 148, 49);
    doc.setLineWidth(0.5);
    doc.line(148, 50, (doc.internal.pageSize.width - 20), 50);
    doc.text("Asunto: Liberación de proyecto para la Titulación Integral", doc.internal.pageSize.width - doc.getTextWidth("Asunto: Liberación de proyecto para la Titulación Integral") - 20, 56);

    doc.setFontSize(14);
    doc.text("C. " + jefeCarrera, 20, 70);
    doc.setLineWidth(0.5);
    doc.line(25, 71, (doc.internal.pageSize.width / 2), 71);

    doc.text("JEFE (A) DE DIVISIÓN DE " + carrera, 20, 77);
    doc.line(20 + doc.getTextWidth("JEFE (A) DE DIVISIÓN DE "), 78, doc.getTextWidth("JEFE (A) DE DIVISIÓN DE " + carrera) + 21, 78);
    doc.text("P R E S E N T E.", 20, 83);
    doc.setFontSize(13);
    doc.text(
        "Por este medio informo que ha sido liberado el siguiente proyecto para la titulación Integral",
        20,
        95,
        { maxWidth: 175, align: "justify", lineHeightFactor: 1 }
    );

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
                { content: "Nombre del estudiante y/o egresado:" },
                { content: alumno },
            ],
            [
                { content: "Carrera:" },
                { content: carrera },
            ],
            [
                { content: "Número de control:" },
                { content: noControl },
            ],
            [
                { content: "Nombre del Proyecto:" },
                { content: nombreProyecto },
            ],
            [
                { content: "Producto:" },
                { content: producto },
            ],
        ],
    });

    doc.text(
        "Agradezco de antemano su valioso apoyo en esta importante actividad para la formación profesional de nuestros egresados.", 20, 170,
        { maxWidth: 175, align: "justify", lineHeightFactor: 1 }
    );

    doc.text(
        "A T E N T A M E N T E",
        doc.internal.pageSize.width / 2,
        190,
        "center"
    );

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
        startY: 200,
        margin: { left: 20 },

        head: [
        ],
        body: [
            [
                { content: alumno },
                { content: alumno },
                { content: alumno },
            ],
            [
                { content: "Nombre y firma del asesor" },
                { content: "Nombre y firma del revisor" },
                { content: "Nombre y firma del revisor" }
            ]
        ],
    });

    doc.setFont(undefined, "normal");
    doc.text("c.c.p. Expediente", 35, 270, "center");

    //Fin documento

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