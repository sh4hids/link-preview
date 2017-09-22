const cheerio = require("cheerio");
const request = require("request");

function collectMeta($, url) {
  var relativeLinks = $("meta");
  var image = null;
  var imageWidth = null;
  var imageHeight = null;
  var imageType = null;
  var title = null;
  var description = null;
  var siteName = null;

  relativeLinks.each(function () {
    var property = $(this).attr("property");
    if (property === "og:image" && image === null)
      image = $(this).attr("content");
    else if (property === "og:image:width" && imageWidth === null)
      imageWidth = $(this).attr("content");
    else if (property === "og:image:height" && imageHeight === null)
      imageHeight = $(this).attr("content");
    else if (property === "og:image:type" && imageType === null)
      imageType = $(this).attr("content");
    else if (property === "og:title" && title === null)
      title = $(this).attr("content");
    else if (property === "og:description" && description === null)
      description = $(this).attr("content");
    else if (property === "og:site_name" && siteName === null)
      siteName = $(this).attr("content");
  });

  return {
    url,
    title,
    description,
    image,
    imageHeight,
    imageWidth,
    imageType,
    siteName
  };
}
const linkPreview = url => {
  if (!url || url === '') return Promise.reject({ message: 'You must add a valid url' });
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (response.statusCode === 200) return resolve(collectMeta(cheerio.load(body), url));
      return reject({ error, statusCode: response.statusCode });
    });
  });
};
module.exports = linkPreview;
