title: How to Install Aseprite and Add the PixelLab Extension
description: >-
  Install Aseprite on Windows, macOS, or Linux, compare official and
  source-build options, and connect the PixelLab AI pixel art extension step by
  step.
permalink: 2026/06/15/how-to-install-aseprite/
translation_key: aseprite-install-guide
translations:
  zh-TW: /2026/06/15/aseprite-install-guide/
  zh-CN: /zh-cn/2026/06/15/how-to-install-aseprite/
cover: cover-v2.png
categories:
  - Game Development
tags:
  - Aseprite
  - Pixel Art
  - PixelLab
  - Game Development
date: 2026-06-15 00:18:00
updated: 2026-08-27 19:00:00
---

![Aseprite installation and PixelLab extension setup guide](cover-v2.png)

Aseprite is one of the most widely used editors for pixel art and frame-by-frame animation. It is also the desktop host for PixelLab's Aseprite extension, which brings AI-assisted pixel art generation into an existing drawing workflow. This guide explains how to obtain Aseprite legally, install it, and connect the PixelLab extension on Windows, macOS, or Linux.

<!--more-->

The most important limitation comes first: **the Aseprite trial does not support extensions**. If your goal is to use PixelLab inside Aseprite, you need a purchased copy or a build you compiled yourself from the available source code.

## What Is Aseprite?

[Aseprite](https://www.aseprite.org/) is a specialized pixel art and animation editor. It supports layers, frame animation, palettes, tilesets, onion skinning, sprite-sheet export, and many of the small workflow details that matter when producing game assets.

It runs on Windows, macOS, and Ubuntu. The official packages are convenient for most people, while developers who are comfortable building C++ projects can compile the source themselves.

## Three Ways to Get Aseprite

### Buy the Official Version

Buying Aseprite is the simplest option and directly supports its development. You can purchase it from the [Aseprite website](https://www.aseprite.org/buy/) or through supported storefronts such as Steam and itch.io.

The official purchase includes builds for Windows, macOS, and Ubuntu, plus a Steam key when purchased through the Aseprite site. Steam is convenient if you want automatic updates, but the application itself is not dependent on Steam's launcher and remains DRM-free.

### Compile the Source Yourself

Aseprite's source is available on [GitHub](https://github.com/aseprite/aseprite), but its license is not the same as a typical permissive open-source license. You may compile and modify it for your own purposes. You may also use artwork created with Aseprite in commercial projects. You may not redistribute the compiled application to other people.

This route avoids buying a packaged build, but it requires a working build environment and time to handle the compiler and dependencies. Follow the repository's current compilation instructions rather than an old third-party binary guide. Downloading an unofficial precompiled copy from a random site is not equivalent to building it yourself and creates both licensing and security risks.

### Try the Trial Version

The trial is useful for checking the interface and deciding whether Aseprite fits your drawing workflow. However, the trial does not allow extensions. PixelLab therefore cannot be installed into it.

If the PixelLab integration is the reason you are installing Aseprite, use an official purchased version or compile Aseprite locally.

## Install and Verify Aseprite

### Windows

Download the official installer or install through Steam. Complete the normal installation flow, launch Aseprite once, and confirm that the editor opens correctly.

### macOS

Download and open the official macOS package, then move Aseprite to **Applications** if prompted. If macOS blocks the first launch, open **System Settings → Privacy & Security** and use **Open Anyway** only after confirming that the application came from the official purchase source.

Official Aseprite builds support both Intel and Apple Silicon Macs.

### Linux

The official purchase includes an Ubuntu build. Users on other distributions can compile from source by following Aseprite's repository instructions. Avoid third-party redistributed binaries unless you have independently verified both their license and integrity.

After installation, open **Help → About** and check the version. PixelLab's current installation documentation requires **Aseprite 1.3.7 or later**, so update before installing the extension if your build is older.

## Download the PixelLab Extension

Sign in to your [PixelLab](https://www.pixellab.ai/) account. The account page provides the Aseprite extension download after you subscribe or start an eligible trial. The downloaded file uses the **.aseprite-extension** filename extension.

PixelLab also provides browser-based tools and an MCP integration, so Aseprite is not the only way to access the service. The Aseprite extension is intended for artists who want generation and editing controls inside their local pixel art editor.

## Install the Extension

There are two supported installation methods.

### Double-Click the Extension File

With Aseprite installed, double-click the downloaded **.aseprite-extension** file. Aseprite should open and ask to install it.

### Add It From Aseprite Preferences

If the file association does not work:

1. Open Aseprite.
2. Go to **Edit → Preferences**.
3. Select **Extensions** in the sidebar.
4. Choose **Add Extension**.
5. Select the downloaded **.aseprite-extension** file.

Restart Aseprite after the installation completes.

## Approve the Required Permissions

On the first launch, Aseprite asks whether the PixelLab extension can access specific resources. PixelLab's official instructions identify two required permissions:

- access to the extension's **package.json** file;
- internet access through WebSockets so the extension can communicate with PixelLab.

PixelLab also documents **full trust** as optional for automatic extension updates because it lets the extension overwrite its own files. Review the prompt instead of approving permissions blindly. If you prefer manual updates, you can keep the permission scope narrower and reinstall a newer extension yourself.

## Open the PixelLab Panel

The PixelLab panel may open automatically after restart. If it does not, use:

- **Edit → PixelLab → Open plugin**; or
- **Ctrl + Space + P**.

Sign in with the PixelLab account connected to your subscription or trial. The extension performs generation on PixelLab's cloud infrastructure, so a stable internet connection is required even though Aseprite itself runs locally.

## Troubleshooting

### The Extension Option Is Missing

Confirm that you are not using the Aseprite trial and that the installed version is at least 1.3.7. Then reopen **Edit → Preferences → Extensions** and verify that PixelLab appears in the list.

### The Panel Stays on Connecting

PixelLab states that WebSocket blocking or an unreliable connection can keep the extension on **Connecting**. Test another network, check firewall or proxy rules, and temporarily try a trusted VPN or mobile hotspot to identify whether the network is the cause.

### Double-Clicking Does Nothing

Use the manual **Add Extension** flow. This bypasses operating-system file associations and lets Aseprite open the package directly.

### The Extension Opens but Cannot Generate

Check that you are signed into the expected PixelLab account and that your plan or trial includes the requested tool. Some PixelLab features require specific subscription tiers even when the extension itself is installed correctly.

## What to Do Next

Once the integration works, keep Aseprite responsible for precise drawing, layers, palettes, and animation timing while using PixelLab for suitable generation or editing tasks. AI output is most useful as material to refine, not as a replacement for inspecting every frame and maintaining a consistent palette.

For a reliable setup, keep both applications current, download extensions only from the PixelLab account page, and never install redistributed Aseprite binaries from unknown sources.

## Official References

- [Aseprite website and official purchase options](https://www.aseprite.org/)
- [Aseprite source repository](https://github.com/aseprite/aseprite)
- [Aseprite licensing FAQ](https://www.aseprite.org/faq/)
- [PixelLab Aseprite extension installation](https://www.pixellab.ai/docs/installation)
- [PixelLab interface options](https://www.pixellab.ai/docs/ways-to-use-pixellab)
