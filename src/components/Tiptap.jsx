import React, { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Undo,
  Redo,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Superscript,
  Subscript,
  Upload,
  Underline,
  X,
} from "lucide-react";
import {
  Box,
  Button,
  Input,
  Portal,
  VStack,
  HStack,
  IconButton,
  Text,
  Flex,
  Container,
} from "@chakra-ui/react";
import { Dialog } from "@chakra-ui/react";

const Tiptap = () => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeFormats, setActiveFormats] = useState({});
  const [isCursorInEditor, setIsCursorInEditor] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isUrlDialogOpen, setIsUrlDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [selectedTextForLink, setSelectedTextForLink] = useState("");
  const [savedSelection, setSavedSelection] = useState(null);

  // Save to history
  const saveToHistory = () => {
    if (!editorRef.current) return; // editor is fully loaded or not
    const content = editorRef.current.innerHTML;

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(content);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Update active formats
  const updateActiveFormats = () => {
    const selection = window.getSelection(); // get the selected part with all html tag this wraped...

    if (!selection.rangeCount) return; // it checks whether the content selected is part of editor or not...

    let node = selection.anchorNode;
    if (node?.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
    } // check whether the selected is text or html

    // Check if cursor is inside the editor
    let isInEditor = false;
    let checkNode = node;
    while (checkNode) {
      if (checkNode === editorRef.current) {
        isInEditor = true;
        break;
      }
      checkNode = checkNode.parentNode;
    }
    setIsCursorInEditor(isInEditor); // it does like it takes the parent of text node and check the parent of that parent node until the make div(contenteditable) is found. if it got found then the cursor is inside the text-editor...

    const formats = {
      bold: false,
      italic: false,
      strike: false,
      h1: false,
      h2: false,
      h3: false,
      h4: false,
      h5: false,
      h6: false,
      bulletList: false,
      orderedList: false,
      superscript: false,
      subscript: false,
      alignLeft: false,
      alignCenter: false,
      alignRight: false,
      alignJustify: false,
      codeBlock: false,
      underline: false,
    }; // this is used to light up the selected format, by default all are taking "false " that means no formatting...

    while (node && node !== editorRef.current) {
      if (node.nodeName === "STRONG" || node.nodeName === "B")
        formats.bold = true;
      if (node.nodeName === "EM" || node.nodeName === "I")
        formats.italic = true;
      if (node.nodeName === "S" || node.nodeName === "STRIKE")
        formats.strike = true;
      if (node.nodeName === "H1") formats.h1 = true;
      if (node.nodeName === "H2") formats.h2 = true;
      if (node.nodeName === "H3") formats.h3 = true;
      if (node.nodeName === "H4") formats.h4 = true;
      if (node.nodeName === "H5") formats.h5 = true;
      if (node.nodeName === "H6") formats.h6 = true;
      if (node.nodeName === "UL") formats.bulletList = true;
      if (node.nodeName === "OL") formats.orderedList = true;
      if (node.nodeName === "SUP") formats.superscript = true;
      if (node.nodeName === "SUB") formats.subscript = true;
      if (node.nodeName === "PRE") formats.codeBlock = true;
      if (node.nodeName === "U") formats.underline = true;

      // Check text alignment
      const textAlign = node.style?.textAlign;
      if (textAlign === "left") formats.alignLeft = true;
      if (textAlign === "center") formats.alignCenter = true;
      if (textAlign === "right") formats.alignRight = true;
      if (textAlign === "justify") formats.alignJustify = true;

      node = node.parentNode;
    }

    setActiveFormats(formats);
  };

  useEffect(() => {
    if (editorRef.current && history.length === 0) {
      saveToHistory();
    }
  }, []); // this ensures that once the text-editor full rendered then the content must be saved in history

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () =>
      document.removeEventListener("selectionchange", updateActiveFormats);
  }, []); // this ensures that any text select, de-select or the cursor position change then "selectionChange event must fires"

  // Wrap selection with tag
  const wrapSelection = (tagName) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    const wrapper = document.createElement(tagName);
    try {
      range.surroundContents(wrapper);
    } catch (e) {
      wrapper.innerHTML = range.extractContents().textContent;
      range.insertNode(wrapper);
    } // if the element can not be replaced like:: inside ul, li must be its direct child, so if i try to replace li by bold then it can not be. so the catch function do like it wraps the content of li inside the "wrapper" and inserted it inside that "li"

    // Re-select the wrapped content =- when the selected content is added formatting then dom change its structure and the selection lost to gain the selection after formatting this is done...
    const newRange = document.createRange();
    newRange.selectNodeContents(wrapper);
    selection.removeAllRanges();
    selection.addRange(newRange);

    saveToHistory();
  }; // this function wrap the selected text with select formating like - if <p>hello</p> and i apply bold formating then this fun does like - <b>hello</b>

  // Remove formatting
  const removeFormatting = (tagName) => {
    console.log(tagName)
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    let node = selection.anchorNode;
    if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
    }

    while (node && node !== editorRef.current) {
      if (node.nodeName === tagName.toUpperCase()) {
        const parent = node.parentNode;
        const textContent = node.textContent;

        // Replace the formatted node with its text content
        const textNode = document.createTextNode(textContent);
        parent.replaceChild(textNode, node); // replaced the existing child with new child...

        // Re-select the text
        const newRange = document.createRange();
        newRange.selectNodeContents(textNode);
        selection.removeAllRanges();
        selection.addRange(newRange);

        saveToHistory();
        return;
      }
      node = node.parentNode;
    }
  };

  // Toggle bold
  const toggleBold = () => {
    if (activeFormats.bold) {
      removeFormatting("strong"); // if already selected then unselect
    } else {
      wrapSelection("strong"); // if already not selected then select
    }

    setTimeout(() => {
      updateActiveFormats();
    }, 10);
  };

  // Toggle underline
  const toggleUnderline = () => {
    if (activeFormats.underline) {
      console.log("something")
      removeFormatting("u");
    } else {
      console.log("something")
      wrapSelection("u");
    }

    setTimeout(() => {
      updateActiveFormats();
    }, 10);
  };

  // Toggle italic
  const toggleItalic = () => {
    if (activeFormats.italic) {
      removeFormatting("em");
    } else {
      wrapSelection("em");
    }

    setTimeout(() => {
      updateActiveFormats();
    }, 10);
  };

  // Toggle strikethrough
  const toggleStrike = () => {
    if (activeFormats.strike) {
      removeFormatting("s");
    } else {
      wrapSelection("s");
    }

    setTimeout(() => {
      updateActiveFormats();
    }, 10);
  };

  // Toggle superscript
  const toggleSuperscript = () => {
    if (activeFormats.superscript) {
      removeFormatting("sup");
    } else {
      // Remove subscript if active
      if (activeFormats.subscript) {
        removeFormatting("sub");
      }
      wrapSelection("sup");
    }

    setTimeout(() => {
      updateActiveFormats();
    }, 10);
  };

  // Toggle subscript
  const toggleSubscript = () => {
    if (activeFormats.subscript) {
      removeFormatting("sub");
    } else {
      // Remove superscript if active
      if (activeFormats.superscript) {
        removeFormatting("sup");
      }
      wrapSelection("sub");
    }

    setTimeout(() => {
      updateActiveFormats();
    }, 10);
  };

  // Set text alignment
  const setTextAlign = (alignment) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    let node = selection.anchorNode;

    if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
    }

    // Find block element
    while (
      node &&
      node !== editorRef.current &&
      !["P", "H1", "H2", "H3", "H4", "H5", "H6", "DIV", "LI"].includes(
        node.nodeName
      )
    ) {
      node = node.parentNode;
    }

    if (node && node !== editorRef.current) {
      // Toggle: if already aligned this way, remove alignment (set to left)
      if (node.style.textAlign === alignment) {
        node.style.textAlign = "left";
      } else {
        node.style.textAlign = alignment;
      }

      saveToHistory();
      updateActiveFormats();
    }
  }; // this find the block element and apply alignment...

  // Set heading
  const setHeading = (level) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    let node = selection.anchorNode;

    if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
    }

    // Find block element
    while (
      node &&
      node !== editorRef.current &&
      !["P", "H1", "H2", "H3", "H4", "H5", "H6", "DIV", "LI"].includes(
        node.nodeName
      )
    ) {
      node = node.parentNode;
    }

    if (node && node !== editorRef.current) {
      const currentTag = node.nodeName;
      const targetTag = `H${level}`;

      // If clicking the same heading level, convert back to paragraph
      if (currentTag === targetTag) {
        const paragraph = document.createElement("p");
        paragraph.innerHTML = node.innerHTML;
        paragraph.style.fontSize = "16px";
        paragraph.style.marginTop = "8px";
        paragraph.style.marginBottom = "8px";
        node.parentNode.replaceChild(paragraph, node);

        // Place cursor at the end
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(paragraph);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        // Convert to the selected heading level
        const heading = document.createElement(`h${level}`);
        heading.innerHTML = node.innerHTML;

        // Set font sizes for different heading levels
        const fontSizes = {
          1: "32px",
          2: "28px",
          3: "24px",
          4: "20px",
          5: "18px",
          6: "16px",
        };
        heading.style.fontSize = fontSizes[level];
        heading.style.fontWeight = "bold";
        heading.style.marginTop = "16px";
        heading.style.marginBottom = "8px";

        node.parentNode.replaceChild(heading, node);

        // Place cursor at the end of the heading
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(heading);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }

      saveToHistory();
      updateActiveFormats();
    }
  }; // heading is applied to block element only...

  // Insert list
  const insertList = (ordered = false) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const list = document.createElement(ordered ? "ol" : "ul"); // select with list oredered or unordered...

    list.style.paddingLeft = "24px";
    list.style.marginTop = "8px";
    list.style.marginBottom = "8px";

    const li = document.createElement("li");
    li.textContent = "";

    list.appendChild(li);

    const range = selection.getRangeAt(0);
    range.insertNode(list);

    // range.setStart(li, 0);
    // range.setEnd(li, li.childNodes.length);
    selection.removeAllRanges();
    selection.addRange(range);

    saveToHistory();
    updateActiveFormats();
  };

  // Insert link
  const insertLink = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const selectedText = selection.toString().trim();
    if (!selectedText) {
      alert("⚠️ Please select text first to create a link!");
      return;
    }

    // Save the current selection range
    const range = selection.getRangeAt(0);
    setSavedSelection(range.cloneRange());

    setSelectedTextForLink(selectedText);
    setLinkUrl("https://");
    setIsLinkDialogOpen(true);
  };

  // Handle link submission
  const handleLinkSubmit = () => {
    if (!linkUrl || !linkUrl.trim() || !savedSelection) return;

    const link = document.createElement("a");
    link.href = linkUrl.trim();
    link.textContent = selectedTextForLink;
    link.target = "_blank";
    link.style.color = "#60a5fa";
    link.style.textDecoration = "underline";

    // Restore the saved selection
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedSelection);

    // Insert the link
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(link);

    setIsLinkDialogOpen(false);
    setLinkUrl("");
    setSelectedTextForLink("");
    setSavedSelection(null);
    saveToHistory();
  };

  // Insert or toggle code block
  const toggleCodeBlock = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    let node = selection.anchorNode;
    if (node?.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
    }

    // Check if we're already inside a code block
    let codeBlockNode = node;
    while (codeBlockNode && codeBlockNode !== editorRef.current) {
      if (codeBlockNode.nodeName === "PRE") {
        // Remove code block - convert back to paragraph
        const paragraph = document.createElement("p");
        paragraph.textContent = codeBlockNode.textContent;
        paragraph.style.marginTop = "8px";
        paragraph.style.marginBottom = "8px";
        codeBlockNode.parentNode.replaceChild(paragraph, codeBlockNode);

        // Place cursor in the paragraph
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(paragraph);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);

        saveToHistory();
        updateActiveFormats();
        return;
      }
      codeBlockNode = codeBlockNode.parentNode;
    }

    // Not in a code block, so create one
    const pre = document.createElement("pre");
    pre.contentEditable = "true";
    pre.style.cssText =
      "background:#262626; padding: 12px; border-radius: 6px; margin: 16px 0; overflow-x: auto; min-height: 60px; font-family: monospace; color: #16a34a; white-space: pre-wrap;";
    pre.textContent = "// Write your code here...";

    const range = selection.getRangeAt(0);
    range.insertNode(pre);

    // Move cursor inside the code block
    const newRange = document.createRange();
    newRange.selectNodeContents(pre);
    newRange.collapse(false);
    selection.removeAllRanges();
    selection.addRange(newRange);

    saveToHistory();
    updateActiveFormats();
  };

  // Insert image placeholder
  const insertImagePlaceholder = () => {
    if (!isCursorInEditor) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    // Create simple placeholder
    const placeholder = document.createElement("div");
    placeholder.contentEditable = "false";
    placeholder.className = "image-placeholder";
    placeholder.style.cssText = `
      background: transparent;
      border: 2px dashed #cbd5e0;
      border-radius: 8px;
      padding: 24px;
      margin: 16px 0;
      text-align: center;
      cursor: pointer;
      display: inline-block;
      width: 100%;
      max-width: 300px;
    `;

    placeholder.innerHTML = `
  <div style="
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
  ">
    <div style="color: #718096; margin-bottom: 8px;">
      <svg xmlns="http://www.w3.org/2000/svg"
        width="32" height="32" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    </div>
    <div style="color: #4a5568; font-size: 14px;">
      Click on me to insert image/file
    </div>
  </div>
`;

    // Add click handler to placeholder
    placeholder.onclick = (e) => {
      e.stopPropagation();
      setCurrentPlaceholder(placeholder);
      setIsImageDialogOpen(true);
    };

   

    const range = selection.getRangeAt(0); // it gets first parent of selected part
    range.insertNode(placeholder); // its prepare...

    // Move cursor after placeholder
    // range.setStartAfter(placeholder);
    // range.setEndAfter(placeholder);
    selection.removeAllRanges();
    selection.addRange(range);

    saveToHistory();
  };

  // Handle image upload from computer
  const handleUploadFromComputer = () => {
    setIsImageDialogOpen(false);
    fileInputRef.current?.click(); // gives effect of clicking on the input file
  };

  // Handle image URL insertion
  const handleInsertFromUrl = () => {
    setIsImageDialogOpen(false);
    setImageUrl("");
    setIsUrlDialogOpen(true);
  };

  // Insert image from URL
  const handleUrlSubmit = () => {
    if (imageUrl && imageUrl.trim() && currentPlaceholder) {
      replacePlaceholderWithImage(currentPlaceholder, imageUrl.trim());
      setIsUrlDialogOpen(false);
      setImageUrl("");
    }
  };

  // Replace placeholder with actual image
  const replacePlaceholderWithImage = (placeholder, src, alt = "image") => {
    const container = document.createElement("div");
    container.contentEditable = "false";
    container.style.cssText = `
      position: relative;
      display: inline-block;
      width: 100%;
      height:400px;
      margin: 16px 0;

    `;

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
      width: 100%;
      height: 100%;
      border-radius: 8px;
      display: block;
      object-fit: contain;
    `;

    // Delete button (hidden by default, shows on hover)
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(239, 68, 68, 0.9);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 16px;
      display: none;
      transition: all 0.2s;
    `;
    deleteBtn.title = "Delete Image";

    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      setImageToDelete(container);
      setIsDeleteDialogOpen(true);
    };

    // Show delete button on hover
    container.onmouseenter = () => {
      deleteBtn.style.display = "block";
    };

    container.onmouseleave = () => {
      deleteBtn.style.display = "none";
    };

    container.appendChild(img);
    container.appendChild(deleteBtn);

    placeholder.parentNode.replaceChild(container, placeholder);
    saveToHistory();
  };

  // Handle image deletion confirmation
  const handleDeleteImage = () => {
    if (imageToDelete) {
      imageToDelete.remove();
      saveToHistory();
      setIsDeleteDialogOpen(false);
      setImageToDelete(null);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("❌ Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("❌ Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(event.target.result)
      // Find the placeholder that triggered this upload
      const placeholders =
        editorRef.current.querySelectorAll(".image-placeholder");
      const targetPlaceholder = Array.from(placeholders).pop(); // Get the last one added

      if (targetPlaceholder) {
        replacePlaceholderWithImage(
          targetPlaceholder,
          event.target.result, // info of file...
          file.name
        );
      }
    };
    reader.readAsDataURL(file);
    
    e.target.value = "";
  };

  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      editorRef.current.innerHTML = history[historyIndex - 1];
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      editorRef.current.innerHTML = history[historyIndex + 1];
    }
  };

  // Toolbar button
  const ToolbarBtn = ({ onClick, active, disabled, children, title }) => {
    return (
      <Button
        onClick={onClick}
        isDisabled={disabled}
        title={title}
        size="sm"
        variant="ghost"
        colorScheme={active ? "blue" : "gray"}
        bg={active ? "blue.50" : "#1f2937"}
        color={active ? "black" : "white"}
        _hover={{ bg: active ? "blue.100" : "#475569" }}
        aria-label={title}
      >
        {children}
      </Button>
    );
  };

  return (
    <Box minH="100vh" bg="#0f172a" py={8}>
      <style>{`
        .editor-content em,
        .editor-content i {
          font-style: italic !important;
        }
        .editor-content strong,
        .editor-content b {
          font-weight: bold !important;
        }
        .editor-content s,
        .editor-content strike {
          text-decoration: line-through !important;
        }
        .editor-content h1,
        .editor-content h2,
        .editor-content h3,
        .editor-content h4,
        .editor-content h5,
        .editor-content h6 {
          font-weight: bold !important;
        }
        .editor-content sup {
          vertical-align: super !important;
          font-size: 0.75em !important;
        }
        .editor-content sub {
          vertical-align: sub !important;
          font-size: 0.75em !important;
        }
        .editor-content ul {
          list-style-type: disc !important;
          padding-left: 24px !important;
        }
        .editor-content ol {
          list-style-type: decimal !important;
          padding-left: 24px !important;
        }
      `}</style>

      <Container maxW="container.xl">
        <Box
          bg="#1e293b"
          borderRadius="xl"
          boxShadow="lg"
          overflow="auto"
          border="1px"
          borderColor="white"
          color={"white"}
        >
          {/* Toolbar */}
          <Box bg="#020617" borderBottom="1px" borderColor="gray.200" p={3}>
            <Flex gap={1} flexWrap={"wrap"} alignItems="center" justifyContent={{
              base:"center"
            }}
            gapY={{
              base:"0.7rem"
            }}
           
            
            >
              {/* History */}
              <HStack gap={1}>
                <ToolbarBtn
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  title="Undo (Ctrl+Z)"
                >
                  <Undo size={16} color="blue" />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  title="Redo (Ctrl+Y)"
                >
                  <Redo size={16} />
                </ToolbarBtn>
              </HStack>

              <Box w="1px" h="24px" bg="gray.300" mx={{
                base:"0",
                lg:"0.7rem"
              }} />

              {/* Headings */}
              {/* <HStack gap={1}> */}
                <ToolbarBtn
                  onClick={() => setHeading(1)}
                  active={activeFormats.h1}
                  title="Heading 1"
                >
                  <Heading1 size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={() => setHeading(2)}
                  active={activeFormats.h2}
                  title="Heading 2"
                >
                  <Heading2 size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={() => setHeading(3)}
                  active={activeFormats.h3}
                  title="Heading 3"
                >
                  <Heading3 size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={() => setHeading(4)}
                  active={activeFormats.h4}
                  title="Heading 4"
                >
                  <Heading4 size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={() => setHeading(5)}
                  active={activeFormats.h5}
                  title="Heading 5"
                >
                  <Heading5 size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={() => setHeading(6)}
                  active={activeFormats.h6}
                  title="Heading 6"
                >
                  <Heading6 size={16} />
                </ToolbarBtn>
              {/* </HStack> */}

              <Box w="1px" h="24px" bg="gray.300" mx={{
                base:"0",
                lg:"0.7rem"
              }} />

              {/* Text Formatting */}
              {/* <HStack gap={1}> */}
                <ToolbarBtn
                  onClick={toggleBold}
                  active={activeFormats.bold}
                  title="Bold (Ctrl+B)"
                >
                  <Bold size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={toggleItalic}
                  active={activeFormats.italic}
                  title="Italic (Ctrl+I)"
                >
                  <Italic size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={toggleStrike}
                  active={activeFormats.strike}
                  title="Strikethrough"
                >
                  <Strikethrough size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                onClick={toggleUnderline}
                active={activeFormats.underline}
                title={"Underline"}
                >
                  <Underline size={16}/>
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={toggleSuperscript}
                  active={activeFormats.superscript}
                  title="Superscript"
                >
                  <Superscript size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={toggleSubscript}
                  active={activeFormats.subscript}
                  title="Subscript"
                >
                  <Subscript size={16} />
                </ToolbarBtn>
              {/* </HStack> */}

              <Box w="1px" h="24px" bg="gray.300" mx={{
                base:"0",
                lg:"0.7rem"
              }} />

              {/* Alignment */}
              {/* <HStack gap={1}> */}
                <ToolbarBtn
                  onClick={() => setTextAlign("left")}
                  active={activeFormats.alignLeft}
                  title="Align Left"
                >
                  <AlignLeft size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={() => setTextAlign("center")}
                  active={activeFormats.alignCenter}
                  title="Align Center"
                >
                  <AlignCenter size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={() => setTextAlign("right")}
                  active={activeFormats.alignRight}
                  title="Align Right"
                >
                  <AlignRight size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={() => setTextAlign("justify")}
                  active={activeFormats.alignJustify}
                  title="Justify"
                >
                  <AlignJustify size={16} />
                </ToolbarBtn>
              {/* </HStack> */}

              <Box w="1px" h="24px" bg="gray.300" mx={{
                base:"0",
                lg:"0.7rem"
              }} />

              {/* Insert */}
              {/* <HStack gap={1}> */}
                <ToolbarBtn
                  onClick={toggleCodeBlock}
                  active={activeFormats.codeBlock}
                  title="Code Block"
                >
                  <Code size={16} />
                </ToolbarBtn>
                <ToolbarBtn onClick={insertLink} title="Insert Link">
                  <Link size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={insertImagePlaceholder}
                  disabled={!isCursorInEditor}
                  title="Insert Image"
                >
                  <Image size={16} />
                </ToolbarBtn>
              {/* </HStack> */}

              <Box w="1px" h="24px" bg="gray.300" mx={{
                base:"0",
                lg:"0.7rem"
              }} />

              {/* Lists */}
              <HStack gap={1}>
                <ToolbarBtn
                  onClick={() => insertList(false)}
                  active={activeFormats.bulletList}
                  title="Bullet List"
                >
                  <List size={16} />
                </ToolbarBtn>
                <ToolbarBtn
                  onClick={() => insertList(true)}
                  active={activeFormats.orderedList}
                  title="Numbered List"
                >
                  <ListOrdered size={16} />
                </ToolbarBtn>
              </HStack>
            </Flex>
          </Box>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />

          {/* Editor Content */}
          <Box
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={() => {
              saveToHistory();
              updateActiveFormats();
            }}
            onClick={(e) => {
              updateActiveFormats();

              if (e.target.tagName === "A") {
                e.preventDefault();
                const url = e.target.href;
                if (url) {
                  window.open(url, "_blank");
                }
              }
            }}
            onKeyUp={updateActiveFormats}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const selection = window.getSelection();
                if (!selection.rangeCount) return;

                let node = selection.anchorNode;
                if (node?.nodeType === Node.TEXT_NODE) {
                  node = node.parentNode;
                }

                let inCodeBlock = false;
                let codeBlockNode = node;
                while (codeBlockNode && codeBlockNode !== editorRef.current) {
                  if (codeBlockNode.nodeName === "PRE") {
                    inCodeBlock = true;
                    break;
                  }
                  codeBlockNode = codeBlockNode.parentNode;
                }

                if (inCodeBlock) {
                  e.preventDefault();
                  const range = selection.getRangeAt(0);
                  const textNode = document.createTextNode("\n");
                  range.deleteContents();
                  range.insertNode(textNode);
                  range.setStartAfter(textNode);
                  range.setEndAfter(textNode);
                  selection.removeAllRanges();
                  selection.addRange(range);
                  saveToHistory();
                }
              }
            }}
            className="editor-content"
            minH="600px"
            p={8}
            fontSize="16px"
            lineHeight="1.6"
            color="white"
            outline="none"
            _focus={{ outline: "none" }}
          >
            <h1>Professional Text Editor</h1>
            <p>
              A clean and modern rich text editor built with{" "}
              <strong>Chakra UI</strong> and <strong>React</strong>. Start
              typing to create your content!
            </p>

            <h2>Features</h2>
            <ul>
              <li>Rich text formatting with toolbar controls</li>
              <li>Multiple heading levels (H1-H6)</li>
              <li>Text alignment options</li>
              <li>Code blocks with syntax styling</li>
              <li>Link and image insertion</li>
              <li>Comprehensive undo/redo support</li>
            </ul>

            <p>Select text and use the toolbar above to format your content.</p>
          </Box>
        </Box>
      </Container>

      {/* Image Options Dialog */}
      <Dialog.Root
        open={isImageDialogOpen}
        onOpenChange={(e) => setIsImageDialogOpen(e.open)}
        placement={"center"}
        bg=""
      >
        <Portal>
          <Dialog.Backdrop bg="" />
          <Dialog.Positioner>
            <Dialog.Content
              maxW="md"
              bg="#1f2937"
              borderRadius="lg"
              boxShadow="xl"
            >
              <Dialog.Header borderBottom="1px" borderColor="gray.200" pb={4}>
                <Dialog.Title fontSize="lg" fontWeight="600" color={"white"}>
                  Insert Image
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body py={6}>
                <VStack gap={3}>
                  <Button
                    onClick={handleUploadFromComputer}
                    w="full"
                    size="lg"
                    bg="#4b5563"
                    leftIcon={<Upload size={20} />}
                    _hover={{
                      bg: "green.500",
                    }}
                  >
                    Upload from Computer
                  </Button>
                  <Button
                    onClick={handleInsertFromUrl}
                    w="full"
                    size="lg"
                    bg="#4b5563"
                    leftIcon={<Link size={20} />}
                    _hover={{
                      bg: "green.500",
                    }}
                  >
                    Insert from URL
                  </Button>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer borderTop="1px" borderColor="gray.200" pt={4}>
                <Dialog.ActionTrigger asChild>
                  <Button bg="red.700" _hover={{ bg: "red.500" }}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger
                asChild
                position="absolute"
                top={4}
                right={4}
              >
                <IconButton
                  variant="ghost"
                  size="sm"
                  icon={<X size={18} />}
                  aria-label="Close"
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* URL Input Dialog */}
      <Dialog.Root
        open={isUrlDialogOpen}
        onOpenChange={(e) => setIsUrlDialogOpen(e.open)}
        placement={"center"}
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.600" />
          <Dialog.Positioner>
            <Dialog.Content
              maxW="md"
              bg="#1f2937"
              borderRadius="lg"
              boxShadow="xl"
            >
              <Dialog.Header borderBottom="1px" borderColor="gray.200" pb={4}>
                <Dialog.Title fontSize="lg" fontWeight="600" color="white">
                  Enter Image URL
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body py={6}>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  size="lg"
                  color="white"
                  outline={"none"}
                  border="1px solid #1f2937"
                  _hover={{
                    border: "1px solid white",
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
                />
              </Dialog.Body>
              <Dialog.Footer
                borderTop="1px"
                borderColor="gray.200"
                pt={4}
                gap={2}
              >
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="ghost"
                    bg="red.700"
                    _hover={{ bg: "red.500" }}
                    color={"white"}
                  >
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  onClick={handleUrlSubmit}
                  bg="#4b5563"
                  leftIcon={<Link size={20} />}
                  _hover={{
                    bg: "green.500",
                  }}
                >
                  Insert
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger
                asChild
                position="absolute"
                top={4}
                right={4}
              >
                <IconButton
                  variant="ghost"
                  size="sm"
                  icon={<X size={18} />}
                  aria-label="Close"
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* Delete Confirmation Dialog */}
      <Dialog.Root
        open={isDeleteDialogOpen}
        onOpenChange={(e) => setIsDeleteDialogOpen(e.open)}
        placement={"center"}
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.600" />
          <Dialog.Positioner>
            <Dialog.Content
              maxW="md"
              bg="#1f2937"
              borderRadius="lg"
              boxShadow="xl"
            >
              <Dialog.Header borderBottom="1px" borderColor="gray.200" pb={4}>
                <Dialog.Title fontSize="lg" fontWeight="600" color={"white"}>
                  Delete Image
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body py={6}>
                <Text color="gray.300">
                  Are you sure you want to delete this image? This action cannot
                  be undone.
                </Text>
              </Dialog.Body>
              <Dialog.Footer
                borderTop="1px"
                borderColor="gray.200"
                pt={4}
                gap={2}
              >
                <Dialog.ActionTrigger asChild>
                  <Button bg="green.700" _hover={{ bg: "green.500" }}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  onClick={handleDeleteImage}
                  bg="red.700"
                  _hover={{
                    bg: "red.500",
                  }}
                >
                  Delete
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger
                asChild
                position="absolute"
                top={4}
                right={4}
              >
                <IconButton
                  variant="ghost"
                  size="sm"
                  icon={<X size={18} />}
                  aria-label="Close"
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* Link Insertion Dialog */}
      <Dialog.Root
        open={isLinkDialogOpen}
        onOpenChange={(e) => setIsLinkDialogOpen(e.open)}
        placement={"center"}
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.600" />
          <Dialog.Positioner>
            <Dialog.Content
              maxW="md"
              bg="#1f2937"
              borderRadius="lg"
              boxShadow="xl"
            >
              <Dialog.Header borderBottom="1px" borderColor="gray.200" pb={4}>
                <Dialog.Title fontSize="lg" fontWeight="600" color={"white"}>
                  Insert Link
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack gap={4} align="stretch">
                  <Box>
                    <Box
                      bg="inherit"
                      borderRadius="md"
                      color="gray.300"
                      textAlign={"left"}
                    >
                      <p>
                        Selected Content to insert link -{" "}
                        <span style={{ color: "greenyellow" }}>
                          {selectedTextForLink}
                        </span>
                      </p>
                    </Box>
                  </Box>
                  <Box>
                    <Text
                      fontSize="sm"
                      fontWeight="500"
                      mb={2}
                      color="gray.300"
                    >
                      URL:
                    </Text>
                    <Input
                      placeholder="https://example.com"
                      border="1px solid #1f2937"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      size="lg"
                      onKeyDown={(e) => e.key === "Enter" && handleLinkSubmit()}
                      color={"white"}
                      _hover={{
                        border: "1px solid white",
                      }}
                    />
                  </Box>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer
                borderTop="1px"
                borderColor="gray.200"
                pt={4}
                gap={2}
              >
                <Dialog.ActionTrigger asChild>
                  <Button bg="red.700" _hover={{ bg: "red.500" }}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  onClick={handleLinkSubmit}
                  bg="#4b5563"
                  _hover={{ bg: "green.500" }}
                >
                  Insert Link
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger
                asChild
                position="absolute"
                top={4}
                right={4}
              >
                <IconButton
                  variant="ghost"
                  size="sm"
                  icon={<X size={18} />}
                  aria-label="Close"
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default Tiptap;
