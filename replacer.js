let treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
  null,
  false
);

while (treeWalker.nextNode()) {
  let currentNode = treeWalker.currentNode;
  let text = currentNode.nodeValue;
  let results = text.replace(/\n/g, " ").match(/(.*)(tailor)(.*)/);
  if (results) {
    let parent = currentNode.parentNode;

    // Create a new span to replace the existing text node
    let span = document.createElement("span");

    // Add the text before the found word to the span
    span.appendChild(document.createTextNode(results[1]));

    // Replace the found word with a new element
    let innerSpan = document.createElement("span");
    innerSpan.setAttribute("style", "background-color: #e0e0e0; color: green; font-size: larger;");
    innerSpan.appendChild(document.createTextNode(results[2]));
    span.appendChild(innerSpan);

    // Add the text after the found word to the span
    span.appendChild(document.createTextNode(results[3]));
    
    parent.replaceChild(span, treeWalker.currentNode);
    break;
  }
}
