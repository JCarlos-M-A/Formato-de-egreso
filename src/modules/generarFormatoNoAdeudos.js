import { jsPDF } from "jspdf";
import { getBase64 } from "./getBase64.js";
import { Filesystem, Directory } from "@capacitor/filesystem";
export function generarFormatoNoAdeudos(accion, alumno, noControl, carrera, selectGeneracion, municipio, estado, meses) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF({ filename: "Formatode no adeudos.pdf" });
    //get base64
    let itsch = getBase64(document.getElementById("imag"));
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
    doc.text(alumno, 44, 45);
    doc.text("___________________________________", 43, 45);
    doc.text("No. Control:", 128, 45);
    doc.text(noControl, 154, 45);
    doc.text("____________", 153, 45);
    doc.text("Carrera:", 25, 50);
    doc.text(carrera, 44, 50);
    doc.text("___________________________________", 43, 50);
    doc.text("Generación:", 128, 50);
    doc.text(selectGeneracion, 154, 50);
    doc.text(" ____________ ", 152, 50);

    ///////////
    doc.rect(10, 55, 95, 35);
    doc.text("CENTRO DE INFORMACIÓN.", 30, 60);
    doc.setFontSize(7);
    doc.text("ANOTAR NOMBRE Y FIRMA EL RESPONSABLE DEL ÁREA.", 24, 63);
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

    doc.text(municipio + ", " + estado, 63, 275);
    doc.text(date.getDate() + "", 128, 275);
    doc.text(meses[date.getMonth()] + "", 142, 275);
    doc.text(date.getFullYear() + "", 178, 275);

    doc.text("ITSCH", 30, 285);
    doc.text("Septiembre 2019", 155, 285);

    if (accion) {
        return doc.output("datauristring", "Formato de no adeudos.pdf");
    }
    else {
        doc.save("Formato de no adeudos.pdf");

        if (navigator.userAgent.match(/Android/i)) {
            Filesystem.writeFile({
                path: "Formato de no adeudos.pdf",
                data: doc.output("datauristring", "Formato de no adeudos.pdf"),
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