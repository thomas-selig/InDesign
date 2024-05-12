//DESCRIPTION: Export with multiple presets
/* 
Define the different presets and suffixes below.
The different presets need to be created in InDesign before.
*/

const presets = [
    {
        preset: "MMP_0710_200dpi_col",
        suffix: ""
    },
    {
        preset: "200dpi",
        suffix: "_200dpi"
    }
]

main();

function main() {
    if (app.activeDocument) {
        try{
            const doc = app.activeDocument;
            if (doc.saved) {
                docPath = String(doc.fullName).replace(/\..+$/, "") + ".pdf";
                docPath = String(new File(docPath).saveDlg()); 
            } else {
                docPath = String((new File).saveDlg()); 
            }
            if (docPath == "null" || docPath == null) {
                exit();
            }
            // InDesign doesn't seem to support polyfills. So we don't map but iterate manuallly...
            for(i=0; i<presets.length; i+=1) { 
                preset = app.pdfExportPresets.itemByName(presets[i].preset);
                if (!(preset.isValid)) {
                    alert("Problem with preset '"+presets[i].preset+"'");
                    exit();
                }
                exportName = docPath.replace(/\.pdf$/, ""); 
                exportName = exportName+presets[i].suffix+".pdf"
                doc.exportFile(ExportFormat.PDF_TYPE, new File(exportName), false, preset);
            }
        }
        catch(error) {
            alert("Sorry, there was a problem. " + error.message);
        }
    } else {
        alert ("Please open a document and try again:");
    }
}
