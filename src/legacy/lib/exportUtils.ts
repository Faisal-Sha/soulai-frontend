/**
 * Export utilities for Ladini Matrix diagrams
 * Handles PNG and PDF export functionality
 */
import { toPng } from 'html-to-image';

export const exportDiagramAsPNG = (svgElement: SVGSVGElement, filename: string = 'destiny-matrix') => {
  // Use the more robust element exporter
  exportElementAsPNG(svgElement as any, filename);
};

export const exportElementAsPNG = async (element: HTMLElement, filename: string = 'destiny-matrix') => {
  try {
    if (!element) {
      throw new Error('No element provided for export');
    }

    console.log('Starting export for:', filename);

    // High compatibility options with theme-independent overrides
    const options = {
      quality: 1.0,
      pixelRatio: 3,
      backgroundColor: '#ffffff',
      cacheBust: true,
      style: {
        '--background': '240 20% 98%',
        '--foreground': '240 10% 10%',
        '--card': '0 0% 100%',
        '--card-foreground': '240 10% 10%',
        '--border': '240 5.9% 90%',
        'color': 'black', // Force text to black
      } as any,
    };

    // Ensure all images/styles are loaded
    await new Promise(resolve => setTimeout(resolve, 500));

    let dataUrl = '';
    try {
      // Primary attempt - using toPng directly which is usually more stable for complex CSS
      dataUrl = await toPng(element, options);
    } catch (err: any) {
      console.warn('First export attempt failed, retrying with lower quality:', err);
      // Retry with lower pixel ratio if it fails
      dataUrl = await toPng(element, { ...options, pixelRatio: 2 });
    }

    if (!dataUrl || dataUrl.length < 100) {
      throw new Error('Generated image is invalid');
    }

    // Create a download-friendly link
    const link = document.createElement('a');
    const safeName = filename.toLowerCase().replace(/[^a-z0-9а-я]/gi, '-');
    const timestamp = new Date().toISOString().slice(0, 10);

    link.href = dataUrl;
    link.download = `${safeName}-${timestamp}.png`;

    document.body.appendChild(link);
    link.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
    }, 200);

    return true;
  } catch (error: any) {
    console.error('CRITICAL EXPORT ERROR:', error);
    throw new Error(error.message || 'Unknown export error');
  }
};

export const exportDiagramAsPDF = async (svgElement: SVGSVGElement, filename: string = 'destiny-matrix') => {
  try {
    // This is a simplified implementation
    // In a production app, you'd use libraries like jsPDF or Puppeteer

    // For now, convert to PNG and let user save as PDF manually
    exportDiagramAsPNG(svgElement, filename);

    // Future enhancement: implement proper PDF export with jsPDF
    console.warn('PDF export currently exports as PNG. Full PDF implementation coming soon.');
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw new Error('Failed to export PDF');
  }
};

export const copyDiagramToClipboard = async (svgElement: SVGSVGElement) => {
  try {
    // Create canvas and convert to blob
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get canvas context');

    const rect = svgElement.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = async () => {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.scale(2, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, 0, 0, rect.width, rect.height);

      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
          } catch (clipboardError) {
            console.warn('Clipboard API failed, falling back to download');
            exportDiagramAsPNG(svgElement, 'destiny-matrix-copy');
          }
        }
      }, 'image/png', 1.0);

      URL.revokeObjectURL(svgUrl);
    };

    img.src = svgUrl;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    throw new Error('Failed to copy to clipboard');
  }
};