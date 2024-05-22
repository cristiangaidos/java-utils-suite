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
