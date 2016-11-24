export default function () {
  return {
    demo: {
      "Basic Types" : {
        "uid" : {
          "type" : "UID",
          "config" : {
            "placeholder" : "Unique Document Identifier"
          }
        },
        "text" : {
          "type" : "Text",
          "fieldset" : "Basic Text Field",
          "config" : {
            "label" : "Label"
          }
        },
        "select" : {
          "type" : "Select",
          "fieldset" : "Select",
          "config" : {
            "label" : "Select",
            "options" : ["Option 2"],
            "placeholder" : "Option 1"
          }
        },
        "color" : {
          "type" : "Color",
          "fieldset" : "Colorpicker",
          "config" : {
            "label" : "Color"
          }
        },
        "timestamp" : {
          "type" : "Timestamp",
          "fieldset" : "Timestamp",
          "config" : {
            "label" : "Timestamp"
          }
        },
        "date" : {
          "type" : "Date",
          "fieldset" : "Date",
          "config" : {
            "label" : "Date"
          }
        },
        "autoupdatedate" : {
          "type" : "Date",
          "fieldset" : "Autoupdate Date",
          "config" : {
            "label" : "Autoupdate Date",
            "update" : "now"
          }
        },
        "range" : {
          "type" : "Range",
          "fieldset" : "Range",
          "config" : {
            "label" : "Range",
            "min" : 10,
            "max" : 100
          }
        },
        "number" : {
          "type" : "Number",
          "fieldset" : "Number",
          "config" : {
            "label" : "Number",
            "min" : 10,
            "max" : 20
          }
        }
      },
      "Structured Text" : {
        "body" : {
          "type" : "StructuredText",
          "fieldset" : "A constraint free Text field with labels examples",
          "config" : {
            "placeholder" : "You can write several paragraphs here including images, using all formatting options, you can apply specific labels to text or images",
            "labels" : {
              "image" : [{
                "name" : "image-left",
                "icon" : "indent"
              }, {
                "name" : "image-overflow-left",
                "icon" : "outdent"
              }, {
                "name" : "image-full-column",
                "icon" : "align-justify"
              }, {
                "name" : "image-overflow-both",
                "icon" : "align-center"
              }, {
                "name" : "image-full-width",
                "icon" : "arrows-alt"
              }],
              "paragraph" : [{
                "name" : "image-label",
                "icon" : "picture-o"
              }, {
                "name" : "block-quotation",
                "icon" : "quote-left"
              }, {
                "name" : "block-citation",
                "icon" : "angle-double-left"
              }]
            }
          }
        }
      },
      "Images and Links" : {
        "photo" : {
          "type" : "Image",
          "fieldset" : "Image",
          "config" : {
            "thumbnails" : [{
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
            }]
          }
        },
        "location" : {
          "type" : "GeoPoint",
          "fieldset" : "Location link"
        },
        "embed" : {
          "type" : "Embed",
          "fieldset" : "OEmbed link",
          "config" : {
            "placeholder" : "Paste a OEmbed supporting service resource URL"
          }
        },
        "weblink" : {
          "type" : "Link",
          "fieldset" : "Link to the web",
          "config" : {
            "select" : "web",
            "placeholder" : "Link to the web"
          }
        },
        "documentlink" : {
          "type" : "Link",
          "fieldset" : "Link to a document",
          "config" : {
            "select" : "document",
            "masks" : ["mask"],
            "tags" : ["tag"],
            "placeholder" : "Link to a document"
          }
        },
        "medialink" : {
          "type" : "Link",
          "fieldset" : "Link to a media library item",
          "config" : {
            "select" : "media",
            "placeholder" : "Link to a media library item"
          }
        },
        "link" : {
          "type" : "Link",
          "fieldset" : "Link to anything",
          "config" : {
            "placeholder" : "Link to anything"
          }
        }
      },
      "Groups" : {
        "linksgroup" : {
          "type" : "Group",
          "fieldset" : "Group of 2 fields",
          "config" : {
            "fields" : {
              "label" : {
                "type" : "StructuredText",
                "config" : {
                  "placeholder" : "Link label"
                }
              },
              "link" : {
                "type" : "Link",
                "config" : {
                  "select" : "web"
                }
              }
            }
          }
        }
      },
      "Content Slices" : {
        "contentslices" : {
          "fieldset" : "Dynamic page zone...",
          "type" : "Slices",
          "config" : {
            "labels" : {
              "alternated-highlights" : [{
                "name" : "full",
                "display" : "Full featured"
              }, {
                "name" : "round",
                "display" : "Rounded"
              }],
              "featured-items" : [{
                "name" : "full",
                "display" : "Full featured"
              }, {
                "name" : "mini",
                "display" : "Mini"
              }, {
                "name" : "micro",
                "display" : "Micro"
              }, {
                "name" : "preview",
                "display" : "With preview"
              }, {
                "name" : "simple",
                "display" : "Simple"
              }],
              "slides" : [{
                "name" : "small",
                "display" : "Small"
              }, {
                "name" : "medium",
                "display" : "Medium"
              }],
              "video_banner" : [{
                "name" : "video-banner-dark small",
                "display" : "Dark small"
              }, {
                "name" : "video-banner-dark medium",
                "display" : "Dark medium"
              }, {
                "name" : "video-banner-light small",
                "display" : "Light small"
              }, {
                "name" : "video-banner-light medium",
                "display" : "Light medium"
              }, {
                "name" : "video-banner-light",
                "display" : "Light Large"
              }, {
                "name" : "video-banner-dark",
                "display" : "Dark large"
              }],
              "faq" : [{
                "display" : "1 column",
                "name" : "col-1"
              }, {
                "display" : "2 columns",
                "name" : "col-2"
              }],
              "section-header" : [{
                "display" : "2 columns",
                "name" : "section-header-col-2"
              }, {
                "display" : "3 columns",
                "name" : "section-header-col-3"
              }, {
                "display" : "Centered",
                "name" : "section-header-centered"
              }, {
                "display" : "Centered 2 columns",
                "name" : "section-header-col-2-centered"
              }, {
                "display" : "Centered 3 columns",
                "name" : "section-header-col-3-centered"
              }],
              "text" : [{
                "display" : "2 columns",
                "name" : "text-col-2"
              }, {
                "display" : "3 columns",
                "name" : "text-col-3"
              }, {
                "display" : "Centered",
                "name" : "text-centered"
              }, {
                "display" : "Centered 2 columns",
                "name" : "text-col-2-centered"
              }, {
                "display" : "Centered 3 columns",
                "name" : "text-col-3-centered"
              }],
              "separator" : [{
                "name" : "small",
                "display" : "Small"
              }, {
                "name" : "medium",
                "display" : "Medium"
              }]
            },
            "choices" : {
              "alternated-highlights" : {
                "type" : "Group",
                "fieldset" : "Alternated highlights",
                "config" : {
                  "fields" : {
                    "illustration" : {
                      "type" : "Image",
                      "config" : {
                        "constraint" : {
                          "width" : 1400,
                          "height" : 800
                        }
                      }
                    },
                    "title" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Item title...",
                        "single" : "heading3"
                      }
                    },
                    "summary" : {
                      "type" : "StructuredText",
                      "fieldset" : "Short Summary",
                      "config" : {
                        "placeholder" : "Item summary...",
                        "single" : "paragraph"
                      }
                    },
                    "read-more" : {
                      "type" : "Link",
                      "config" : {
                        "placeholder" : "Button link..."
                      }
                    },
                    "read-more-label" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Button label...",
                        "single" : "paragraph"
                      }
                    }
                  }
                }
              },
              "featured-items" : {
                "type" : "Group",
                "fieldset" : "Featured items",
                "config" : {
                  "fields" : {
                    "illustration" : {
                      "type" : "Image",
                      "config" : {
                        "constraint" : {
                          "height" : 1200
                        },
                        "thumbnails" : [{
                          "name" : "Icon",
                          "width" : 300,
                          "height" : 300
                        }]
                      }
                    },
                    "title" : {
                      "type" : "StructuredText",
                      "config" : {
                        "single" : "heading3",
                        "placeholder" : "Item title..."
                      }
                    },
                    "summary" : {
                      "type" : "StructuredText",
                      "fieldset" : "Short Summary",
                      "config" : {
                        "placeholder" : "Item summary...",
                        "single" : "paragraph"
                      }
                    },
                    "read-more" : {
                      "type" : "Link",
                      "config" : {
                        "placeholder" : "Button link..."
                      }
                    },
                    "read-more-label" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Link label...",
                        "single" : "paragraph"
                      }
                    }
                  }
                }
              },
              "slides" : {
                "type" : "Group",
                "fieldset" : "Slides",
                "config" : {
                  "fields" : {
                    "illustration" : {
                      "type" : "Image"
                    },
                    "title" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Slide title...",
                        "multi" : "heading1,heading2"
                      }
                    },
                    "summary" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Short Summary..."
                      }
                    },
                    "read-more" : {
                      "type" : "Link",
                      "config" : {
                        "placeholder" : "Button link"
                      }
                    },
                    "read-more-label" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Button label...",
                        "single" : "paragraph"
                      }
                    },
                    "optional-link" : {
                      "type" : "Link",
                      "config" : {
                        "placeholder" : "Standard link..."
                      }
                    },
                    "optional-link-label" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Link label..."
                      }
                    }
                  }
                }
              },
              "video_banner" : {
                "type" : "Group",
                "fieldset" : "Video banner",
                "config" : {
                  "repeat" : false,
                  "fields" : {
                    "illustration" : {
                      "type" : "Image"
                    },
                    "video_link" : {
                      "type" : "Link",
                      "config" : {
                        "label" : "Video link"
                      }
                    },
                    "video_interactive" : {
                      "type" : "Select",
                      "config" : {
                        "placeholder" : "Disabled",
                        "label" : "Interactive mode",
                        "options" : ["Enabled"]
                      }
                    },
                    "video_autoplay" : {
                      "type" : "Select",
                      "config" : {
                        "placeholder" : "Disabled",
                        "label" : "Autoplay",
                        "options" : ["Enabled"]
                      }
                    },
                    "video_loop" : {
                      "type" : "Select",
                      "config" : {
                        "placeholder" : "Disabled",
                        "label" : "Loop",
                        "options" : ["Enabled"]
                      }
                    },
                    "title" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Slide title...",
                        "multi" : "heading1,heading2"
                      }
                    },
                    "summary" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Short Summary..."
                      }
                    }
                  }
                }
              },
              "section-header" : {
                "type" : "Group",
                "fieldset" : "Section Header",
                "config" : {
                  "repeat" : false,
                  "fields" : {
                    "title" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Section name...",
                        "single" : "heading2"
                      }
                    },
                    "summary" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Section summary...",
                        "single" : "paragraph"
                      }
                    }
                  }
                }
              },
              "text" : {
                "type" : "Group",
                "fieldset" : "Text",
                "config" : {
                  "repeat" : false,
                  "fields" : {
                    "content" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Start typing...",
                        "multi" : "paragraph"
                      }
                    }
                  }
                }
              },
              "separator" : {
                "type" : "Group",
                "fieldset" : "Separator",
                "config" : {
                  "repeat" : false,
                  "fields" : {
                    "sep" : {
                      "type" : "Separator"
                    }
                  }
                }
              },
              "faq" : {
                "type" : "Group",
                "fieldset" : "FAQ",
                "config" : {
                  "fields" : {
                    "question" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Question...",
                        "single" : "heading3"
                      }
                    },
                    "answer" : {
                      "type" : "StructuredText",
                      "config" : {
                        "placeholder" : "Answer...",
                        "multi" : "paragraph, hyperlink"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
}
