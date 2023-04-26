function huffmanEncode(text) {
    // calculate character frequencies
    const freq = {};
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      freq[char] = (freq[char] || 0) + 1;
    }
  
    // create leaf nodes for each character
    const nodes = Object.keys(freq).map(char => ({ name: char, frequency: freq[char] }));
  
    // build Huffman tree
    while (nodes.length > 1) {
      nodes.sort((a, b) => a.frequency - b.frequency);
      const left = nodes.shift();
      const right = nodes.shift();
      const newNode = {
        name: `Level ${left.name}${right.name}`,
        children: [left, right],
        frequency: left.frequency + right.frequency,
      };
      nodes.push(newNode);
    }
  
    // generate code table from Huffman tree
    const codeTable = {};
    function generateCode(node, code) {
      if (node.name.length === 1) {
        codeTable[node.name] = code;
      } else {
        generateCode(node.children[0], code + "0");
        generateCode(node.children[1], code + "1");
      }
    }
    generateCode(nodes[0], "");
  
    // encode text using code table
    let encoded = "";
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      encoded += codeTable[char];
    }
  
    // return encoded text and code table
    return { encodedText: encoded, codeTable };
  }

  document.getElementById("btnAdd").addEventListener("click", encodeText)

  function encodeText(){
    str = document.getElementById("txtIntrodus").value
    str = str.toLowerCase()
    if(str != ''){
        console.log(huffmanEncode(str).codeTable)
    }
    else console.log("Please enter text")
  }
  

  


  // example usage
  const text = "IT IS BETTER LATER THAN NEVER";
  const { encodedText, codeTable } = huffmanEncode(text);
  console.log("Encoded text:", encodedText);
  console.log("Code table:", codeTable);