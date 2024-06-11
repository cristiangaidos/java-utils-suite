async function copySelectedNodes(nodeList, allowedPasting) { 
    if (nodeList && nodeList.length > 0 && !allowedPasting) {
        for (var originData of nodeList) {
            // Copy the node data (excluding the ID, which should be unique)
            var nodeData = Object.assign({}, originData);
            delete nodeData.id; // Ensure the new node gets a unique ID

            // Retrieve and modify the position
            var originalPosition = jsRenderer.getCoordinates(originData.id);
            var newPosition = {
                x: originalPosition.x + 15, // Shift 15 pixels to the right
                y: originalPosition.y + 15  // Shift 15 pixels down
            };

            if (nodeData.type === "tariff") {
                const result = await promisifyCopyTariffNode({ name: "nodeId", value: originData.id });
                nodeData.id = result.nodeId;
                nodeData.text = result.text;
                nodeData.left = newPosition.x;
                nodeData.top = newPosition.y;
                let newNode = jsToolkit.addNode(nodeData);
                jsRenderer.setPosition(newNode, newPosition.x, newPosition.y);

            } else if (nodeData.type === "cairTariff") {
                const result = await promisifyCopyTariffNode({ name: "nodeId", value: originData.id });
                nodeData.id = result.nodeId;
                nodeData.text = result.text;
                nodeData.ruleNumber = result.ruleNumber;
                nodeData.left = newPosition.x;
                nodeData.top = newPosition.y;
                let newNode = jsToolkit.addNode(nodeData);
                jsRenderer.setPosition(newNode, newPosition.x, newPosition.y);

            } else if (nodeData.type === "pricingProduct") {
                // Handle pricingProduct similarly if needed
                // ...

            } else {
                nodeData.id = uuid();
                nodeData.left = newPosition.x;
                nodeData.top = newPosition.y;
                let newNode = jsToolkit.addNode(nodeData);
                jsRenderer.setPosition(newNode, newPosition.x, newPosition.y);
            }
        }
    }
}

function promisifyCopyTariffNode(data) {
    return new Promise((resolve, reject) => {
        copyTariffNodeWithCallback(data, (nodeId, text, ruleNumber) => {
            if (ruleNumber !== undefined) {
                resolve({ nodeId, text, ruleNumber });
            } else {
                resolve({ nodeId, text });
            }
        });
    });
}
