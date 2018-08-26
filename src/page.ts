export default class Page {
  xpathDocText: string;
  xpathNodeText: string;

  static readonly forbiddenNodeRegExp = new RegExp('^\s*(<[a-z].+?\/?>|{.+?:.+?;.*}|https?:\/\/[^\s]+$)');
  static readonly xpathDocText = '//*[not(self::script or self::style)]/text()[normalize-space(.) != \"\"]';
  static readonly xpathNodeText = './/*[not(self::script or self::style)]/text()[normalize-space(.) != \"\"]';

  // Returns true if a node should *not* be altered in any way
  // Credit: https://github.com/ericwbailey/millennials-to-snake-people/blob/master/Source/content_script.js
  static isForbiddenNode(node: any): boolean {
    return Boolean(
      node.isContentEditable || // DraftJS and many others
      (node.parentNode &&
        (
          node.parentNode.isContentEditable || // Special case for Gmail
          node.parentNode.tagName == 'SCRIPT' ||
          node.parentNode.tagName == 'STYLE' ||
          node.parentNode.tagName == 'INPUT' ||
          node.parentNode.tagName == 'TEXTAREA' ||
          node.parentNode.tagName == 'IFRAME'
        )
      ) || // Some catch-alls
      (node.tagName &&
        (
          node.tagName == 'SCRIPT' ||
          node.tagName == 'STYLE' ||
          node.tagName == 'INPUT' ||
          node.tagName == 'TEXTAREA' ||
          node.tagName == 'IFRAME'
        )
      )
    );
  }
}