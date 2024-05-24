document.addEventListener("DOMContentLoaded", function() {
    const nodes = document.querySelectorAll('.flowchart-object');

    nodes.forEach(node => {
        const ruleNumberSpan = node.querySelector('.node-rule-number');
        const textSpan = node.querySelector('.node-text');
        const containerWidth = node.offsetWidth;
        const containerHeight = node.offsetHeight;
        let fontSize = 16; // Initial font size

        ruleNumberSpan.style.fontSize = fontSize + 'px';
        textSpan.style.fontSize = fontSize + 'px';

        // Function to check if text overflows
        function isOverflowing(element) {
            return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
        }

        // Adjust font size until both elements fit within the node
        while ((isOverflowing(ruleNumberSpan) || isOverflowing(textSpan)) && fontSize > 6) { // Minimum font size of 6px
            fontSize--;
            ruleNumberSpan.style.fontSize = fontSize + 'px';
            textSpan.style.fontSize = fontSize + 'px';
        }
    });
});


function calculateTextDimensions(text, fontSize, fontFamily, fontWeight, lineHeight, maxWidth) {
    // Create a temporary element
    const tempElement = document.createElement('div');

    // Apply the styles to the temporary element
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.style.fontSize = fontSize;
    tempElement.style.fontFamily = fontFamily;
    tempElement.style.fontWeight = fontWeight;
    tempElement.style.lineHeight = lineHeight;
    tempElement.style.whiteSpace = 'pre-wrap'; // Allows text to wrap
    tempElement.style.wordWrap = 'break-word'; // Allows text to wrap within a specific width
    if (maxWidth) {
        tempElement.style.width = maxWidth;
    }

    // Insert the text into the temporary element
    tempElement.textContent = text;

    // Append the temporary element to the body
    document.body.appendChild(tempElement);

    // Measure the dimensions of the temporary element
    const dimensions = {
        width: tempElement.offsetWidth,
        height: tempElement.offsetHeight
    };

    // Remove the temporary element from the document
    document.body.removeChild(tempElement);

    // Return the dimensions
    return dimensions;
}

// Example usage
const text = "This is a sample text to be measured.";
const fontSize = "16px";
const fontFamily = "Arial";
const fontWeight = "normal";
const lineHeight = "normal";
const maxWidth = "200px"; // Optional maxWidth for wrapping text

const dimensions = calculateTextDimensions(text, fontSize, fontFamily, fontWeight, lineHeight, maxWidth);
console.log(`Width: ${dimensions.width}px, Height: ${dimensions.height}px`);
