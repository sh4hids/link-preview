const cheerio = require("cheerio");
const request = require("request");

const getByProp = ($, property) =>
  $(`meta[property='${property}']`)
    .first()
    .attr("content");

function collectMeta($, url) {
  return {
    url,
    image: getByProp($, "og:image"),
    imageWidth: getByProp($, "og:image:width"),
    imageHeight: getByProp($, "og:image:height"),
    imageType: getByProp($, "og:image:type"),
    title: getByProp($, "og:title"),
    description: getByProp($, "og:description"),
    siteName: getByProp($, "og:site_name")
  };
}
const linkPreview = url => {
  if (!url || url === "")
    return Promise.reject({ message: "You must add a valid url" });
  return new Promise((resolve, reject) => {
    request(url, function(error, response, body) {
      if (response.statusCode === 200)
        return resolve(collectMeta(cheerio.load(body), url));
      return reject({ error, statusCode: response.statusCode });
    });
  });
};
module.exports = linkPreview;
