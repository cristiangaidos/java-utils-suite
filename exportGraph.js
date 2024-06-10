 async function exportGraph() {
            const container = document.getElementById('graph-container');
            const svg = document.getElementById('svg-connectors');
            
            // Convert SVG to canvas using canvg
            const svgString = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            canvas.width = svg.width.baseVal.value;
            canvas.height = svg.height.baseVal.value;
            const ctx = canvas.getContext('2d');
            await Canvg.fromString(ctx, svgString).render();

            // Capture HTML part with html2canvas
            const htmlCanvas = await html2canvas(container, {
                scale: 2,
                backgroundColor: null
            });

            // Merge the SVG canvas with the HTML canvas
            ctx.drawImage(htmlCanvas, 0, 0);

            // Create an anchor to download the image
            const link = document.createElement('a');
            link.download = 'graph.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }

document.getElementById('export-button').addEventListener('click', exportGraph);
