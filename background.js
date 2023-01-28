console.log('background');

chrome.alarms.create({ periodInMinutes: 1 / 600 });

chrome.alarms.onAlarm.addListener((res) => {
  chrome.storage.sync.get(['time'], ({ time = 0 }) => {
    time = time + 1;
    chrome.action.setBadgeText({
      text: `${time}`,
    });
    chrome.storage.sync.set({ time: time });
  });
});

//  chrome.alarms.create(
//   name?: string,
//   alarmInfo: AlarmCreateInfo,
//   callback?: function,
// )
