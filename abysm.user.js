// ==UserScript==
// @name         ABYSM USERSCRIPT
// @namespace    abysm.lat
// @version      101
// @author       abysm.lat
// @description  adlink bypasser, f**k luarmor (fixed blacklist)
// @icon         https://abysm.lat/cdn/logo-abysal.png
// @match        *://6x.work/*
// @match        *://adfoc.us/*
// @match        *://bit.ly/*
// @match        *://booo.st/*
// @match        *://boost.ink/*
// @match        *://bst.gg/*
// @match        *://bst.wtf/*
// @match        *://cuttlinks.com/*
// @match        *://cutty.io/*
// @match        *://cutynow.com/*
// @match        *://cuttty.com/*
// @match        *://direct-link.net/*
// @match        *://is.gd/*
// @match        *://krnl-ios.com/*
// @match        *://linkunlocker.com/*
// @match        *://linkvertise.com/*
// @match        *://lockr.so/*
// @match        *://mboost.me/*
// @match        *://mobile.codex.lol/*
// @match        *://paste-drop.com/*
// @match        *://pastebin.com/*
// @match        *://rebrand.ly/*
// @match        *://rentry.co/*
// @match        *://rekonise.com/*
// @match        *://rekonise.org/*
// @match        *://rb.gy/*
// @match        *://rkns.link/*
// @match        *://scwz.me/*
// @match        *://socialwolvez.com/*
// @match        *://sub2get.com/*
// @match        *://sub2unlock.com/*
// @match        *://sub2unlock.net/*
// @match        *://sub4unlock.com/*
// @match        *://unlk.link/*
// @match        *://unlocknow.net/*
// @match        *://krnl.cat/checkpoint/android/v1?hwid=*
// @match        *://abysm.lat/*
// @updateURL    https://github.com/Arceegit/abysm/raw/refs/heads/main/abysm.user.js
// @downloadURL  https://github.com/Arceegit/abysm/raw/refs/heads/main/abysm.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  function checkAndRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("abysm-redirect")) {
      const redirectUrl = urlParams.get("abysm-redirect");
      if (redirectUrl) {
        console.log(`[ABYSS] Redirecting to: ${redirectUrl}`);
        window.location.href = redirectUrl;
      }
    }
  }

  checkAndRedirect();

  const CONFIG = {
    baseUrl: "https://abysm.lat",
    apiKey: "YOUR-API-KEY-HERE",
    showFloatingButton: true,
  };

  console.log("[ABYSS] Initializing userscript v101");

  function createFloatingButton() {
    const button = document.createElement("div");
    button.innerHTML = `
            <div id="abysm-floating-btn" style="
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #000000 0%, #333333 50%, #ffffff 100%);
                color: white;
                border: 2px solid #000000;
                border-radius: 25px;
                padding: 12px 30px;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: all 0.3s ease;
                min-width: 200px;
                justify-content: center;
            ">
                <img src="https://abysm.lat/cdn/logo-abysal.png" style="width: 20px; height: 20px; border-radius: 50%;">
                <span>ABYSM USERSCRIPT</span>
            </div>
        `;

    const buttonElement = button.firstElementChild;

    buttonElement.addEventListener("mouseenter", function () {
      this.style.background =
        "linear-gradient(135deg, #ffffff 0%, #666666 50%, #000000 100%)";
      this.style.color = "#000000";
      this.style.border = "2px solid #ffffff";
      this.style.boxShadow = "0 6px 20px rgba(0,0,0,0.7)";
    });

    buttonElement.addEventListener("mouseleave", function () {
      this.style.background =
        "linear-gradient(135deg, #000000 0%, #333333 50%, #ffffff 100%)";
      this.style.color = "#ffffff";
      this.style.border = "2px solid #000000";
      this.style.boxShadow = "0 4px 15px rgba(0,0,0,0.5)";
    });

    buttonElement.addEventListener("click", showBypassModal);

    document.body.appendChild(buttonElement);
    return buttonElement;
  }

  function showBypassModal() {
    const existingModal = document.getElementById("abysm-modal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.id = "abysm-modal";
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 10001;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Courier New', monospace;
        `;

    const currentUrl = window.location.href;
    const bypassUrl =
      CONFIG.apiKey && !CONFIG.apiKey.includes("YOUR-API-KEY")
        ? `${CONFIG.baseUrl}/userscript?url=${encodeURIComponent(
            currentUrl
          )}&apikey=${encodeURIComponent(CONFIG.apiKey)}`
        : `${CONFIG.baseUrl}/userscript?url=${encodeURIComponent(currentUrl)}`;

    const modalContent = document.createElement("div");
    modalContent.style.cssText = `
            background: linear-gradient(135deg, #000000 0%, #333333 100%);
            border: 2px solid #ffffff;
            border-radius: 8px;
            padding: 24px;
            max-width: 450px;
            width: 90%;
            color: white;
            box-shadow: 0 10px 30px rgba(255,255,255,0.1);
        `;

    modalContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px; border-bottom: 1px solid #666; padding-bottom: 15px;">
                <img src="https://abysm.lat/cdn/logo-abysal.png" style="width: 40px; height: 40px; margin-bottom: 10px; border-radius: 50%;">
                <h3 style="margin: 0 0 5px 0; font-size: 18px; font-weight: bold; color: #ffffff;">ABYSM USERSCRIPT</h3>
                <p style="margin: 0; color: #ccc; font-size: 12px; font-family: monospace;">v101</p>
            </div>

            <div style="background: #1a1a1a; padding: 15px; border-radius: 4px; margin-bottom: 20px; border: 1px solid #333;">
                <p style="margin: 0 0 10px 0; font-size: 11px; color: #999; font-family: monospace;">[TARGET URL]</p>
                <p style="margin: 0; font-size: 11px; word-break: break-all; color: #fff; font-family: monospace; background: #000; padding: 8px; border-radius: 3px;">${currentUrl}</p>
            </div>

            <div style="display: flex; gap: 12px; justify-content: center;">
                <button id="ABYSM-cancel" style="
                    background: linear-gradient(135deg, #666 0%, #333 100%);
                    color: white;
                    border: 1px solid #666;
                    padding: 12px 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    font-family: monospace;
                    font-weight: bold;
                    transition: all 0.3s;
                    min-width: 100px;
                ">CANCEL</button>

                <button id="abysm-bypass" style="
                    background: linear-gradient(135deg, #000 0%, #fff 100%);
                    color: black;
                    border: 1px solid #fff;
                    padding: 12px 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    font-family: monospace;
                    font-weight: bold;
                    transition: all 0.3s;
                    min-width: 100px;
                ">EXECUTE BYPASS</button>
            </div>

            <div style="margin-top: 20px; text-align: center; border-top: 1px solid #333; padding-top: 15px;">
                <p style="margin: 0; font-size: 10px; color: #666; font-family: monospace;">
                    ${
                      !CONFIG.apiKey.includes("YOUR-API-KEY")
                        ? "[PREMIUM]"
                        : "[FREE MODE - CAPTCHA REQUIRED]"
                    }
                </p>
            </div>
        `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    const cancelBtn = modal.querySelector("#ABYSM-cancel");
    const bypassBtn = modal.querySelector("#abysm-bypass");

    if (cancelBtn) {
      cancelBtn.addEventListener("click", function () {
        console.log("[ABYSS] Bypass operation cancelled by user");
        modal.remove();
      });
    }

    if (bypassBtn) {
      bypassBtn.addEventListener("click", function () {
        console.log("[ABYSS] Initiating bypass sequence");
        this.textContent = "PROCESSING...";
        this.style.background = "linear-gradient(135deg, #333 0%, #666 100%)";
        this.style.color = "#ccc";
        this.disabled = true;

        setTimeout(() => {
          console.log("[ABYSS] Redirecting to bypass handler");
          window.location.href = bypassUrl;
        }, 500);
      });
    }

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        console.log("[ABYSS] Modal closed by background click");
        modal.remove();
      }
    });
  }

  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        setTimeout(initializeUI, 1000);
      });
    } else {
      setTimeout(initializeUI, 1000);
    }
  }

  function initializeUI() {
    if (CONFIG.showFloatingButton) {
      createFloatingButton();
      console.log("[ABYSS] Floating button initialized");
    }
  }

  window.ABYSS = {
    config: CONFIG,
    showBypassModal: showBypassModal,
    executeBypass: function () {
      const currentUrl = window.location.href;
      const bypassUrl =
        CONFIG.apiKey && !CONFIG.apiKey.includes("YOUR-API-KEY")
          ? `${CONFIG.baseUrl}/userscript?url=${encodeURIComponent(
              currentUrl
            )}&apikey=${encodeURIComponent(CONFIG.apiKey)}`
          : `${CONFIG.baseUrl}/userscript?url=${encodeURIComponent(
              currentUrl
            )}`;
      console.log("[ABYSS] Programmatic bypass execution");
      window.location.href = bypassUrl;
    },
  };

  init();
  console.log("[ABYSS] UserScript v101 loaded successfully");
})();
