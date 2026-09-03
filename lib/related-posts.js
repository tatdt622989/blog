'use strict';

const { loadRecentTraffic, getPostTraffic } = require('./traffic-loader');

/**
 * 從文章物件中提取第一張封面圖片路徑
 * @param {Object} post Hexo 文章物件
 * @returns {string|null} 圖片路徑或 null
 */
function extractPostCover(post) {
  if (!post) return null;

  // 1. 若有 photos 屬性且不為空，優先使用
  if (Array.isArray(post.photos) && post.photos.length > 0 && post.photos[0]) {
    return post.photos[0];
  }

  // 2. 從已渲染的 post.content 提取第一個 <img> 的 src
  if (typeof post.content === 'string') {
    const imgMatch = post.content.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  // 3. 從 post.excerpt 提取
  if (typeof post.excerpt === 'string') {
    const excerptMatch = post.excerpt.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i);
    if (excerptMatch && excerptMatch[1]) {
      return excerptMatch[1];
    }
  }

  // 4. 從原始 raw 或 _content 內容提取 Markdown 語法圖片
  const rawContent = post.raw || post._content || '';
  if (typeof rawContent === 'string' && rawContent) {
    const mdMatch = rawContent.match(/!\[[^\]]*\]\(([^)]+)\)/);
    if (mdMatch && mdMatch[1]) {
      const src = mdMatch[1].trim().split(/\s+/)[0];
      if (/^(?:https?:)?\/\//i.test(src) || src.startsWith('/')) {
        return src;
      }
      if (post.path) {
        const basePath = ('/' + post.path.replace(/^\/+/, '')).replace(/\/index\.html$/i, '/').replace(/\/?$/, '/');
        return basePath + src.replace(/^\.?\//, '');
      }
      return src;
    }
  }

  return null;
}

/**
 * 計算並返回當前文章的推薦相關文章（支援近期流量加權）
 * @param {Object} currentPost 當前正在閱讀的文章
 * @param {Array|Object} allPosts 站點文章集合（例如 site.posts）
 * @param {Object} [options={}] 配置選項
 * @param {number} [options.limit=3] 回傳篇數
 * @param {Map<string, number>} [options.trafficMap] 近期流量對照表
 * @returns {Array} 推薦相關文章列表
 */
function getRelatedPosts(currentPost, allPosts, options = {}) {
  if (!currentPost || !allPosts) return [];

  const limit = typeof options.limit === 'number' && options.limit > 0 ? options.limit : 3;
  const trafficMap = options.trafficMap || null;

  const postsArray = Array.isArray(allPosts)
    ? allPosts
    : (typeof allPosts.toArray === 'function' ? allPosts.toArray() : []);

  if (!postsArray.length) return [];

  const currentId = currentPost._id || currentPost.path;

  // 整理當前文章的標籤集合（忽略大小寫）
  const currentTagsRaw = currentPost.tags
    ? (typeof currentPost.tags.toArray === 'function' ? currentPost.tags.toArray() : currentPost.tags)
    : [];
  const currentTags = new Set(
    (Array.isArray(currentTagsRaw) ? currentTagsRaw : [])
      .map((t) => (typeof t === 'string' ? t : (t && t.name) || '').toLowerCase().trim())
      .filter(Boolean)
  );

  // 整理當前文章的分類集合（忽略大小寫）
  const currentCategoriesRaw = currentPost.categories
    ? (typeof currentPost.categories.toArray === 'function' ? currentPost.categories.toArray() : currentPost.categories)
    : [];
  const currentCategories = new Set(
    (Array.isArray(currentCategoriesRaw) ? currentCategoriesRaw : [])
      .map((c) => (typeof c === 'string' ? c : (c && c.name) || '').toLowerCase().trim())
      .filter(Boolean)
  );

  const candidates = [];

  for (const post of postsArray) {
    if (!post) continue;

    // 排除當前文章本身
    const postId = post._id || post.path;
    if (postId === currentId || (currentPost.path && post.path === currentPost.path)) {
      continue;
    }

    // 計算標籤匹配數
    const postTagsRaw = post.tags
      ? (typeof post.tags.toArray === 'function' ? post.tags.toArray() : post.tags)
      : [];
    const postTags = (Array.isArray(postTagsRaw) ? postTagsRaw : [])
      .map((t) => (typeof t === 'string' ? t : (t && t.name) || '').toLowerCase().trim())
      .filter(Boolean);

    let tagMatches = 0;
    let matchedTag = null;
    for (const tag of postTags) {
      if (currentTags.has(tag)) {
        tagMatches += 1;
        if (!matchedTag) matchedTag = tag;
      }
    }

    // 計算分類匹配數
    const postCategoriesRaw = post.categories
      ? (typeof post.categories.toArray === 'function' ? post.categories.toArray() : post.categories)
      : [];
    const postCategories = (Array.isArray(postCategoriesRaw) ? postCategoriesRaw : [])
      .map((c) => (typeof c === 'string' ? c : (c && c.name) || '').toLowerCase().trim())
      .filter(Boolean);

    let categoryMatches = 0;
    let matchedCategory = null;
    for (const cat of postCategories) {
      if (currentCategories.has(cat)) {
        categoryMatches += 1;
        if (!matchedCategory) matchedCategory = cat;
      }
    }

    // 關聯基礎分：標籤比重 2 分、分類比重 1 分
    const matchScore = tagMatches * 2 + categoryMatches;
    const postDate = post.date ? new Date(post.date).getTime() : 0;

    // 近期流量分：採用對數平滑並賦予合適加乘，讓同領域熱門文章獲得具體優勢
    const sessions = getPostTraffic(post, trafficMap);
    const trafficScore = Math.log1p(sessions) * 2.5;

    // 總分計算邏輯：
    // 1. 有標籤或分類匹配時：同主題下，近期點閱高、受歡迎的文章獲得更顯著的引流排名
    // 2. 無匹配時（Fallback 遞補）：優先由全站近期最熱門爆款遞補
    let totalScore;
    if (matchScore > 0) {
      const combinedScore = (matchScore * 2.5) + trafficScore;
      totalScore = (combinedScore * 1e12) + postDate;
    } else {
      totalScore = (trafficScore * 1e10) + postDate;
    }

    candidates.push({
      post,
      totalScore,
      matchScore,
      sessions,
      trafficScore,
      matchedTag,
      matchedCategory,
    });
  }

  // 依分數降序排序
  candidates.sort((a, b) => b.totalScore - a.totalScore);

  // 選取前 limit 篇，並精煉返回結構
  return candidates.slice(0, limit).map(({ post, sessions, matchedTag, matchedCategory }) => {
    const tagsRaw = post.tags
      ? (typeof post.tags.toArray === 'function' ? post.tags.toArray() : post.tags)
      : [];
    const categoriesRaw = post.categories
      ? (typeof post.categories.toArray === 'function' ? post.categories.toArray() : post.categories)
      : [];

    const tags = (Array.isArray(tagsRaw) ? tagsRaw : []).map((t) => (typeof t === 'string' ? t : (t && t.name) || '')).filter(Boolean);
    const categories = (Array.isArray(categoriesRaw) ? categoriesRaw : []).map((c) => (typeof c === 'string' ? c : (c && c.name) || '')).filter(Boolean);

    // 優先以共同匹配的標籤/分類作為顯示標籤，以維持視覺直覺性
    const realMatchedTag = matchedTag ? tags.find((t) => t.toLowerCase().trim() === matchedTag) : null;
    const realMatchedCat = matchedCategory ? categories.find((c) => c.toLowerCase().trim() === matchedCategory) : null;
    const displayTag = realMatchedTag || realMatchedCat || tags[0] || categories[0] || '';

    return {
      _id: post._id,
      title: post.title,
      path: post.path,
      date: post.date,
      cover: extractPostCover(post),
      tags,
      categories,
      displayTag,
      description: post.description || '',
      sessions,
    };
  });
}

module.exports = {
  extractPostCover,
  getRelatedPosts,
};
