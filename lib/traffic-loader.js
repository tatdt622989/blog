'use strict';

const fs = require('fs');
const path = require('path');

/**
 * 將 URL 路徑正規化以利進行比對
 * @param {string} rawPath 原始路徑
 * @returns {string} 正規化後的路徑
 */
function normalizePath(rawPath) {
  if (!rawPath || typeof rawPath !== 'string') return '/';

  let clean = rawPath.split('?')[0].split('#')[0].trim();
  try {
    clean = decodeURIComponent(clean);
  } catch {
    // 若無法 decodeURIComponent，維持原字串
  }

  // 確保以 / 開頭
  if (!clean.startsWith('/')) {
    clean = '/' + clean;
  }

  // 若結尾無副檔名且無斜線，補上斜線
  if (!path.extname(clean) && !clean.endsWith('/')) {
    clean = clean + '/';
  }

  return clean;
}

/**
 * 載入 build 當下近期的 GA4 流量資料
 * @param {Object} [options={}] 配置項
 * @param {string} [options.dataDir] automation data 目錄路徑
 * @param {number} [options.days=30] 採計最近天數
 * @returns {Map<string, number>} 路徑對應的近期 sessions 數
 */
function loadRecentTraffic(options = {}) {
  const days = typeof options.days === 'number' && options.days > 0 ? options.days : 30;
  const projectRoot = options.projectRoot || path.resolve(__dirname, '..');
  const dataDir = options.dataDir || path.join(projectRoot, 'automation', 'data');

  const trafficMap = new Map();

  if (!fs.existsSync(dataDir)) {
    return trafficMap;
  }

  try {
    // 找出所有 metrics-YYYY-MM-DD.json 檔案
    const metricFiles = fs.readdirSync(dataDir)
      .filter((file) => /^metrics-\d{4}-\d{2}-\d{2}\.json$/.test(file))
      .sort()
      .reverse() // 最新的在前面
      .slice(0, days); // 取最近 N 天

    for (const file of metricFiles) {
      const filePath = path.join(dataDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);

      const topPages = data?.ga4?.topPages || [];
      for (const page of topPages) {
        if (!page || !page.path) continue;

        const normalized = normalizePath(page.path);
        const sessions = Number(page.sessions) || 0;

        if (sessions > 0) {
          const current = trafficMap.get(normalized) || 0;
          trafficMap.set(normalized, current + sessions);
        }
      }
    }
  } catch (error) {
    // 容錯防護，避免 build 過程因外部日誌損毀而中斷
    console.warn('[TrafficLoader] Failed to load recent traffic:', error.message);
  }

  return trafficMap;
}

/**
 * 從流量 Map 中查詢指定文章的近期流量數
 * @param {Object} post Hexo 文章物件
 * @param {Map<string, number>} trafficMap 流量 Map
 * @returns {number} 近期 sessions 數
 */
function getPostTraffic(post, trafficMap) {
  if (!post || !trafficMap || trafficMap.size === 0) {
    // 若文章 front-matter 有手動指定的 views 或 priority，亦可作為 fallback
    return Number(post?.views) || Number(post?.traffic) || 0;
  }

  const candidatePaths = [];

  if (post.path) {
    candidatePaths.push(normalizePath(post.path));
  }
  if (post.permalink) {
    try {
      const urlObj = new URL(post.permalink);
      candidatePaths.push(normalizePath(urlObj.pathname));
    } catch {
      candidatePaths.push(normalizePath(post.permalink));
    }
  }

  for (const candidate of candidatePaths) {
    if (trafficMap.has(candidate)) {
      return trafficMap.get(candidate);
    }
  }

  return Number(post?.views) || Number(post?.traffic) || 0;
}

module.exports = {
  normalizePath,
  loadRecentTraffic,
  getPostTraffic,
};
