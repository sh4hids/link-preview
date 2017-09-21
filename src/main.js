const cheerio = require("cheerio");
const request = require("request");

function collectMeta($, url) {
  // let relativeLinks = $("meta");
  // let image = null;
  // let imageWidth = null;
  // let imageHeight = null;
  // let imageType = null;
  // let title = null;
  // let description = null;
  // let siteName = null;



  // relativeLinks.each(function() {
  //   let property = $(this).attr("property");
  //   if (property === "og:image" && image === null)
  //     image = $(this).attr("content");
  //   else if (property === "og:image:width" && imageWidth === null)
  //     imageWidth = $(this).attr("content");
  //   else if (property === "og:image:height" && imageHeight === null)
  //     imageHeight = $(this).attr("content");
  //   else if (property === "og:image:type" && imageType === null)
  //     imageType = $(this).attr("content");
  //   else if (property === "og:title" && title === null)
  //     title = $(this).attr("content");
  //   else if (property === "og:description" && description === null)
  //     description = $(this).attr("content");
  //   else if (property === "og:site_name" && siteName === null)
  //     siteName = $(this).attr("content");
  // });

  let relativeLinks = $("meta");
  let image = null;
  let imageWidth = null;
  let imageHeight = null;
  let imageType = null;
  let title = null;
  let description = null;
  let siteName = null;

  relativeLinks.each(function () {
    let property = $(this).attr("property");
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
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (response.statusCode === 200) {
        resolve(collectMeta(cheerio.load(body), url));
      } else reject({ error, statusCode: response.statusCode });
    });
  });
};
module.exports = linkPreview;
