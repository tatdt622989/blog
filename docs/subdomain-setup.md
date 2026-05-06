# blog.6yuwei.com 子網域設定指南

## 目標
將 `blog.6yuwei.com` 指向現有 PHP-Apache 容器中的 `/blog` 子目錄，
不新增容器，利用 Apache VirtualHost + Coolify Traefik 標籤完成。

## 伺服器目錄結構
```
/home/ubuntu/php-site/          ← 容器掛載根目錄
├── blog/                        ← Hexo 靜態輸出 (public/)
├── other-service/
└── apache-conf/
    └── blog.conf               ← 新增的 VirtualHost 設定
```

## 步驟

### 1. 建立 Apache VirtualHost 設定
### 2. 調整 Dockerfile 或 docker-compose 掛載設定
### 3. 在 Coolify 設定 Traefik 標籤接受 blog.6yuwei.com
