async function copySelectedNodes(nodeList, allowedPasting) {

  if(nodeList && nodeList.length > 0 && !allowedPasting) {

  for( var originData of nodeList ) {
         // Copy the node data (excluding the ID, which should be unique)
         var nodeData = Object.assign({}, originData);
         delete nodeData.id; // Ensure the new node gets a unique ID
     
     
         // Retrieve and modify the position
         var originalPosition = jsRenderer.getCoordinates(originData.id);
         var newPosition = {
             x: originalPosition.x + 15, // Shift 10 pixels to the right
             y: originalPosition.y + 15  // Shift 10 pixels down
         };
           
         if (nodeData.type === "tariff") {
           await copyTariffNodeWithCallback(  { name: "nodeId", value: originData.id }, function(nodeId:string,text:string) {
             nodeData.id = nodeId;
             nodeData.text = text;
             nodeData.left = newPosition.x;
             nodeData.top = newPosition.y;
             let newNode = jsToolkit.addNode(nodeData);
             jsRenderer.setPosition(newNode, newPosition.x, newPosition.y);       
           });    
         } else if (nodeData.type === "cairTariff") {
           await copyTariffNodeWithCallback({ name: "nodeId", value: originData.id }, function(nodeId:string,text:string, ruleNumber:string) {
             nodeData.id = nodeId;
             nodeData.text = text;
             nodeData.ruleNumber = ruleNumber;
             nodeData.left = newPosition.x;
             nodeData.top = newPosition.y;
             let newNode = jsToolkit.addNode(nodeData);     
             jsRenderer.setPosition(newNode, newPosition.x, newPosition.y); 
           });
          } else if (nodeData.type === "pricingProduct") {
     /*       copyProductNodeWithCallback({ name: "nodeId", value: originData.id }, function(nodeId:string,text:string) {
             nodeData.id = nodeId;
             nodeData.text = text;
             nodeData.left = newPosition.x;
             nodeData.top = newPosition.y;
             let newNode = jsToolkit.addNode(nodeData);
             jsRenderer.setPosition(newNode, newPosition.x, newPosition.y);   
           }); */    
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
