"use strict";

import R from Ramda;

/**
 * Attached a special attribute _isDefined to specify that it's a default value
 * for complex objects otherwise it will just be null
 */
function default(fragment) {
  return R.merge(fragment, {'_default': true})
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
function Text() {
  return null
}
/**
 * Default value for a document link fragment (a link that is internal to a prismic.io repository)
 * @constructor
 * @global
 * @alias Fragments:DocumentLink
 */
function DocumentLink() {
  return default({
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
function WebLink() {
  return default({
    '_type': 'WebLink'
  })
}

/**
 * Default value for a file link fragment
 * @constructor
 * @global
 * @alias Fragments:FileLink
 */
function FileLink() {
  return default({
    '_type': 'FileLink'
  })
}

/**
 * Default value for an image link fragment
 * @constructor
 * @global
 * @alias Fragments:ImageLink
 */
function ImageLink() {
  return default({
    '_type': 'ImageLink'
  })
}

/**
 * Default value for a select fragment
 * @constructor
 * @global
 * @alias Fragments:Select
 */
function Select() {
  return null
}

/**
 * Default value for a color fragment
 * @constructor
 * @global
 * @alias Fragments:Color
 */
function Color() {
  return null
}

/**
 * Default value for a geopoint
 * @constructor
 * @global
 * @alias Fragments:GeoPoint
 */
function GeoPoint() {
  return default({
    '_type': 'GeoPoint'
  })
}

/**
 * Default value for a Number fragment
 * @constructor
 * @global
 * @alias Fragments:Num
 */
function Num() {
  return null
}

/**
 * Default value for a Date fragment
 * @constructor
 * @global
 * @alias Fragments:Date
 */
function DateFragment() {
  return null
}

/**
 * Default value for a Timestamp fragment
 * @constructor
 * @global
 * @alias Fragments:Timestamp
 */
function Timestamp() {
  return null
}

/**
 * Default value for an embed fragment
 * @constructor
 * @global
 * @alias Fragments:Embed
 */
function Embed() {
  return default({
    '_type': 'Embed'
  })
}

/**
 * Default value for an Image fragment
 * @constructor
 * @global
 * @alias Fragments:ImageEl
 */
function Image() {
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

  return default({
    '_type': 'Image'
  })
}


/**
 * Default value for a fragment of type "Separator" (only used in Slices)
 * @constructor
 * @global
 * @alias Fragments:Separator
 */
function Separator() {
  return null
}

/**
 * Default value for a fragment of type "Group" (which is a group of subfragments)
 * @constructor
 * @global
 * @alias Fragments:Group
 */
function Group() {
  return default({
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
function StructuredText() {
  return default({
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
function Slice() {
  return default({
    "_type": "Slice"
  })
}

/**
 * Default value for a SliceZone fragment
 * @constructor
 * @global
 * @alias Fragments:SliceZone
 */
function SliceZone() {
  return []
}

module.exports = {
  Embed: Embed,
  Image: Image,
  Text: Text,
  Number: Num,
  Date: DateFragment,
  Timestamp: Timestamp,
  Select: Select,
  Color: Color,
  StructuredText: StructuredText,
  WebLink: WebLink,
  DocumentLink: DocumentLink,
  ImageLink: ImageLink,
  FileLink: FileLink,
  Separator: Separator,
  Group: Group,
  GeoPoint: GeoPoint,
  Slice: Slice,
  SliceZone: SliceZone
};
