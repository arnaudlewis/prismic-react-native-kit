/*eslint-env node, mocha */

var Prismic = require('../dist/prismic.io.js');
var chai = require('chai');

var assert = chai.assert,
    microRepository = 'https://micro.prismic.io/api',
    previewToken = 'MC5VcXBHWHdFQUFONDZrbWp4.77-9cDx6C3lgJu-_vXZafO-_vXPvv73vv73vv70777-9Ju-_ve-_vSLvv73vv73vv73vv70O77-977-9Me-_vQ';

function getLinkResolver(ref) {
  return function(doc, isBroken) {
    if (isBroken) return '#broken';
    return "/testing_url/" + doc.id + "/" + doc.slug + (ref ? ('?ref=' + ref) : '');
  };
}

describe('Document manipulation', function() {

  it('Render a document to Html', function (done) {
    Prismic.api(microRepository, function (err, Api) {
      if (err) { done(err); return; }
      Api.form('everything').ref(Api.master()).submit(function (err, documents) {
        if (err) { done(err); return; }
        var first = documents.results[0];
        assert.notEqual(null, first);
        first.asHtml(getLinkResolver());
        done();
      });
    });
  });

});

describe('StructuredText', function() {
  it('asHtml handles span Link.file', function () {
    var jsonString = '{"type":"StructuredText","value":[{"type":"paragraph","text":"2012 Annual Report","spans":[{"start":0,"end":18,"type":"hyperlink","data":{"type":"Link.file","value":{"file":{"name":"2012_annual.report.pdf","kind":"document","url":"https://prismic-io.s3.amazonaws.com/annual.report.pdf","size":"1282484"}}}}]},{"type":"paragraph","text":"2012 Annual Budget","spans":[{"start":0,"end":18,"type":"hyperlink","data":{"type":"Link.file","value":{"file":{"name":"2012_smec.annual.budget.pdf","kind":"document","url":"https://prismic-io.s3.amazonaws.com/annual.budget.pdf","size":"59229"}}}}]},{"type":"paragraph","text":"2015 Vision & Strategic Plan","spans":[{"start":0,"end":28,"type":"hyperlink","data":{"type":"Link.file","value":{"file":{"name":"2015_vision.strategic.plan_.sm_.pdf","kind":"document","url":"https://prismic-io.s3.amazonaws.com/vision.strategic.plan_.sm_.pdf","size":"1969956"}}}}]}]}';
    var jsonObject = JSON.parse(jsonString);
    assert.equal(Prismic.Fragments.initField(null, jsonObject).asHtml(), '<p><a href=\"https://prismic-io.s3.amazonaws.com/annual.report.pdf\">2012 Annual Report</a></p><p><a href=\"https://prismic-io.s3.amazonaws.com/annual.budget.pdf\">2012 Annual Budget</a></p><p><a href=\"https://prismic-io.s3.amazonaws.com/vision.strategic.plan_.sm_.pdf\">2015 Vision &amp; Strategic Plan</a></p>');
  });

  it('Proper escaping in asHtml', function (done) {
    var jsonString = "{ \"type\": \"StructuredText\", \"value\": [ { \"type\": \"paragraph\", \"text\": \"<not a real tag>\\nsome text\", \"spans\": [] } ]}";
    var jsonObject = JSON.parse(jsonString);
    var text = Prismic.Fragments.initField(null, jsonObject);
    assert.equal(
      text.asHtml(),
      "<p>&lt;not a real tag&gt;<br>some text</p>"
    );
    done();
  });

});

describe('Various fragment types', function() {
/*
  it('Handles multiple fields', function (done) {
    Prismic.api(microRepository, function (err, Api) {
      if (err) throw err;
      Api.form('everything').query('[[:d = at(document.id, "UlfoxUnM0wkXYXbX")]]').ref(Api.master()).submit(function (err, documents) {
        if (err) throw err;
        assert.equal(documents.results[0].getAll('blog-post.relatedpost')[0].asHtml(getLinkResolver()), '<a href="/testing_url/UlfoxUnM0wkXYXbm/tips-to-dress-a-pastry">/testing_url/UlfoxUnM0wkXYXbm/tips-to-dress-a-pastry</a>');
        done();
      });
    }, previewToken);
  });

  it('ImageViews are well retrieved', function (done) {
    Prismic.api(microRepository, function (err, Api) {
      if (err) throw err;
      Api.form('everything').query('[[:d = at(document.id, "UlfoxUnM0wkXYXbO")]]').ref(Api.master()).submit(function (err, documents) {
        if (err) throw err;
        assert.equal(documents.results[0].getImageView('product.image', 'main').asHtml(), '<img src="https://prismic-io.s3.amazonaws.com/lesbonneschoses/f606ad513fcc2a73b909817119b84d6fd0d61a6d.png" width="500" height="500" alt="">');
        assert.equal(documents.results[0].getImageView('product.image', 'icon').asHtml(), '<img src="https://prismic-io.s3.amazonaws.com/lesbonneschoses/fe4f9379ee325456992d48204b8d94aeb60cc976.png" width="250" height="250" alt="">');
        done();
      });
    }, previewToken);
  });
*/
  it('GeoPoint is retrieved', function (done) {
    Prismic.api(microRepository, function (err, Api) {
      if (err) throw err;
      Api.form('everything').query('[[:d = at(document.id, "U9pjvjQAADAAehbf")]]').ref(Api.master()).submit(function (err, documents) {
        if (err) throw err;
        var html = '<div class="geopoint"><span class="latitude">48.87687670000001</span><span class="longitude">2.3338801999999825</span></div>';
        assert.equal(documents.results[0].getGeoPoint('contributor.location').asHtml(), html);
        done();
      });
    });
  });

  it('Date and Timestamp are parsed correctly', function () {
    var json = JSON.parse('{ "id": "UlfoxUnM0wkXYXbm", "type": "blog-post", "href": "https://lesbonneschoses-vcerzcwaaohojzo.prismic.io/api/documents/...",' +
      '"tags": [], "slugs": [], "linked_documents": [],' +
      '"data": { "blog-post": {' +
      '"date": { "type": "Date", "value": "2013-08-17" },' +
      '"timestamp": { "type": "Timestamp", "value": "2014-10-06T12:24:36+0000" } ' +
      '}}}');
    var doc = Prismic.parseDoc({}, json);
    var date = doc.getDate("blog-post.date");
    assert.equal(date.getFullYear(), 2013);
    var ts = doc.getTimestamp("blog-post.timestamp");
    assert.equal(ts.getFullYear(), 2014);
  });

  it('Block fragments are accessible, loopable, and serializable', function (done) {
    Prismic.api(microRepository, function (err, Api) {
      if (err) throw err;
      Api.form('everything').query('[[:d = at(document.id, "UrDndQEAALQMyrXF")]]').ref(Api.master()).submit(function (err, documents) {
        if (err) throw err;
        // Group fragments are accessible
        assert.equal(documents.results[0].getGroup('docchapter.docs').toArray()[0].getLink('linktodoc').value.document.type, 'doc');
        // Group fragments are loopable
        var slugs = "";
        for (var i = 0; i < documents.results[0].getGroup('docchapter.docs').toArray().length; i++) {
          slugs += documents.results[0].getGroup('docchapter.docs').toArray()[i].getLink('linktodoc').value.document.slug + ' ';
        }
        assert.equal(slugs.trim(), 'with-jquery with-bootstrap');
        // Group fragments are serializable when asHtml is called directly on them
        assert.equal(documents.results[0].getGroup('docchapter.docs').asHtml(getLinkResolver()),
          '<section data-field=\"linktodoc\"><a href=\"/testing_url/UrDofwEAALAdpbNH/with-jquery\">/testing_url/UrDofwEAALAdpbNH/with-jquery</a></section>' +
          '<section data-field=\"linktodoc\"><a href=\"/testing_url/UrDp8AEAAPUdpbNL/with-bootstrap\">/testing_url/UrDp8AEAAPUdpbNL/with-bootstrap</a></section>');
        // Group fragments are serializable when as Html is called on a document
        assert.equal(documents.results[0].asHtml(getLinkResolver()),
          '<section data-field=\"docchapter.title\"><h1>Using with other projects</h1></section>' +
          '<section data-field=\"docchapter.intro\"><p>As advertised, meta-micro knows how to stay out of the way of the rest of your application. Here are some cases of how to use it with some of the most used open-source projects in JavaScript.</p></section>' +
          '<section data-field=\"docchapter.priority\"><span>500</span></section>' +
          '<section data-field=\"docchapter.docs\">' +
          '<section data-field=\"linktodoc\"><a href=\"/testing_url/UrDofwEAALAdpbNH/with-jquery\">/testing_url/UrDofwEAALAdpbNH/with-jquery</a></section>' +
          '<section data-field=\"linktodoc\"><a href=\"/testing_url/UrDp8AEAAPUdpbNL/with-bootstrap">/testing_url/UrDp8AEAAPUdpbNL/with-bootstrap</a></section>' +
          '</section>');
        done();
      });
    });
  });

  it('Slices correctly parsed and serializable', function () {
    var doc = Prismic.parseDoc({}, {
      "id":"VQ_hV31Za5EAy02H",
      "uid":null,
      "type":"article",
      "href":"http://toto.wroom.dev/api/documents/search?ref=VQ_uWX1Za0oCy46m&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22VQ_hV31Za5EAy02H%22%29+%5D%5D",
      "tags":[],
      "slugs":["une-activite"],
      "linked_documents":[],
      "data":{
        "article":{
          "activities":{
            "type":"Group",
            "value":[{
              "title":{
                "type":"StructuredText",
                "value":[{
                  "type":"paragraph",
                  "text":"Une activité",
                  "spans":[]
                }]
              },
              "image":{
                "type":"Image",
                "value":{
                  "main":{
                    "url":"https://wroomdev.s3.amazonaws.com/toto/ce3f52b933c4934a13422e09ed0ff6ad03a29621_hsf_evilsquall.jpg",
                    "alt":"",
                    "copyright":"",
                    "dimensions":{"width":860,"height":640}
                  },
                  "views":{
                    "headline":{
                      "url":"https://wroomdev.s3.amazonaws.com/toto/5445d2dcd2b0c541b0406ca867ab3d07b309c944_hsf_evilsquall.jpg",
                      "alt":"",
                      "copyright":"",
                      "dimensions":{"width":570,"height":400}
                    }
                  }
                }
              },
              "body":{
                "type":"StructuredText",
                "value":[{
                  "type":"paragraph",
                  "text":"elle est bien",
                  "spans":[]
                }]
              }
            }]
          },
          "un_champ_texte":{
            "type":"Text",
            "value":"stuffgg"
          },
          "blocks":{
            "type":"SliceZone",
            "value":[{
              "type":"Slice",
              "slice_type": "features",
              "value":{
                "type":"Group",
                "value":[{
                  "illustration":{
                    "type":"Image",
                    "value":{
                      "main":{
                        "url":"https://wroomdev.s3.amazonaws.com/toto/db3775edb44f9818c54baa72bbfc8d3d6394b6ef_hsf_evilsquall.jpg",
                        "alt":"",
                        "copyright":"",
                        "dimensions":{"width":4285,"height":709}
                      },
                      "views":{}
                    }
                  },
                  "title":{
                    "type":"Text",
                    "value":"c'est un bloc features"
                  }
                }]
              }
            },{
              "type":"Slice",
              "slice_type":"text",
              "value":{
                "type":"StructuredText",
                "value":[{
                  "type":"paragraph",
                  "text":"C'est un bloc content",
                  "spans":[]
                }]
              }
            }]
          }
        }
      }
    });
    var slices = doc.getSliceZone('article.blocks');
    assert.equal(slices.asText(getLinkResolver()), "c'est un bloc features\n\nC'est un bloc content\n");
    assert.equal(slices.asHtml(getLinkResolver()), '<div data-slicetype="features" class="slice"><section data-field="illustration"><img src="https://wroomdev.s3.amazonaws.com/toto/db3775edb44f9818c54baa72bbfc8d3d6394b6ef_hsf_evilsquall.jpg" width="4285" height="709" alt=""></section><section data-field="title"><span>c\'est un bloc features</span></section></div><div data-slicetype="text" class="slice"><p>C\'est un bloc content</p></div>');
  });


  it('Slices correctly handle document links when rendering as text', function () {
    var doc = Prismic.parseDoc({}, {
      "id":"VQ_hV31Za5EAy02H",
      "uid":null,
      "type":"article",
      "href":"http://toto.wroom.dev/api/documents/search?ref=VQ_uWX1Za0oCy46m&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22VQ_hV31Za5EAy02H%22%29+%5D%5D",
      "tags":[],
      "slugs":["une-activite"],
      "linked_documents":[],
      "data":{
        "article":{
          "blocks":{
            "type":"SliceZone",
            "value":[{
              "type":"Slice",
              "slice_type": "link",
              "value":{
                "type":"Link.document",
                "value": {
                  "document": {
                    "id": "UrDejAEAAFwMyrW9",
                    "type": "doc",
                    "tags": [],
                    "slug": "installing-meta-micro"
                  },
                  "isBroken": false
                }
              }
            },{
              "type":"Slice",
              "slice_type":"text",
              "value":{
                "type":"StructuredText",
                "value":[{
                  "type":"paragraph",
                  "text":"C'est un bloc content",
                  "spans":[]
                }]
              }
            }]
          }
        }
      }
    });
    var slices = doc.getSliceZone('article.blocks');
    assert.equal(slices.asText(getLinkResolver()), "/testing_url/UrDejAEAAFwMyrW9/installing-meta-micro\nC'est un bloc content\n");
  });

  it('Number correctly null content when rendering as text', function () {
    var doc = Prismic.parseDoc({}, {
      "id":"VQ_hV31Za5EAy02H",
      "uid":null,
      "type":"article",
      "href":"http://toto.wroom.dev/api/documents/search?ref=VQ_uWX1Za0oCy46m&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22VQ_hV31Za5EAy02H%22%29+%5D%5D",
      "tags":[],
      "slugs":["une-activite"],
      "linked_documents":[],
      "data":{
        "article":{
          "number":{
            "type":"Number",
            "value":null
          }
        }
      }
    });
    assert.equal(doc.asText(getLinkResolver()), "");
  });
});
