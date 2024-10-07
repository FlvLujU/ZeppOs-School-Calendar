Page({
  state: {},
  build() {
    hmUI.setScrollView(true, 390, 2, false)
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 35,
      y: 450 / 2 - 125,
      src: "calendar.png"
    }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      hmApp.gotoPage({ url: 'pages/calendar', param: '...' })
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 - 35 - 130,
      y: 450 / 2 - 125,
      src: "calendarS.png "
    }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      hmApp.gotoPage({ url: 'pages/index', param: '...' })
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 / 2 - 130 / 2,
      y: 450 / 2 + 80,
      src: "tasks.png"
    }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      hmApp.gotoPage({ url: 'pages/Tasks', param: '...' })
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 + (390 / 2 - 75),
      y: 450 / 2 - 75,
      src: "task.png"
  }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
    hmApp.gotoPage({ url: 'pages/newTask', param: '...' })
  })
  },
  onDestroy() {
  },
});