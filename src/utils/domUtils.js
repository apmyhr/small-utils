const PAGE_META_TAG_DESCRIPTION = "pageMetaTagDescription";
const PAGE_META_TAG_TITLE = "pageMetaTagTitle";
const PAGE_META_TAG_KEYWORDS = "pageMetaTagKeywords";

/**
 * Update the SEO meta tags of the Head element in Document to reflect the current page.
 * @param {String} description 
 * @param {String} title 
 * @param {String} keywords 
 */
export function UpdatePageMetaTag(description, title, keywords){
    let metaDescirption = document.getElementById(PAGE_META_TAG_DESCRIPTION);
    let metaTitle = document.getElementById(PAGE_META_TAG_TITLE);
    let metaKeywords = document.getElementById(PAGE_META_TAG_KEYWORDS);
    metaDescirption.setAttribute("content", description);
    metaTitle.setAttribute("content", title);
    metaKeywords.setAttribute("content", keywords);
}