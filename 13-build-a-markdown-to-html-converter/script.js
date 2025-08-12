function convertMarkdown() {
  var inputEl = document.getElementById('markdown-input');
  var raw = inputEl.value || '';
  // Split into lines and process per line so that heading/blockquote rules only apply when token begins a line.
  var lines = raw.split(/\r?\n/);
  var outParts = [];

  // Helper to convert inline elements (images, links, bold, italic)
  function convertInline(text) {
    if (!text) return '';

    // Images first: ![alt](src)
    text = text.replace(/!\[([^\]]*?)\]\(([^)]+?)\)/g, function (_, alt, src) {
      alt = alt.replace(/"/g, '&quot;');
      return '<img alt="' + alt + '" src="' + src + '">';
    });

    // Links next: [text](url)
    text = text.replace(/\[([^\]]+?)\]\(([^)]+?)\)/g, function (_, txt, url) {
      return '<a href="' + url + '">' + txt + '</a>';
    });

    // Bold: **text** or __text__
    text = text.replace(/(\*\*|__)([\s\S]+?)\1/g, function (_, delim, content) {
      return '<strong>' + content + '</strong>';
    });

    // Italic: *text* or _text_
    // Avoid matching the '*' from bold which we already converted.
    text = text.replace(
      /(\*|_)([^*_][\s\S]*?)\1/g,
      function (_, delim, content) {
        return '<em>' + content + '</em>';
      }
    );

    return text;
  }

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    // Check for headings at start of line (allow leading spaces): #, ##, ###
    var hMatch = line.match(/^\s*(#{1,3})\s+(.*)$/);
    if (hMatch) {
      var lvl = hMatch[1].length;
      var inner = convertInline(hMatch[2].trim());
      outParts.push('<h' + lvl + '>' + inner + '</h' + lvl + '>');
      continue;
    }

    // Check for blockquote (line-start > followed by space)
    var qMatch = line.match(/^\s*>\s+(.*)$/);
    if (qMatch) {
      var qInner = convertInline(qMatch[1].trim());
      outParts.push('<blockquote>' + qInner + '</blockquote>');
      continue;
    }

    // If line is blank, we skip adding anything (the tests expect concatenated HTML for non-empty items).
    if (line.trim() === '') {
      continue;
    }

    // Otherwise treat the whole line as inline content (no paragraph tags required by the spec).
    outParts.push(convertInline(line));
  }

  var result = outParts.join('');
  // display raw HTML code
  var htmlOutput = document.getElementById('html-output');
  if (htmlOutput) {
    // show raw HTML code — use textContent so HTML is visible as text
    htmlOutput.textContent = result;
  }
  // render preview
  var preview = document.getElementById('preview');
  if (preview) {
    preview.innerHTML = result;
  }
  return result;
}

// Update live on input
document
  .getElementById('markdown-input')
  .addEventListener('input', convertMarkdown);

// Initial render
window.addEventListener('DOMContentLoaded', function () {
  convertMarkdown();
});
