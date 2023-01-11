console.log("Hello back to school!");

//1. Create a variable to store the Viz container
//2. Create a varaible to store the dashboard options
//3. Create a varibale to store the url if it doesnt load might need to specifiy height and width

const containerDiv = document.getElementById("vizContainer");
const exportpdfbutton = document.getElementById("exportPDF");
const exportpptbutton = document.getElementById("exportPPT");
let viz;

const options = {
  device: "desktop",
  height: "900px",
  width: "1100px",
};

const url =
  "https://public.tableau.com/views/Embeddingexample_16734335337830/Embeddingexample?:language=en-GB&publish=yes&:display_count=n&:origin=viz_share_link";

function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}

document.addEventListener("DOMContentLoaded", initViz);

function exportPDFfunction() {
  viz.showExportPDFDialog();
}

exportpdfbutton.addEventListener("click", exportPDFfunction);

function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}

exportpptbutton.addEventListener("click", exportPPTfunction);

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;

  console.log(minValue, maxValue);

  //need to the active sheet, but this could be a dashboard or worksheet

  const workbook = viz.getWorkbook();
  const activeSheets = workbook.getActiveSheet();
  const sheets = activeSheets.getWorksheets();

  //inspect the sheet need to filter
  console.log(sheets);
  //index of the sheets want to filter
  const sheetToFilter = sheets[1];
  //do the filtering
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });

  sheets[0]
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(alert("Viz Filtered"));
}

document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);
