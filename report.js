export function generateReport(
  detectedFaces,
  threshold,
  galleryFiles,
  thiefFile
) {
  const reportContent = document.getElementById("reportContent");
  const reportSection = document.getElementById("reportSection");

  // Get case details from the input fields
  const caseNumber =
    document.getElementById("caseNumber").value || "Not Provided";
  const caseName = document.getElementById("caseName").value || "Not Provided";
  const caseDetails =
    document.getElementById("caseDetails").value || "Not Provided";

  // Clear previous report content
  reportContent.innerHTML = "";

  // Populate report with case details
  reportContent.innerHTML = `
    <h2 class="text-xl font-semibold text-gray-700">Case Details</h2>
    <p><strong>Case Number:</strong> ${caseNumber}</p>
    <p><strong>Case Name:</strong> ${caseName}</p>
    <p><strong>Other Details:</strong> ${caseDetails}</p>
    <p><strong>Total Gallery Images:</strong> ${galleryFiles.length}</p>
    <p><strong>Thief Image:</strong> ${thiefFile.name}</p>
    <p><strong>Detection Threshold:</strong> ${threshold}</p>
    <p><strong>Number of Faces Detected:</strong> ${detectedFaces.length}</p>
    <p><strong>Matching Faces Found:</strong> ${
      detectedFaces.filter((face) => face.isMatch).length
    }</p>
  `;

  // List matching faces with details
  if (detectedFaces.some((face) => face.isMatch)) {
    const matchList = detectedFaces
      .filter((face) => face.isMatch)
      .map(
        (face) =>
          `<li>Match in ${face.imageName} with confidence ${(
            face.confidence * 100
          ).toFixed(2)}%</li>`
      )
      .join("");

    reportContent.innerHTML += `
      <h3 class="text-lg font-semibold text-gray-700 mt-4">Match Details:</h3>
      <ul class="list-disc list-inside">${matchList}</ul>
    `;
  } else {
    reportContent.innerHTML += `<p>No matching faces found.</p>`;
  }

  // Add Thief Image in the Report
  const thiefImageHTML = `
    <h3 class="text-lg font-semibold text-gray-700 mt-4">Thief Image:</h3>
    <div class="text-center">
      <img src="${URL.createObjectURL(
        thiefFile
      )}" alt="Thief Image" class="w-32 mx-auto rounded-md shadow-md" />
    </div>
  `;
  reportContent.innerHTML += thiefImageHTML;

  // Show the report section
  reportSection.classList.remove("hidden");

  // Add report download functionality
  document.getElementById("downloadReport").onclick = () =>
    downloadReportAsPDF(
      detectedFaces,
      threshold,
      galleryFiles,
      thiefFile,
      caseNumber,
      caseName,
      caseDetails
    );
}

function downloadReportAsPDF(
  detectedFaces,
  threshold,
  galleryFiles,
  thiefFile,
  caseNumber,
  caseName,
  caseDetails
) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.text("Face Detection Report", 10, 10);
  pdf.text(`Case Number: ${caseNumber}`, 10, 20);
  pdf.text(`Case Name: ${caseName}`, 10, 30);
  pdf.text(`Other Details: ${caseDetails}`, 10, 40);
  pdf.text(`Total Gallery Images: ${galleryFiles.length}`, 10, 50);
  pdf.text(`Thief Image: ${thiefFile.name}`, 10, 60);
  pdf.text(`Detection Threshold: ${threshold}`, 10, 70);
  pdf.text(`Number of Faces Detected: ${detectedFaces.length}`, 10, 80);
  pdf.text(
    `Matching Faces Found: ${
      detectedFaces.filter((face) => face.isMatch).length
    }`,
    10,
    90
  );

  if (detectedFaces.some((face) => face.isMatch)) {
    pdf.text("Match Details:", 10, 100);
    let yPosition = 110;
    detectedFaces
      .filter((face) => face.isMatch)
      .forEach((face) => {
        pdf.text(
          `- Match in ${face.imageName} with confidence ${(
            face.confidence * 100
          ).toFixed(2)}%`,
          10,
          yPosition
        );
        yPosition += 10;
      });
  } else {
    pdf.text("No matching faces found.", 10, 100);
  }

  const imgData = URL.createObjectURL(thiefFile);
  pdf.addImage(imgData, "JPEG", 10, 120, 50, 50);

  pdf.save("Face_Detection_Report.pdf");
}
