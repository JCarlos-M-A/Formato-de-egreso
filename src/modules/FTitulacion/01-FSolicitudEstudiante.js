import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getBase64 } from "../getBase64";
import { Filesystem, Directory } from "@capacitor/filesystem";
export function genFSolicitudEstudiante(accion, alumno, contacto, proyecto) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    //get base64
    let itsch = getBase64(document.getElementById("imag"));
    //get fecha
    let date = new Date();

    doc.addImage(itsch, "jpeg", 20, 5, 20, 20);
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("INSTITUTO TECNOLÓGICO SUPERIOR DE CIUDAD HIDALGO", 50, 25);
    doc.setFont(undefined, "normal");
    doc.text("Lugar y fecha: " + contacto.localidad + ", " + contacto.estado + " a " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(), 90, 50);
    doc.setLineWidth(0.5); 
    doc.line(90+doc.getTextWidth('Lugar y fecha: '), 52, (doc.internal.pageSize.width-20), 52);

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("C. " + proyecto.jefeCarrera, 20, 63);
    doc.line(25, 64, (doc.internal.pageSize.width/2), 64);

    doc.setFontSize(10);
    doc.text("JEFE(A) DE DIVISIÓN DE " + alumno.carrera, 20, 70);
    doc.text("P R E S E N T E", 20, 75);


    doc.setFont(undefined, "normal");
    doc.text("At’n. L.I. ALMA GABRIELA RUIZ VARGAS", 120, 85);
    doc.line(128, 86, (doc.internal.pageSize.width-20), 86);
    doc.text("Encargado(a) del Proceso de Titulación", 128, 90);
    doc.text("Por medio del presente solicito autorización para iniciar trámite de registro de proyecto de titulación integral:", 20, 98,
        { maxWidth: 150, align: "justify" });

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
                { content: "Nombre:" },
                { content: alumno.nombre },
            ],
            [
                { content: "Carrera:" },
                { content: alumno.carrera },
            ],
            [
                { content: "No. de Control:" },
                { content: alumno.noControl },
            ],
            [
                { content: "Nombre del proyecto:" },
                { content: proyecto.nombreProyecto },
            ],
            [
                { content: "Producto:" },
                { content: proyecto.producto },
            ],
        ],
    });

    doc.text("En espera de la aceptación de esta solicitud, quedo a sus órdenes.", 25, 170);
    doc.text(
        "ATENTAMENTE",
        doc.internal.pageSize.width / 2,
        185,
        "center"
    );
    doc.text(
        alumno.nombre,
        doc.internal.pageSize.width / 2,
        198,
        "center"
    );
    doc.text(
        "__________________________",
        doc.internal.pageSize.width / 2,
        200,
        "center"
    );
    doc.setFont(undefined, "bold");
    doc.text(
        "Nombre y firma del estudiante",
        doc.internal.pageSize.width / 2,
        204,
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
            0: { cellWidth: 70 },
        },
        margin: { left: 20 },
        startY: 210,
        head: [
        ],
        body: [
            [
                { content: "Dirección:" },
                { content: contacto.localidad + " " + contacto.estado },
            ],
            [
                { content: "Teléfono particular o de contacto:" },
                { content: contacto.telefono },
            ],
            [
                { content: "Correo electrónico del estudiante:" },
                { content: contacto.correo },
            ],
        ],
    });

    if (accion) {
        return doc.output("datauristring", "Solicitud del estudiante.pdf");
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