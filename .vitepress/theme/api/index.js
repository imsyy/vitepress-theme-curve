/**
 * 获取一言
 * @param {string} [rule="updated"] - 文章的排序规则，可以是 "created" 或 "updated"
 */
export const getHitokoto = async () => {
  const result = await fetch("https://v1.hitokoto.cn");
  const hitokoto = await result.json();
  return hitokoto;
};

/**
 * 获取给定网址的站点图标和描述
 * @param {string} url - 站点 URL
 * @returns {Promise<{iconUrl: string, description: string}>}
 */
export const getSiteInfo = async (url) => {
  const details = {
    iconUrl: null,
    title: null,
    description: null,
  };
  try {
    // 站点数据
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    // 获取页面标题
    const titleElement = doc.querySelector("title");
    details.title = titleElement ? titleElement.textContent : "暂无标题";
    // 获取 icon
    let iconLink =
      doc.querySelector("link[rel='shortcut icon']") || doc.querySelector("link[rel='icon']");
    if (iconLink) {
      details.iconUrl = new URL(iconLink.getAttribute("href"), url).href;
    } else {
      details.iconUrl = new URL("/favicon.ico", url).href;
    }
    // 获取描述
    const metaDescription = doc.querySelector("meta[name='description']");
    details.description = metaDescription ? metaDescription.content : "暂无站点描述";
  } catch (error) {
    console.error("获取站点信息失败：", error);
  }
  return details;
};

/**
 * Meting
 * @param {id} string - 歌曲ID
 * @param {server} string - 服务器
 * @param {type} string - 类型
 * @returns {Promise<Object>} - 音乐详情
 */
export const getMusicList = async (url, id, server = "netease", type = "playlist") => {
  const result = await fetch(`${url}?server=${server}&type=${type}&id=${id}`);
  const list = await result.json();
  return list.map((song) => {
    const { pic, ...data } = song;
    return {
      ...data,
      cover: pic,
    };
  });
};

/**
 * 站点统计数据
 */
export const getStatistics = async (key) => {
  const result = await fetch(`https://v6-widget.51.la/v6/${key}/quote.js`);
  const title = [
    "最近活跃",
    "今日人数",
    "今日访问",
    "昨日人数",
    "昨日访问",
    "本月访问",
    "总访问量",
  ];
  const data = await result.text();
  let num = data.match(/(<\/span><span>).*?(\/span><\/p>)/g);
  num = num.map((el) => {
    const val = el.replace(/(<\/span><span>)/g, "");
    return val.replace(/(<\/span><\/p>)/g, "");
  });
  const statistics = {};
  for (let i = 0; i < num.length; i++) {
    if (i === num.length - 1) continue;
    statistics[title[i]] = num[i];
  }
  return statistics;
};
