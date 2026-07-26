import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AnalysisSample } from '../types';

export async function exportReportToPdf(report: AnalysisSample) {
  // Create a hidden temporary container element styled specifically for a 2-page or 1-page A4 PDF report
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '800px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#111827';
  container.style.fontFamily = 'sans-serif';
  container.style.padding = '32px';
  container.style.boxSizing = 'border-box';

  const dateStr = new Date().toLocaleString();

  container.innerHTML = `
    <div style="border: 2px solid #2E7D32; border-radius: 16px; padding: 24px; background: #ffffff;">
      <!-- Header with Logo and Brand -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #E5E7EB; padding-bottom: 16px; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="background-color: #2E7D32; width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">
            🌿
          </div>
          <div>
            <h1 style="margin: 0; font-size: 22px; color: #111827; font-weight: 800;">
              AgriCare <span style="color: #2E7D32;">AI</span>
            </h1>
            <p style="margin: 2px 0 0 0; font-size: 11px; color: #4B5563; font-weight: 600;">
              Precision Agricultural Diagnostic Report
            </p>
          </div>
        </div>
        <div style="text-align: right; font-size: 11px; color: #6B7280;">
          <p style="margin: 0;"><strong>Report Date:</strong> ${dateStr}</p>
          <p style="margin: 2px 0 0 0;"><strong>Report ID:</strong> #${report.id.slice(-6)}</p>
        </div>
      </div>

      <!-- Main Overview Grid -->
      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <!-- Left: Uploaded Image -->
        <div style="width: 220px; flex-shrink: 0;">
          <img src="${report.image}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 12px; border: 1px solid #D1D5DB;" />
        </div>

        <!-- Right: Crop & Health Stats -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="background-color: #E8F5E9; color: #2E7D32; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">
              ${report.cropName} Crop
            </span>
            <h2 style="margin: 8px 0 4px 0; font-size: 20px; color: #111827; font-weight: 800;">
              ${report.issueName}
            </h2>
            ${report.scientificName ? `<p style="margin: 0; font-size: 11px; color: #6B7280; font-style: italic;">Scientific Name: ${report.scientificName}</p>` : ''}
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 12px; background: #F9FAFB; padding: 12px; border-radius: 10px; border: 1px solid #F3F4F6;">
            <div>
              <span style="font-size: 10px; color: #6B7280; display: block; text-transform: uppercase; font-weight: 600;">Health Status</span>
              <strong style="font-size: 12px; color: ${report.status === 'Healthy' ? '#2E7D32' : '#D97706'}; font-weight: 700;">
                ${report.healthStatus || report.status}
              </strong>
            </div>
            <div>
              <span style="font-size: 10px; color: #6B7280; display: block; text-transform: uppercase; font-weight: 600;">AI Confidence</span>
              <strong style="font-size: 12px; color: #2E7D32; font-weight: 700;">${report.confidence}% Match</strong>
            </div>
            <div>
              <span style="font-size: 10px; color: #6B7280; display: block; text-transform: uppercase; font-weight: 600;">Severity Level</span>
              <strong style="font-size: 12px; color: ${report.confidence > 80 ? '#D97706' : '#2E7D32'}; font-weight: 700;">
                ${report.confidence > 80 ? 'Moderate Risk' : 'Low Risk'}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Symptoms & Causes -->
      <div style="margin-bottom: 16px; background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 10px; padding: 12px 16px;">
        <h3 style="margin: 0 0 6px 0; font-size: 12px; color: #92400E; text-transform: uppercase; font-weight: 800;">
          Observed Symptoms & Causes
        </h3>
        <p style="margin: 0; font-size: 11px; color: #78350F; leading: 1.5;">
          ${report.visibleSymptoms || report.detailedAnalysis}
        </p>
      </div>

      <!-- Diagnostic Reasoning -->
      <div style="margin-bottom: 16px; background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 10px; padding: 12px 16px;">
        <h3 style="margin: 0 0 6px 0; font-size: 12px; color: #1E40AF; text-transform: uppercase; font-weight: 800;">
          AI Diagnostic Analysis & Reasoning
        </h3>
        <p style="margin: 0; font-size: 11px; color: #1E3A8A; leading: 1.5;">
          ${report.reasoning || report.detailedAnalysis}
        </p>
      </div>

      <!-- General Recommendations -->
      <div style="margin-bottom: 16px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; padding: 12px 16px;">
        <h3 style="margin: 0 0 6px 0; font-size: 12px; color: #166534; text-transform: uppercase; font-weight: 800;">
          Recommended Treatment & Action Plan
        </h3>
        <p style="margin: 0; font-size: 11px; color: #14532D; leading: 1.5;">
          ${report.suggestedAction}
        </p>
      </div>

      <!-- Prevention Tips -->
      ${report.preventativeSteps && report.preventativeSteps.length > 0 ? `
        <div style="margin-bottom: 16px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 10px; padding: 12px 16px;">
          <h3 style="margin: 0 0 6px 0; font-size: 12px; color: #374151; text-transform: uppercase; font-weight: 800;">
            Long-Term Prevention Tips
          </h3>
          <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: #4B5563;">
            ${report.preventativeSteps.map(step => `<li style="margin-bottom: 4px;">${step}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- Educational Disclaimer -->
      <div style="background: #111827; color: #F9FAFB; border-radius: 10px; padding: 12px 16px; margin-top: 20px;">
        <h4 style="margin: 0 0 4px 0; font-size: 11px; color: #8BC34A; text-transform: uppercase; font-weight: 800;">
          Educational Disclaimer
        </h4>
        <p style="margin: 0; font-size: 10px; color: #D1D5DB; leading: 1.4;">
          This diagnostic assessment is generated by AgriCare AI for educational and advisory purposes. Before applying chemical or biological treatments on commercial crops, consult a certified local agronomist.
        </p>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    document.body.removeChild(container);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`AgriCare_AI_Report_${report.cropName.replace(/\s+/g, '_')}.pdf`);
  } catch (err) {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
    console.error('Failed to export PDF:', err);
    throw err;
  }
}
