---
title: "Jev 1.14 更新解读：图像输入、Box 定位与 262k 长上下文"
date: 2026-10-17 01:35:00
updated: 2026-10-17 01:55:03
description: "Jev 1.14.0 最新更新解读：TypeSafe AI 开放实验性图像输入、Box 目标定位与 262k 长上下文。本文梳理 jev-latest 与新版本的区别、SDK 升级要求和接入注意事项，并衔接此前的 Jev 入门介绍。"
permalink: 2026/10/17/typesafe-jev-1-14-update/
translation_key: typesafe-jev-1-14-update
translations:
  zh-TW: /2026/10/17/typesafe-jev-1-14-update/
  en: /en/2026/10/17/typesafe-jev-1-14-update/
categories:
- AI
tags:
- Jev
- TypeSafe AI
- AI Agent
- 开发工具
---

![Jev 1.14 多模态决策示意：用边界框定位图像中的杯子，并连接结构化决策选项](cover.jpg)

Jev 1.14.0 于 2026 年 10 月 14 日发布。TypeSafe AI 这次除了迭代模型，还开放了图像输入、Box 目标定位和更长的上下文。原先主要处理文本判断的决策接口，开始可以用于视觉工作流。

第一次了解 Jev，建议先看上一篇 [Jev 是什么？System One 模型与概率决策入门](/zh-cn/2026/09/17/typesafe-jev-system-one-model-guide/)，熟悉 Choice、Score、Noul 的作用。本文继续梳理新版本的变化，信息核对至 **2026 年 10 月 17 日**；依据为官方公告与文档，没有进行付费 API 实测。

<!--more-->

## 先核对版本：jev-latest 目前仍指向 1.13

截至核对日，[官方模型文档](https://docs.typesafe.ai/models) 列出的对应关系是：

| 请求中使用的名称 | 当前对应版本 |
| --- | --- |
| **jev-latest** | **jev-1.13.0** |
| **jev-preview** | **jev-1.14.0** |
| **jev-1.14.0** | 固定使用 1.14.0 |

要复现新版行为，我会显式指定版本。别名会随发布调整，即使业务代码没有修改，结果也可能变化。两个版本目前的价格相同：**每百万输入 token 0.042 美元，输出免费**。

[1.14 发布公告](https://typesafe.ai/blog/jev-1-14) 表示，预计多语言能力的提升最明显，并计划一周后更新 **jev-latest**。计划切换不代表已经切换，中文任务的实际收益也需要用自己的数据评估。

## 图像既能作为输入，也能作为分类依据

根据 [图像文档](https://docs.typesafe.ai/images)，图像可以放在 **state、instructions、criteria** 中。例如给商品图片分类时，可以同时提供待分类图片和各类别的参考图，让判断标准更具体。

图像能力也向 **1.13** 开放。但它仍是 **Danger Zone 实验功能**，每个相关请求都需要添加请求头 **TypeSafe-Danger-Zone-Images: true**。目前适合验证原型，官方尚未将其可靠性认定为达到生产标准。

我的建议是先选一个边界清楚的视觉任务，比如判断一张图片是否属于指定类别，再逐步增加复杂度。这样更容易定位失败原因。

## Box 可以返回位置，但目标不存在时也会返回框

新增的 **Box** 需要 **1.14**，每个问题返回一个目标的边界框。**top、bottom、left、right** 是 0 到 1 的相对坐标，分别按图像高度或宽度计算，具体格式见 [Box 官方文档](https://docs.typesafe.ai/primitives/box)。

需要特别注意：**Box 没有“未找到”的返回值，图中不存在目标时依然会给出坐标。** 可以在同一请求中增加一个 Noul 问题，先判断目标是否存在，再由业务代码决定是否使用边界框。

以下是按 [HTTP 图像上传规范](https://docs.typesafe.ai/images#over-http) 编写的接口示例，未经实际调用。运行前需准备自己的 **product.jpg**，并设置环境变量 **TYPESAFE_API_KEY**；实际执行会消耗账户额度。

```bash
curl https://api.typesafe.ai/v1/systemone \
  -H "Authorization: Bearer $TYPESAFE_API_KEY" \
  -H "TypeSafe-Danger-Zone-Images: true" \
  -F 'request={
    "model": "jev-1.14.0",
    "state": {"photo": "d96b219e-product-photo"},
    "assets": {
      "d96b219e-product-photo": {"type": "image", "part": "photo-upload"}
    },
    "questions": {
      "present": {"type": "noul", "instructions": "Is there a mug in photo?"},
      "location": {"type": "box", "instructions": "The mug in photo"}
    }
  };type=application/json' \
  -F 'photo-upload=@./product.jpg;type=image/jpeg'
```

拿到合法坐标只是第一步。我会把目标缺失、图片模糊、多个相似物体同时出现的情况，都加入测试集。

## 上下文可扩展到 262k，但应先筛选相关信息

[上下文文档](https://docs.typesafe.ai/models#context-length) 列出的默认限制是**单次请求 64k、单个问题 32k**。添加 **TypeSafe-Danger-Zone-Long-Context: true** 后，这两个限制均可提高到 **262k token**，适用于 1.13 和 1.14。

长上下文需要主动启用。官方说明，输入变长会增加延迟、降低准确率。以客服工单为例，我会先检索相关记录，再决定是否确实需要扩大上下文，而不是默认发送全部历史。

## SDK 同步更新，JavaScript 项目需要检查运行环境

除了切换模型，还要核对客户端依赖：

- [Python SDK 0.7.5](https://docs.typesafe.ai/sdk/python/changelog) 支持图像资源与 Box，默认开启 zstd 请求压缩。
- [JavaScript SDK 0.7.0](https://docs.typesafe.ai/sdk/javascript/changelog) 支持图像与 Box，最低要求改为 **Node.js 22**，同时不再导出请求 payload 类型。

对于仍使用 Node.js 18 或 20 的服务，我会分别验证运行环境升级和模型切换，以便出现兼容性问题时快速定位。

## 客户案例能提供思路，不能直接套用降本比例

TypeSafe 在 10 月 7 日发布的 [Jack & Jill 案例](https://typesafe.ai/blog/jack-jill-jev-case-study) 中报告，候选人初筛每千人的成本从 **0.755 美元降至 0.092 美元**。这是厂商公布的特定客户流程结果，不代表其他项目也能获得相同降幅。

它给我的启发是：从一个调用量大、输出范围固定的判断环节切入，同时评估成本和业务质量，再考虑扩展到其他环节。

## 接入前，区分格式正确与判断正确

输出符合类型约束，不代表业务判断一定正确。[System One 文档](https://docs.typesafe.ai/concepts/system-one) 同样说明，概率校准不保证单个答案正确。理解上一篇提到的“零幻觉”时，应聚焦输出受类型和选项约束这一点，不能理解成模型不会误判。

此外，[当前 Confidence 文档](https://docs.typesafe.ai/confidence) 区分了不同响应：Choice、Score 提供 **confidence**，Noul 直接返回是非概率，没有单独的 **confidence** 字段。沿用上一篇示例开发时，请以最新官方响应格式为准。

我的升级顺序是保留旧版作为基线，用同一份数据检查错分、漏判、延迟与费用，再调整自动处理阈值。图像、Box、长上下文分别验证，通过后再接入原流程。

如果还没确定 Jev 应该负责哪个判断步骤，接着阅读 [Jev 入门介绍：三种决策原语、五类应用场景与开源工具链](/zh-cn/2026/09/17/typesafe-jev-system-one-model-guide/)。先明确任务，再挑选新功能，比较容易得到可以验证的结果。
