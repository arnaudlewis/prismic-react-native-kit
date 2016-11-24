"use strict";

import R from 'ramda';

/**
 * Attached a special attribute _isDefined to specify that it's a default value
 * for complex objects otherwise it will just be null
 */
function _default(fragment) {
  return R.merge(fragment, {'_default': true});
}

function dummyNullable() {
  return null;
}

function dummyAsArray() {
  return [];
}

function dummyAsObject() {
  return [];
}


/**
 * Default value for a plain text fragment (beware: not a structured text)
 * @constructor
 * @global
 * @alias Fragments:Text
 */
export const Text = function() {
  return null
}
/**
 * Default value for a document link fragment (a link that is internal to a prismic.io repository)
 * @constructor
 * @global
 * @alias Fragments:DocumentLink
 */
export const DocumentLink = function() {
  return _default({
    '_type': 'DocumentLink',
    '_isBroken': true
  })
}

/**
 * Default value for a web link fragment
 * @constructor
 * @global
 * @alias Fragments:WebLink
 */
export const WebLink = function() {
  return _default({
    '_type': 'WebLink'
  })
}

/**
 * Default value for a file link fragment
 * @constructor
 * @global
 * @alias Fragments:FileLink
 */
export const FileLink = function() {
  return _default({
    '_type': 'FileLink'
  })
}

/**
 * Default value for an image link fragment
 * @constructor
 * @global
 * @alias Fragments:ImageLink
 */
export const ImageLink = function() {
  return _default({
    '_type': 'ImageLink'
  })
}

/**
 * Default value for a select fragment
 * @constructor
 * @global
 * @alias Fragments:Select
 */
export const Select = function() {
  return null
}

/**
 * Default value for a color fragment
 * @constructor
 * @global
 * @alias Fragments:Color
 */
export const Color = function() {
  return null
}

/**
 * Default value for a geopoint
 * @constructor
 * @global
 * @alias Fragments:GeoPoint
 */
export const GeoPoint = function() {
  return _default({
    '_type': 'GeoPoint'
  })
}

/**
 * Default value for a Number fragment
 * @constructor
 * @global
 * @alias Fragments:Num
 */
export const Num = function() {
  return null
}

/**
 * Default value for a Date fragment
 * @constructor
 * @global
 * @alias Fragments:Date
 */
export const DateFragment = function() {
  return null
}

/**
 * Default value for a Timestamp fragment
 * @constructor
 * @global
 * @alias Fragments:Timestamp
 */
export const Timestamp = function() {
  return null
}

/**
 * Default value for an embed fragment
 * @constructor
 * @global
 * @alias Fragments:Embed
 */
export const Embed = function() {
  return _default({
    '_type': 'Embed'
  })
}

/**
 * Default value for an Image fragment
 * @constructor
 * @global
 * @alias Fragments:ImageEl
 */
export const Image = function() {
  var output = {
    '_type': 'Image',
    'alt': main.alt,
    'url': main.url,
    'width': main.dimensions.width,
    'height': main.dimensions.height
  }

  for (var name in views) {
    var img = views[name]
    output[name] = {
      'alt': img.alt,
      'url': img.url,
      'width': img.dimensions.width,
      'height': img.dimensions.height,
    }
  }
  return output

  return _default({
    '_type': 'Image'
  })
}


/**
 * Default value for a fragment of type "Separator" (only used in Slices)
 * @constructor
 * @global
 * @alias Fragments:Separator
 */
export const Separator = function() {
  return null
}

/**
 * Default value for a fragment of type "Group" (which is a group of subfragments)
 * @constructor
 * @global
 * @alias Fragments:Group
 */
export const Group = function() {
  return _default({
    '_type': 'Group',
    'docs': []
  })
}

/**
 * Default value for a structured text fragment
 * @constructor
 * @global
 * @alias Fragments:StructuredText
 */
export const StructuredText = function() {
  return _default({
    '_type': 'StructuredText',
    '_data': [],
    'firstTitle': dummy,
    'firstParagraph': dummy,
    'firstImage': dummy,
    'paragraphs': dummyAsArray,
    'paragraph': dummy,
    'asText': dummy,
    'asHtml': dummy
  })
}

/**
 * Default value for a Slice fragment
 * @constructor
 * @global
 * @alias Fragments:Slice
 */
export const Slice = function() {
  return _default({
    "_type": "Slice"
  })
}

/**
 * Default value for a SliceZone fragment
 * @constructor
 * @global
 * @alias Fragments:SliceZone
 */
export const SliceZone = function() {
  return []
}
