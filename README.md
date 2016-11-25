# JavaScript development kit for prismic.io

[![npm version](https://badge.fury.io/js/alw-prismic.io.svg)](http://badge.fury.io/js/alw-prismic.io)
[![Build Status](https://api.travis-ci.org/arnaudlewis/prismic-jskit-v4.png)](https://travis-ci.org/arnaudlewis/prismic-jskit-v4)

* The [source code](https://github.com/arnaudlewis/prismic-jskit-v4) is on Github.
* The [Changelog](https://github.com/arnaudlewis/prismic-jskit-v4/releases) is on Github's releases tab.

------------------------------------


[1. Installation](#installation)
--------------------------------

> [NPM](#npm) <br />
> [CDN](#cdn) <br />
> [Downloadable version](#downloadable-version) <br />

[2. Documentation: Manage your Fields](#documentation)
-----------------------------------------------------

> [Embed](#embed) <br />
> [Image](#image) <br />
> [Text](#text) <br />
> [Number](#number) <br />
> [Date](#date) <br />
> [Timestamp](#timestamp) <br />
> [Select](#select) <br />
> [Color](#color) <br />
> [StructuredText](#structuredText) <br />
> [WebLink](#weblink) <br />
> [DocumentLink](#documentlink) <br />
> [ImageLink](#imagelink) <br />
> [FileLink](#filelink) <br />
> [Separator](#separator) <br />
> [Group](#group) <br />
> [GeoPoint](#geopoint) <br />
> [Slices](#slices) <br />


===================================================

## Installation

### NPM

```sh
npm install alw-prismic.io --save
```

### CDN

```
https://unpkg.com/alw-prismic.io/dist/prismic.io.min.js
```

(You may need to adapt the version number)

### Downloadable version

On our release page: [https://github.com/arnaudlewis/prismic-jskit-v4/releases](https://github.com/arnaudlewis/prismic-jskit-v4/releases).

The kit is universal, it can be used:

* Server-side with NodeJS
* Client-side as part of your build with Browserify, Webpack (you need a [Promise polyfill](https://github.com/jakearchibald/es6-promise) to support IE11 and below)
* Client-side with a simple script tag

## Documentation
In this kit, everything is similar to the official Prismic javascript-kit except on the template part.
In each case, you will have a snippet of the custom type and one of your code in a JS Template.
We'll consider that we have a `doc' parameter in each template snippet corresponding to the fetched prismic document.
Don't need to prevent Runtime exception for complex JSON object, the kit take care of that for your with default value if the fragment is missing from the API.

For basic fragments like Text, Date, Number... the default value will be `null`.
For Complex fragments like Embed, StructuredText, Links... the default value will be an Object with a special key `_default` set to `true` and all the usual deepest values or functions will return null or empty array.

**doc.myStructuredText**

```
doc.myStructuredText

/* return value */
{
    '_default': true,
    '_type': 'StructuredText',
    '_data': [],
    'firstTitle': dummy,
    'firstParagraph': dummy,
    'firstImage': dummy,
    'paragraphs': dummyAsArray,
    'paragraph': dummy,
    'asText': dummy,
    'asHtml': dummy
}
//dummy return null
//dummyArray return empty array
```
**doc.myStructuredText.asHtml()**
```
doc.myStructuredText.asHtml()

/* return value */
null
```

### Embed
Custom type
```
"video" : {
  "type" : "Embed"
}
```

Template JS
```
doc.video.url
```

### Image
Custom type
```
"photo" : {
  "type" : "Image",
  "fieldset" : "Image",
  "config" : {
    "constraint" : {
      "width" : 300,
      "height" : 300
    },
    "thumbnails" : [ {
      "name" : "Small",
      "width" : 100,
      "height" : 100
    }, {
      "name" : "Medium",
      "width" : 200,
      "height" : 200
    }, {
      "name" : "Large",
      "width" : 300,
      "height" : 300
    } ]
  }
}
```
Template JS
```
//main view
doc.photo.url
doc.photo.alt
doc.photo.width
doc.photo.height

//thumbnails => example for small view
doc.photo.small.url
doc.photo.small.alt
doc.photo.small.width
doc.photo.small.height
```
### Text
Custom type
```
"title" : {
  "type" : "Text",
}
```

Template JS
```
doc.title
```
### Number
Custom type
```
"count" : {
  "type" : "Text",
}
```

Template JS
```
doc.count
```
### Date
Custom type
```
"publication" : {
  "type" : "Date",
}
```

Template JS
```
doc.publication
```
### Timestamp
Custom type
```
"time" : {
  "type" : "Timestamp",
}
```

Template JS
```
doc.time
```
### Select
Custom type
```
"gender" : {
  "type" : "Select",
}
```

Template JS
```
doc.gender
```
### Color
Custom type
```
"background" : {
  "type" : "Color",
}
```

Template JS
```
doc.background
```
### StructuredText
Custom type
```
"description" : {
  "type" : "StructuredText",
}
```

Template JS
```
doc.description.asText() //plain text
doc.description.asHtml(ctx.linkResolver)
doc.description.firstTitle()
doc.description.firstImage()
doc.description.firstParagraph()
doc.description.getParagraphs() // array of paragraphs
doc.description.getParagraph(3) // paragraph index 3
```

### WebLink
Custom type
```
"linktoweb" : {
  "type" : "Link",
  "config" : {
    "select" : "web"
  }
}
```

Template JS
```
doc.linktoweb.url
```
### DocumentLink
Custom type
```
"linktodoc" : {
  "type" : "Link",
  "config" : {
    "select" : "document",
    "customtypes" : [ <your-custom-type-id> ],
    "tags" : [ <your-tag> ],
  }
}
```

Template JS
```
doc.linktodoc.url(ctx.linkResolver)
```
### ImageLink
Custom type
```
"linktomedia" : {
  "type" : "Link",
  "config" : {
    "select" : "media"
  }
}
```

Template JS
```
doc.linktomedia.url
```
### FileLink
Custom type
```
"linktofile" : {
  "type" : "Link",
  "config" : {
    "select" : "media"
  }
}
```

Template JS
```
doc.linktofile.url
```
### Group
Custom type
```
"feature" : {
  "type" : "Group",
  "repeat": true, //default to true but put explicitly for the example
  "config" : {
    "field" : {
        "title" : {
          "type" : "Text",
        },
        "description" : {
          "type" : "StructuredText",
        }
    }
  }
}
```

Template JS
```
doc.feature.forEach(item => {
    item.title
    item.description.asHtml()
})
```
### GeoPoint
Custom type
```
"location" : {
  "type" : "GeoPoint",
}
```

Template JS
```
doc.location.latitude
doc.location.longitude
```
### Slices
**Slice with Group as value**
The Group value will be put directly as Slice value
Custom type
```
"contentAsSlices" : {
    "fieldset" : "Dynamic page zone...",
    "type" : "Slices",
    "config" : {
        "choices" : {
            "slides" : {
                "type" : "Group",
                //required to display name in slice select in the writing room
                "fieldset" : "Slides",
                "config" : {
                    "fields" : {
                        "illustration" : {
                          "type" : "Image"
                        },
                        "title" : {
                          "type" : "StructuredText"
                        }
                    }
                }
            }
        }
    }
}
```

Template JS
```
for(slice in doc.contentAsSlices) {
    switch(slice._sliceType) {
        case 'slides':
            slice.illustration.url
            slice.title
            break

        default:
            return
    }
}

```
**Slice with basic fragment like Text as value**
The fragment value will be put directly as Slice value
Custom type
```
"contentAsSlices" : {
    "fieldset" : "Dynamic page zone...",
    "type" : "Slices",
    "config" : {
        "choices" : {
            "description" : {
              "type" : "StructuredText"
            }
        }
    }
}
```

Template JS
```
for(slice in doc.contentAsSlices) {
    switch(slice._sliceType) {
        case 'description':
            slice.value.asHtml()
            break

        default:
            return
    }
}

```


It'll come soon!
You'll find here all the documentation to get your content for each kind of prismic fragment.

## License

This software is licensed under the Apache 2 license, quoted below.

Copyright 2013-2016 Zengularity (http://www.zengularity.com).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
