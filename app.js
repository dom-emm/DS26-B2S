console.log("Hello back to school!");

//1. Create a variable to store the Viz container
//2. Create a varaible to store the dashboard options
//3. Create a varibale to store the url if it doesnt load might need to specifiy height and width

const containerDiv = document.getElementById("vizContainer");
const exportpdfbutton = document.getElementById("exportPDF");
const exportpptbutton = document.getElementById("exportPPT");
const exportimgbutton = document.getElementById("exportIMG");
switchStatus = false;
let viz;

const options = {
  device: "desktop",
  height: "900px",
  width: "1100px",
};

const url =
  "https://public.tableau.com/views/Embeddingexample_16734335337830/Embeddingexample?:language=en-GB&publish=yes&:display_count=n&:origin=viz_share_link";

function initViz(vizurl) {
  viz = new tableau.Viz(containerDiv, vizurl, options);
}

document.addEventListener("DOMContentLoaded", initViz(url));

function exportPDFfunction() {
  viz.showExportPDFDialog();
}

function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}

function exportIMGfunction() {
  viz.showExportImageDialog();
}

exportpdfbutton.addEventListener("click", exportPDFfunction);
exportpptbutton.addEventListener("click", exportPPTfunction);
exportimgbutton.addEventListener("click", exportIMGfunction);

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

function switchViz() {
  viz.dispose();
  const newUrl =
    "https://public.tableau.com/views/Superstoredashboard-WOW_2022_W19/WOW2022-W19?:language=en-GB&:display_count=n&:origin=viz_share_link";
  if (switchStatus == false) {
    initViz(newUrl);
    switchStatus = true;
  } else if (switchStatus == true) {
    initViz(url);
    switchStatus = false;
  }
}

document.getElementById("SwitchViz").addEventListener("click", switchViz);
