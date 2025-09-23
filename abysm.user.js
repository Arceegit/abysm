// ==UserScript==
// @name          ABYSM UserScript
// @namespace     abysm.lat
// @version       100
// @author        abysm.lat - darcy
// @description   Automatic ad-link bypass using abysm api.
// @match         *://6x.work/*
// @match         *://adfoc.us/*
// @match         *://auth.platoboost.app/*
// @match         *://bit.ly/*
// @match         *://booo.st/*
// @match         *://boost.ink/*
// @match         *://bst.gg/*
// @match         *://bst.wtf/*
// @match         *://cuttlinks.com/*
// @match         *://cutty.io/*
// @match         *://cutyion.com/*
// @match         *://cutynow.com/*
// @match         *://cuttty.com/*
// @match         *://direct-link.net/*
// @match         *://deltaios-executor.com/*
// @match         *://is.gd/*
// @match         *://key.volcano.wtf/*
// @match         *://krnl-ios.com/*
// @match         *://link-center.net/*
// @match         *://link-hub.net/*
// @match         *://link-target.net/*
// @match         *://link-to.net/*
// @match         *://linkunlocker.com/*
// @match         *://linkvertise.com/*
// @match         *://lockr.so/*
// @match         *://mboost.me/*
// @match         *://mobile.codex.lol/*
// @match         *://pandadevelopment.net/*
// @match         *://paste-drop.com/*
// @match         *://pastebin.com/*
// @match         *://rebrand.ly/*
// @match         *://rentry.co/*
// @match         *://rekonise.com/*
// @match         *://rekonise.org/*
// @match         *://rb.gy/*
// @match         *://rkns.link/*
// @match         *://scwz.me/*
// @match         *://socialwolvez.com/*
// @match         *://sub2get.com/*
// @match         *://sub2unlock.com/*
// @match         *://sub2unlock.net/*
// @match         *://sub4unlock.com/*
// @match         *://unlk.link/*
// @match         *://unlocknow.net/*
// @match         *://up-to-down.net/*
// @grant         GM_xmlhttpRequest
// @connect       abysm.lat
// @downloadURL   https://raw.githubusercontent.com/Arceegit/abysm/refs/heads/main/abysm.user.js
// @updateURL     https://raw.githubusercontent.com/Arceegit/abysm/refs/heads/main/abysm.user.js
// @homepageURL   https://abysm.lat
// @run-at        document-start
// ==/UserScript==

(function () {
  "use strict";

  // Configure me buddy :pray:
  const CONFIG = {
    usePremium: false,
    apiKey: "Your-Key-Here",
    freeApiUrl: "https://abysm.lat/api/free/bypass?url=",
    premiumApiUrl: "https://abysm.lat/api/bypass?url=",
    toastDuration: 5000,
    redirectDelay: 7000,
  };

  console.log("ABYSM UserScript: Loading...");

  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
            .abysm-toast-container {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 10000;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }

            .abysm-toast {
                background: #1f2937;
                border: 1px solid #374151;
                border-radius: 8px;
                padding: 12px 16px;
                min-width: 300px;
                max-width: 90vw;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 12px;
                opacity: 0;
                transform: translateY(-100px) scale(0.9);
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .abysm-toast.show {
                opacity: 1;
                transform: translateY(0) scale(1);
            }

            .abysm-toast.hiding {
                opacity: 0;
                transform: translateY(-50px) scale(0.95);
            }

            .abysm-toast.success {
                border-left: 4px solid #10b981;
            }

            .abysm-toast.error {
                border-left: 4px solid #ef4444;
            }

            .abysm-toast.processing {
                border-left: 4px solid #3b82f6;
            }

            .abysm-toast-icon {
                width: 20px;
                height: 20px;
                flex-shrink: 0;
            }

            .abysm-spinner {
                animation: spin 1s linear infinite;
            }

            .abysm-toast-content {
                flex: 1;
            }

            .abysm-toast-title {
                font-weight: 600;
                font-size: 14px;
                margin-bottom: 2px;
            }

            .abysm-toast-message {
                font-size: 13px;
                opacity: 0.8;
            }

            .abysm-countdown {
                background: rgba(255,255,255,0.1);
                border-radius: 6px;
                padding: 4px 8px;
                font-size: 12px;
                font-weight: 600;
                min-width: 40px;
                text-align: center;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
    document.head.appendChild(style);
  }

  class ToastManager {
    constructor() {
      this.container = null;
      this.toasts = new Map();
      this.init();
    }

    init() {
      this.container = document.createElement("div");
      this.container.className = "abysm-toast-container";
      document.body.appendChild(this.container);
    }

    show(type, title, message, duration = CONFIG.toastDuration) {
      const toast = document.createElement("div");
      const toastId = Date.now().toString();

      toast.className = `abysm-toast ${type}`;
      toast.innerHTML = this.getToastHTML(type, title, message, duration);

      this.container.appendChild(toast);
      this.toasts.set(toastId, toast);

      setTimeout(() => toast.classList.add("show"), 10);

      if (duration > 0) {
        if (type === "success") {
          this.startCountdown(toast, duration);
        }
        setTimeout(() => this.hide(toastId), duration);
      }

      return toastId;
    }

    getToastHTML(type, title, message, duration) {
      const icons = {
        processing: `
                    <svg class="abysm-spinner" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(59,130,246,0.3)" stroke-width="4"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
                    </svg>
                `,
        success: `
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#10b981"/>
                        <path d="M7 12l3 3 7-7" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                `,
        error: `
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#ef4444"/>
                        <path d="M15 9l-6 6m0-6l6 6" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                `,
      };

      const countdown =
        type === "success"
          ? `<div class="abysm-countdown">${Math.round(duration / 1000)}s</div>`
          : "";

      return `
                <div class="abysm-toast-icon">${icons[type]}</div>
                <div class="abysm-toast-content">
                    <div class="abysm-toast-title">${title}</div>
                    <div class="abysm-toast-message">${message}</div>
                </div>
                ${countdown}
            `;
    }

    startCountdown(toast, duration) {
      const countdownEl = toast.querySelector(".abysm-countdown");
      let seconds = Math.round(duration / 1000);

      const timer = setInterval(() => {
        seconds--;
        if (countdownEl) countdownEl.textContent = `${seconds}s`;
        if (seconds <= 0) clearInterval(timer);
      }, 1000);
    }

    hide(toastId) {
      const toast = this.toasts.get(toastId);
      if (!toast) return;

      toast.classList.add("hiding");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
        this.toasts.delete(toastId);
      }, 400);
    }

    hideAll() {
      this.toasts.forEach((toast, id) => this.hide(id));
    }
  }

  function bypassLink() {
    const toast = new ToastManager();

    const processingId = toast.show(
      "processing",
      "ABYSM API",
      "Starting bypass..."
    );

    const currentUrl = window.location.href;
    const apiUrl = CONFIG.usePremium ? CONFIG.premiumApiUrl : CONFIG.freeApiUrl;
    const fullUrl = apiUrl + encodeURIComponent(currentUrl);

    const headers = {
      Accept: "application/json",
    };

    if (CONFIG.usePremium && CONFIG.apiKey) {
      headers["x-api-key"] = CONFIG.apiKey;
    }

    GM_xmlhttpRequest({
      method: "GET",
      url: fullUrl,
      headers: headers,
      timeout: 600000,
      onload: function (response) {
        try {
          const result = JSON.parse(response.responseText);

          if (response.status === 200 && result?.success && result.result) {
            toast.hide(processingId);

            toast.show(
              "success",
              "Bypass Completed",
              `Redirecting in ${CONFIG.redirectDelay / 1000} seconds`,
              CONFIG.redirectDelay
            );

            setTimeout(() => {
              window.location.href = result.result;
            }, CONFIG.redirectDelay);
          } else {
            throw new Error(result?.message || "Invalid API response");
          }
        } catch (error) {
          handleError(error, toast, processingId);
        }
      },
      onerror: function (error) {
        handleError(
          new Error(error.statusText || "Network error"),
          toast,
          processingId
        );
      },
      ontimeout: function () {
        handleError(new Error("Request timeout"), toast, processingId);
      },
    });
  }

  function handleError(error, toast, processingId) {
    toast.hide(processingId);

    toast.show(
      "error",
      "Bypass Failed",
      error.message || "Please try refreshing the page",
      CONFIG.toastDuration
    );

    console.error("ABYSM Error:", error);
  }

  function init() {
    injectStyles();

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", bypassLink);
    } else {
      setTimeout(bypassLink, 100);
    }
  }

  init();
})();
