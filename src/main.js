const cheerio = require("cheerio");
const request = require("request");

const getByProp = ($, property) =>
  $(`meta[property='${property}']`)
    .first()
    .attr("content") || null;

function collectMeta($, url) {
  const ogUrl = getByProp($, "og:url");
  return {
    url,
    image: getByProp($, "og:image"),
    imageWidth: getByProp($, "og:image:width"),
    imageHeight: getByProp($, "og:image:height"),
    imageType: getByProp($, "og:image:type"),
    title: getByProp($, "og:title"),
    description: getByProp($, "og:description"),
    siteName: getByProp($, "og:site_name"),
    ogUrl,
    youtube: !ogUrl
      ? null
      : ogUrl.indexOf("youtube.com") >= 0 ? `https://youtube.com/embed/${getValue(ogUrl, "v")}` : null
  };
}

const getValue = (url, name) => {
  const i = url.indexOf(`${name}=`) + name.length + 1;
  const j = url.indexOf("&", i);
  const end = j < 0 ? url.length : j;
  return i < 0 ? "" : url.slice(i, end);
};

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

const linkPreview = (url, timeout = 100000) => {
  if (!url || url === "") return Promise.reject({ message: "You must add a valid url" });
  if (!url.match(/^http(s)?:\/\/[a-z]+\.[a-z]+(.)+/i)) return Promise.resolve(getError(url));
  return new Promise((resolve, reject) => {
    request(url, { timeout: timeout || 100000 }, function(error, response, body) {
      if (!response) return resolve(getError(url));
      if (response.statusCode === 200) return resolve(collectMeta(cheerio.load(body), url));
      return resolve(getError(url));
    });
  });
};

module.exports = linkPreview;
