"use strict";
// @ts-ignore
chrome.alarms.create('pomodor-timer', {
    periodInMinutes: 1 / 60,
});
// @ts-ignore
chrome.alarms.onAlarm.addListener((res) => {
    if (res.name === 'pomodor-timer') {
        // @ts-ignore
        chrome.storage.sync.get(['timer', 'isRunning', 'complete'], ({ timer = 0, isRunning = false, complete = false }) => {
            if (isRunning) {
                // @ts-ignore
                chrome.storage.sync.set({ timer: timer + 1, isRunning });
            }
            if (complete) {
                // @ts-ignore
                // @ts-ignore
                this.registration.showNotification('Your 25min is Done ! 🚀', {
                    body: 'you can set New Goal and duration to achieve !',
                    icon: 'icon.png',
                });
            }
            // console.log({ timer });
        });
    }
});
