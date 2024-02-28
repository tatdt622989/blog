---
title: 什麼是 GPT Function calling?
date: 2023-10-02 22:56:16
tags: 
- GPT
- Node.js
- AI
---

![](cover.jpg)

## OpenAI API 

在了解 **GPT Function calling** 之前我們先來談談什麼是 OpenAI API ，OpenAI API是一個由OpenAI所提供便於開發者串接他們的服務(例如GPT-4、whisper等)的API，需要透過OpenAI申請API密鑰後才能夠使用<!-- more -->，並且會根據用量收取費用，詳情可以參考[這裡](https://openai.com/pricing)，而本篇要討論的內容則是OpenAI API 底下的 Chat completions API 內的 Function calling 這個功能，以下統一稱為Function calling。

## Function calling 有什麼特別的

我們在使用一般的 GPT API 時，可能會用來開發一些應用程式，這些應用程式通常都會希望能夠將 GPT API 回傳的內容維持在一定的主題或格式，以避免因為使用者輸入無關的內容導致 GPT API 偏離主題，進而導致程式不可預期的錯誤，而Open AI為此提供的解決方案就是 **Function calling**。

Function calling 能夠讓 GPT API 回傳我們開發的應用程式看得懂的內容，也就是JSON，它可以大幅度降低因為 GPT API 非預期回傳內容所導致的錯誤。

## 在開始使用 Function calling 前

Function calling 需要使用到 Chat completions API，而使用這個API可以透過官方提供的現成API網址直接請求，也可以透過Node.js集成至自己的應用程式，這裡為了方便使用所以會直接使用官方提供的現成API網址。

在使用Function calling前，我們可以先使用 https://api.openai.com/v1/chat/completion 這個網址使用POST方法夾帶JSON，並在Authorization中使用Bearer Token帶上從API後台產生的金鑰，發送一個簡易的 Chat completions API 請求，通常會長得像這樣：

```JSON
{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": "Where was it played?"}],
}
```
這個請求參數是用來與模型產生對話，model是使用的模型的名稱，messages則是一個陣列，裡面包含了角色與提供給角色的訊息，像是system表示給模型預設的情境、user代表由使用者向模型發問、assistant表示模型回答的內容，user和assistant可以用來將對話紀錄餵給模型。請求送出之後，會得到像這樣的回傳內容：

```JSON
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-3.5-turbo-0613",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "\n\nHello there, how may I assist you today?",
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}
```

在message中會回傳模型根據請求所得到的結果，其他參數不在本文討論範圍有興趣可以參考[官方的API文件](https://platform.openai.com/docs/api-reference/chat)。

## 開始使用 Function calling

介紹完 Chat completions API 的使用方法後，我們可以根據上面的請求，做一些修改來完成 Function calling ，如以下所示：

```JSON
{
  "model": "gpt-4-0613",
  "messages": [
    {
      "role": "user",
      "content": "What is the weather like in Boston?"
    }
  ],
  "functions": [
    {
      "name": "get_current_weather",
      "description": "Get the current weather in a given location",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA"
          },
          "unit": {
            "type": "string",
            "enum": ["celsius", "fahrenheit"]
          }
        },
        "required": ["location"]
      }
    }
  ],
  "function_call": "auto"
}
```

在使用Function calling的時候首先需要注意的是，至作者撰寫本文當下，Function calling只支援 **gpt-3.5-turbo-0613** 和 **gpt-4-0613** 兩種模型，這兩個模型是官方針對現有的GPT模型進行功能加強的版本。
與一般請求不同，Function calling 的請求多了functions的參數，這個functions主要的功能是，開發者可以根據自己定義的function，向GPT描述這個functions的功能、參數以及期望GPT給予這個functions的資訊，這樣一來GPT就可以根據這些資訊，產生出符合開發者預期的格式和內容。

上文JSON中的範例，定義了一個名為get_current_weather，這個function的內容，會由開發者自行定義取得天氣的方式，可能是由外部API或其他管道取得，參數的部分，一個是location另一個是unit，其中location是必填的，並且詳細描述了location參數的資料的情境是"**城市或是州，例如:加利福尼亞洲舊金山**"，而function_call:auto這個屬性是代表是否調用function由GPT自行決定。

這樣一來GPT就會根據使用者口語的提示詞，來決定要帶怎樣的參數給予get_current_weather這個function，上文JSON中使用者的提示詞為**What is the weather like in Boston?** ，使用者詢問了**Boston**這個城市的天氣，GPT在了解使用者的提示詞以及開發者定義的function後，就會將**Boston**作為location的參數，回傳給應用程式，讓應用程式再去調用天氣API取得**Boston**的天氣，並回傳給使用者，詳細GPT回傳的資料可能會像這樣：

```JSON
{
  "id": "chatcmpl-86Cpgi5EZ7rFvEauUnzl65I1X7v1Q",
  "object": "chat.completion",
  "created": 1696489988,
  "model": "gpt-4-0613",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": null,
        "function_call": {
          "name": "get_current_weather",
          "arguments": "{\n  \"location\": \"Boston\"\n}"
        }
      },
      "finish_reason": "function_call"
    }
  ],
  "usage": {
    "prompt_tokens": 82,
    "completion_tokens": 16,
    "total_tokens": 98
  }
}
```

這裡再做一個流程總結整理：

1. 定義一個需要GPT提供參數的function
2. 向GPT描述function的功能、參數、調用情況等
3. 使用者向GPT提問
4. GPT根據使用者提示詞、function的資料產生出符合function格式的資料
5. 開發者將GPT回傳的資料餵給function
6. function根據參數執行程式

以上為OpenAI的GPT Function calling的使用方式，但是OpenAI目前的更新頻繁，本文僅供參考，若以不符合實際現況，請多見諒，也請各位讀者告知，我會盡量去修改符合最新的使用方式，謝謝！

使用Function calling製作的應用：

**[AI Component](https://6yuwei.com/components)**: 讓你簡易、快速產生出獨一無二的css樣式