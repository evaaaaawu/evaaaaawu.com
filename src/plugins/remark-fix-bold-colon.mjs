import { visit } from 'unist-util-visit';

/**
 * Remark plugin to fix bold formatting with colons followed by text
 *
 * When markdown like **text：**text fails to parse (because ** followed immediately
 * by non-whitespace after punctuation is not valid emphasis syntax), it remains as
 * plain text in the AST. This plugin finds such patterns and converts them to proper
 * HTML strong tags.
 *
 * Transforms: **text：**text → **text：** text (by injecting HTML)
 */
export function remarkFixBoldColon() {
  return function transformer(tree) {
    visit(tree, 'text', (node, index, parent) => {
      if (!node.value) return;

      // Pattern to match: **[content][punctuation]**[non-whitespace]
      // This matches bold syntax that failed to parse
      const pattern = /\*\*([^*]+?[：:)）])\*\*(?=\S)/g;

      if (pattern.test(node.value)) {
        // Replace the pattern with proper HTML strong tags
        const fixedValue = node.value.replace(
          /\*\*([^*]+?[：:)）])\*\*(?=\S)/g,
          '<strong>$1</strong> '
        );

        // If the value changed, update it
        if (fixedValue !== node.value) {
          // Replace the text node with an HTML node
          node.type = 'html';
          node.value = fixedValue;
          delete node.data;
        }
      }
    });
  };
}
