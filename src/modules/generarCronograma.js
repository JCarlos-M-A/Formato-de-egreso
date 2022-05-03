import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getBase64 } from "./getBase64.js";
import { Filesystem, Directory } from "@capacitor/filesystem";
export function generarCronograma(accion, carrera, alumno, noControl, nombreEmpresa, acesorExterno, acesorInterno, nombreProyecto) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF({ orientation: "l" });
    //get base64
    let itsch = getBase64(document.getElementById("imag"));
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
        "DIVISIÓN DE " + carrera.toUpperCase(),
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
    doc.text(alumno, 70 + textWidthA, 75);
    doc.text(
        "_________________________________________________________",
        70 + textWidthA,
        76
    );
    doc.text("No. DE CONTROL:", 190, 75);
    const textWidthN = doc.getTextWidth("No. DE CONTROL:");
    doc.text(noControl, 190 + textWidthN, 75);
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
    doc.text(" " + nombreEmpresa, 217, 81);
    doc.text("______________________________", 217, 81);

    doc.text("ASESOR EXTERNO:", 54, 85);
    doc.text(" " + acesorExterno, 84, 86);
    doc.text(
        "_________________________________________________________",
        84,
        86
    );
    doc.text("ASESOR INTERNO:", 188, 85);
    doc.text(" " + acesorInterno, 217, 86);
    doc.text("______________________________", 217, 86);

    doc.text("NOMBRE DEL PROYECTO:", 44, 90);
    doc.text(" " + nombreProyecto, 84, 91);
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
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
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
        return doc.output("datauristring", "Cronograma.pdf");
    } else {
        doc.save("Cronograma.pdf");
        if (navigator.userAgent.match(/Android/i)) {
            Filesystem.writeFile({
                path: "Cronograma.pdf",
                data: doc.output("datauristring", "Cronograma.pdf"),
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