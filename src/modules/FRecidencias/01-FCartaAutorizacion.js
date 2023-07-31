import { jsPDF } from "jspdf";
import { getBase64 } from "../getBase64";
import { Filesystem, Directory } from "@capacitor/filesystem";
export function genFCartaAutorizacion(accion, alumno, proyecto, meses) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    //get base64
    let itsch = getBase64(document.getElementById("imag"));
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
        meses[date.getMonth()] +
        "/" +
        date.getFullYear(),
        140,
        60
    );

    doc.setFont(undefined, "bold");
    doc.text("C.", 20, 80);
    doc.text(proyecto.jefeCarrera, 23, 80);
    doc.text("___________________________________", 23, 80);

    doc.setFontSize(10);
    doc.text("JEFE(A) DE CARRERA DE INGENIERÍA", 20, 85);
    doc.text(alumno.carrera.toUpperCase(), 20, 90);
    const textWidth = doc.getTextWidth(alumno.carrera.toUpperCase());
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
    doc.text(alumno.nombre, 20, 133);
    const textWidth2 = doc.getTextWidth(alumno.nombre);
    doc.line(20, 134, 20 + textWidth2, 134);
    doc.text("con numero de control ", 20 + textWidth2, 133);
    const textWidth3 = doc.getTextWidth(" con numero de control ");
    doc.text(alumno.noControl, 20 + textWidth2 + textWidth3, 133);
    const textWidth4 = doc.getTextWidth(alumno.noControl);
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
        alumno.carrera,
        20 + textWidth2 + textWidth3 + textWidth4 + textWidth5,
        133
    );
    const textWidth6 = doc.getTextWidth(alumno.carrera);
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
        proyecto.nombreProyecto,
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
        proyecto.acesorInterno,
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
        return doc.output("datauristring", "Carta de autorización.pdf");
    }
    else {
        doc.save("Carta de autorización.pdf");

        if (navigator.userAgent.match(/Android/i)) {
            Filesystem.writeFile({
                path: "Carta de autorización.pdf",
                data: doc.output("datauristring", "Carta de autorización.pdf"),
                directory: Directory.Documents,
                //encoding: Encoding.UTF8,
            }).then(
                (writeFileResponse) => {
                    console.log("writeFile success => ", writeFileResponse);
                    /*
                        this.alertExito = true;
                        this.textExito = "Guardado en documentos";
                        setTimeout(() => {
                            this.alertExito = false;
                        }, 2000);
                    */
                },
                (error) => {
                    console.log("writeFile error => ", error);
                    /*
                        this.alertError = true;
                        this.textError = error + "";
                        setTimeout(() => {
                            this.alertError = false;
                        }, 2000);
                    */
                }
            );
        }
    }

    return {
        alertExito: true,
        textExito: "Guardado en documentos",
    };
}