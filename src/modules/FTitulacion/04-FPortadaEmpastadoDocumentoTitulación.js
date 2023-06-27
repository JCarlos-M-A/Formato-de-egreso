import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getBase64 } from "../getBase64";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { arialNormal } from "../../assets/fuentes/arial";
import { arialBold } from "../../assets/fuentes/arialBold";
export function genFPortadaEmpastadoDocummentoTitulacion(accion, datosPortadaEmpastado) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    let itsch = getBase64(document.getElementById("imag"));


    doc.addFileToVFS("arial.ttf", arialBold);
    doc.addFont("arial.ttf", "arial", "bold");

    doc.addImage(itsch, "jpeg", 15, 50, 20, 25);
    doc.setFontSize(18);
    doc.setFont("arial","bold");
    doc.text("INSTITUTO TECNOLÓGICO SUPERIOR", doc.internal.pageSize.width-doc.getTextWidth("INSTITUTO TECNOLÓGICO SUPERIOR")-20, 50);
    doc.text("de Ciudad Hidalgo", doc.internal.pageSize.width-doc.getTextWidth("de Ciudad Hidalgo")-20, 58,);

    //LINE (iniciox)
    doc.setLineWidth(0.9); 
    doc.line(50, 65, doc.internal.pageSize.width-20, 65);
    doc.setLineWidth(0.7); 
    doc.line(55, 67, doc.internal.pageSize.width-20, 67);
    doc.setLineWidth(0.5); 
    doc.line(60, 69, doc.internal.pageSize.width-20, 69);

    doc.setLineWidth(0.9);
    doc.line(20, 80, 20, 245);
    doc.setLineWidth(0.7);
    doc.line(22, 85, 22, 240);
    doc.setLineWidth(0.5);
    doc.line(24, 90, 24, 235);

    doc.setFontSize(16);
    doc.text('"'+datosPortadaEmpastado.nProyecto.toUpperCase()+'"', doc.internal.pageSize.width / 2, 90, "center");

    doc.setFontSize(14);
    doc.text(datosPortadaEmpastado.nProducto.toUpperCase(), doc.internal.pageSize.width/2, 110,'center');
    
    doc.text('QUE PARA OBTENER EL TÍTULO DE:', doc.internal.pageSize.width/2, 130,'center');
    doc.text(datosPortadaEmpastado.nCarrera.toUpperCase(), doc.internal.pageSize.width/2, 145,'center');

    doc.text('PRESENTA:', doc.internal.pageSize.width/2, 170,'center');
    doc.setFontSize(16);
    doc.text(datosPortadaEmpastado.nAlumno.toUpperCase(), doc.internal.pageSize.width/2, 180,'center');

    doc.setFontSize(14);
    doc.text('ASESOR ACADEMICO:', doc.internal.pageSize.width/2, 200,'center');
    doc.setFontSize(16);
    doc.text(datosPortadaEmpastado.nAcesor.toUpperCase(), doc.internal.pageSize.width/2, 210,'center');

    doc.setFontSize(14);
    let date = new Date();
    doc.text(datosPortadaEmpastado.localidad + ", " + datosPortadaEmpastado.estado + " a " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(), doc.internal.pageSize.width-doc.getTextWidth(datosPortadaEmpastado.localidad + ", " + datosPortadaEmpastado.estado + " a " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear())-20, 235);


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