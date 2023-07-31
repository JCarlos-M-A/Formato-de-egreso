import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getBase64 } from "../getBase64.js";
import { Filesystem, Directory } from "@capacitor/filesystem";
export function genFSolicitudResidencias(accion, alumno, contacto, proyecto, meses) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    //get base64
    let itsch = getBase64(document.getElementById("imag"));
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
        meses[date.getMonth()] + " del ",
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
        doc.getTextWidth(meses[date.getMonth()] + " del "),
        68
    );

    doc.text("C. " + proyecto.jefeCarrera, 20, 78);

    doc.text("Jefe de la División de ", 20, 85);
    doc.text(
        alumno.carrera,
        20 + doc.getTextWidth("Jefe de la División de "),
        85
    );

    doc.rect(20, 95, 50, 8);
    doc.text("NOMBRE DEL PROYECTO:", 21, 101);
    doc.rect(75, 95, 115, 8);
    doc.text(proyecto.nombreProyecto, 76, 101);

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
    doc.text(proyecto.nombreEmpresa, 41, 136);

    doc.rect(20, 141, 20, 8);
    doc.rect(40, 141, 100, 8);
    doc.rect(140, 141, 12, 8);
    doc.rect(152, 141, 38, 8);
    doc.text("Giro, Ramo", 21, 144);
    doc.text("o Sector:", 21, 147);
    doc.text(proyecto.giroEmpresa, 41, 144);
    doc.text("R.F.C.", 141, 144);
    doc.text(proyecto.rfcEmpresa, 153, 144);

    doc.rect(20, 149, 20, 8);
    doc.rect(40, 149, 150, 8);
    doc.text("Domicilio:", 21, 152);
    doc.text(proyecto.domicilioEmpresa, 41, 152);

    doc.rect(20, 157, 20, 8);
    doc.rect(40, 157, 80, 8);
    doc.rect(120, 157, 12, 8);
    doc.text("C.P.", 121, 160);
    doc.text(proyecto.cpEmpresa, 133, 160);
    doc.rect(132, 157, 20, 8);
    doc.rect(152, 157, 12, 8);
    doc.text("Fax:", 153, 160);
    doc.text(proyecto.faxEmpresa, 165, 160);
    doc.rect(164, 157, 26, 8);
    doc.text("Colonia:", 21, 160);
    doc.text(proyecto.coloniaEmpresa, 41, 160);

    doc.rect(20, 165, 20, 8);
    doc.rect(40, 165, 80, 8);
    doc.rect(120, 165, 20, 8);
    doc.text("Teléfono:", 121, 168);
    doc.text("telefonoEmpresa", 141, 168);
    doc.rect(140, 165, 50, 8);
    doc.text("Ciudad:", 21, 168);
    doc.text(proyecto.ciudadEmpresa, 41, 168);

    doc.rect(20, 173, 20, 32);
    doc.rect(40, 173, 150, 32);
    doc.text("Misión de la", 21, 176);
    doc.text("Empresa:", 21, 180);
    doc.text(proyecto.misionEmpresa, 41, 176);

    doc.rect(20, 205, 35, 8);
    doc.text("Nombre del Titular de", 21, 208);
    doc.text("la empresa:", 21, 211);
    doc.text(proyecto.titularEmpresa, 56, 208);
    doc.rect(55, 205, 65, 8);
    doc.rect(120, 205, 20, 8);
    doc.text(" Puesto:", 121, 208);
    doc.text(proyecto.puestoTitularEmpresa, 141, 208);
    doc.rect(140, 205, 50, 8);

    doc.rect(20, 213, 35, 8);
    doc.text("Nombre del", 21, 216);
    doc.text("Asesor(a) Externo(a):", 21, 219);
    doc.text(proyecto.acesorExterno, 56, 216);
    doc.rect(55, 213, 65, 8);
    doc.rect(120, 213, 20, 8);
    doc.text(" Puesto:", 121, 216);
    doc.text(proyecto.puestoAsesorExterno, 141, 216);
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
                { content: alumno.nombre, colSpan: 5 },
            ],
            [
                { content: "Carrera:", colSpan: 1 },
                { content: alumno.carrera, colSpan: 2 },
                { content: "No. de control:", colSpan: 1 },
                { content: alumno.noControl, colSpan: 2 },
            ],
            [
                { content: "Domicilio:", colSpan: 1 },
                { content: contacto.direccion, colSpan: 5 },
            ],
            [
                { content: "E-mail:", colSpan: 1, rowSpan: 2 },
                { content: contacto.correo, colSpan: 2, rowSpan: 2 },
                { content: "Para Seguridad Social acudir", colSpan: 1, rowSpan: 2 },
                { content: "IMSS ( )", colSpan: 1, rowSpan: 1 },
                { content: "ISSSTE ( )       OTROS( )", colSpan: 1, rowSpan: 1 },
            ],
            [{ content: "No. :", colSpan: 2 }],
            [
                { content: "Ciudad:", colSpan: 1 },
                { content: contacto.localidad, colSpan: 2 },
                { content: "Teléfono: (no celular)", colSpan: 1 },
                { content: "", colSpan: 2 },
            ],
        ],
    });

    doc.text(alumno.nombre, doc.internal.pageSize.width / 2, 150, "center");
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
        return doc.output("datauristring", "Solicitud de residencias.pdf");
    } else {
        doc.save("Solicitud de residencias.pdf");
        if (navigator.userAgent.match(/Android/i)) {
            Filesystem.writeFile({
                path: "Solicitud de residencias.pdf",
                data: doc.output("datauristring", "Solicitud de residencias.pdf"),
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
                }
            );
        }
    }

    return {
        alertExito: true,
        textExito: "Guardado en documentos",
    };
}