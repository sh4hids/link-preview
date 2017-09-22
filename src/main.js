const cheerio = require("cheerio");
const request = require("request");

const getByProp = ($, property) =>
  $(`meta[property='${property}']`)
    .first()
    .attr("content") || null;

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

const getError = url => ({
  url,
  image: null,
  imageWidth: null,
  imageHeight: null,
  imageType: null,
  title: undefined,
  description: null,
  siteName: null
});

const linkPreview = url => {
  if (!url || url === "")
    return Promise.reject({ message: "You must add a valid url" });
  if (!url.match(/^http(s)?:\/\/[a-z]+\.[a-z]+(.)+/i))
    return Promise.resolve(getError(url));
  return new Promise((resolve, reject) => {
    request(url, function(error, response, body) {
      if (!response) return resolve(getError(url));
      if (response.statusCode === 200)
        return resolve(collectMeta(cheerio.load(body), url));
      return resolve(getError(url));
    });
  });
};

module.exports = linkPreview;
