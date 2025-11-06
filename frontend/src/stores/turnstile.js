import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useCloudflareTurnstile = defineStore(
    "cloudflare-turnstile",
    () => {
        const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
        const turnstileScriptUrl = import.meta.env
            .VITE_CLOUDFLARE_TURNSTILE_SCRIPT_URL;
        let widgetId = null;
        let scriptEl = null;
        const reCaptchaToken = ref(null);
        const oldTurnstileToken = ref(null);

        const loadScript = () => {
            return new Promise((resolve) => {
                if (window.turnstile) {
                    resolve();
                    return;
                }

                scriptEl = document.createElement("script");
                scriptEl.src = turnstileScriptUrl;
                scriptEl.async = true;
                scriptEl.defer = true;
                scriptEl.id = "turnstile-script";
                scriptEl.onload = resolve;

                document.body.appendChild(scriptEl);
            });
        };

        const insertWidget = async () => {
            if (!window.turnstile) {
                console.warn("Turnstile script not loaded yet");
                return;
            }

            const turnstileContainer =
                document.getElementById("turnstileContainer");

            widgetId = window.turnstile.render(turnstileContainer, {
                sitekey: siteKey,
                callback: (token) => {
                    reCaptchaToken.value = token;
                },
                "error-callback": refreshTurnstileToken,
                "expired-callback": refreshTurnstileToken,
            });
        };

        const removeWidget = () => {
            const container = document.getElementById("turnstileContainer");

            if (container != null) container.innerHTML = "";

            if (window?.turnstile != null && container == null) {
                if (scriptEl) {
                    scriptEl.remove();
                    scriptEl = null;
                }
            }

            reCaptchaToken.value = null;
        };

        const refreshTurnstileToken = () => {
            reCaptchaToken.value = null;
            window.turnstile.reset(widgetId);
        };

        const getTurnstileToken = async () => {
            if (widgetId == null || scriptEl == null) {
                await loadScript();
                insertWidget();
            }

            if (reCaptchaToken.value == null) {

                // Promise to ensure reCaptchaToken gets values
                const response = await new Promise((resolve) => {
                    const stop = watch(reCaptchaToken, (val) => {
                        if (val) {
                            stop();
                            resolve(val);
                        }
                    });
                });
                oldTurnstileToken.value = response;

                return response;
            } else if (reCaptchaToken.value !== oldTurnstileToken.value) {
                oldTurnstileToken.value = reCaptchaToken.value;
                return reCaptchaToken.value;
            }
        };

        watch(reCaptchaToken, () => {
            console.log("🔖  token generated");
        });

        return {
            siteKey,
            reCaptchaToken,
            oldTurnstileToken,

            loadScript,
            insertWidget,
            refreshTurnstileToken,
            removeWidget,
            getTurnstileToken,
        };
    }
);
