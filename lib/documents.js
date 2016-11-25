"use strict";

/**
 * Embodies a document as returned by the API.
 * Most useful fields: id, type, tags, slug, slugs
 * @constructor
 * @global
 * @alias Doc
 */
function Document(id, uid, type, mask, href, tags, slugs, firstPublicationDate, lastPublicationDate, data) {
  var doc = {
    /**
     * The ID of the document
     * @type {string}
     */
    '_id': id,
    /**
     * The User ID of the document, a human readable id
     * @type {string|null}
     */
    '_uid': uid,
    /**
     * The type of the document, corresponds to a document mask defined in the repository
     * @type {string}
     */
    '_type': type,
    /**
     * The URL of the document in the API
     * @type {string}
     */
    '_href': href,
    /**
     * The tags of the document
     * @type {array}
     */
    '_tags': tags,
    /**
     * The current slug of the document, "-" if none was provided
     * @type {string}
     */
    '_slug': slugs ? slugs[0] : "-",
    /**
     * All the slugs that were ever used by this document (including the current one, at the head)
     * @type {array}
     */
    '_slugs': slugs,
    /**
     * The original JSON data from the API
     */
    '_data': data,
     /**
     * The first publication date of the document
     */
    '_firstPublicationDate': firstPublicationDate ? new Date(firstPublicationDate) : null,
    /**
     * The last publication date of the document
     */
    '_lastPublicationDate': lastPublicationDate ? new Date(lastPublicationDate) : null
  };

  var fragments = require('./fragments').parseFragments(data, mask);
  for (var key in fragments) {
    if (fragments.hasOwnProperty(key)) {
      doc[fieldKey(key, type)] = fragments[key];
    }
  }
  return doc;
}

function fieldKey(key, docType) {
  var docTypeRegex = `^${docType}\\..*`;
  if(key.match(docTypeRegex)) {
    return key.replace(`${docType}.`, '');
  } else {
    return key;
  }
}

function GroupDoc(mask, data) {
  var doc = {
    '_data': data
  };
  var fragments = require('./fragments').parseFragments(data, mask);
  for (var key in fragments) {
    if (fragments.hasOwnProperty(key)) {
      doc[key] = fragments[key];
    }
  }
  return doc;
}

module.exports = {
  Document: Document,
  GroupDoc: GroupDoc
};
