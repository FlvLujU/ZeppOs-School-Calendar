import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../utils/config/device";
Page({
  state: {},
  build() {
    hmUI.setScrollView(true, 390, 6, false)
    hmUI.setStatusBarVisible(false)
    const darkerColors = [
      0x96a29a,
      0x8a928f,
      0x7e837f,
      0x4db0df,
      0x665f5e,
      0x5a4f4e,
      0x4e3f3d,
      0x422f2d
    ];
    const Calendar = [
      ["Inglés", "Tecnología", "Lengua", "Recreo", "Física", "Historia", "Filosofía"],
      ["Matemáticas", "TIC", "Filosofía", "Recreo", "Física", "Historia", "Inglés"],
      ["TIC", "Historia", "Filosofía", "Recreo", "Tecnología", "Matemáticas", "Lengua", "Física"],
      ["Lengua", "Matemáticas", "Historia", "Recreo", "Tecnología", "TIC", "Inglés"],
      ["Inglés", "Lengua", "Tutoría", "Recreo", "TIC", "Matemáticas", "Física", "Tecnología"]
    ]
    var initsHour = ["8", "9", "10", "11", "11", "12", "13", "14"]
    var endHour = ["9", "10", "11", "11", "12", "13", "14", "15"]
    var initMinute = ["30", "25", "20", "15", "45", "40", "35", "30"]
    var endMinute = ["25", "20", "15", "45", "40", "35", "30", "25"]
    var weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
    var time = hmSensor.createSensor(hmSensor.id.TIME)
    var day = time.week
    let ScrollDay = day - 1
    if(ScrollDay > 4){
      ScrollDay = 0
    }
    hmUI.scrollToPage(ScrollDay, false)
    var h = time.hour
    var min = time.minute
    var daytime = h + ":" + min
    var rects = []
    var texts = []
    var times = []
    var rectReds = []
    var weekTexts = []
    var isDay = false
    if (day == 3 || day == 5) {
      isDay = true
    }
    var num = 7
    var init = 30
    var L = [60, 60, 53, 60, 53]
    var sum = 0
    if (isDay == true) {
      num = 8
      init = 30
      sum = 0
    }
    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < Calendar[j].length; i++) {
        const { width, height } = hmUI.getTextLayout(weekDays[j], {
          text_size: 26,
          text_width: 0,
          wrapped: 0
        })
        let rectRed = hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: 390 * j,
          y: 0,
          w: 390,
          h: init,
          color: 0xfa270a,
          radius: 0
        })
        rectReds.push(rectRed)
        let weekText = hmUI.createWidget(hmUI.widget.TEXT, {
          x: (390 / 2 - width / 2) + 390 * j,
          y: -5,
          w: 390,
          h: init,
          color: 0xffffff,
          text_size: 26,
          text: weekDays[j]
        })
        weekTexts.push(weekText)
        if (getText() != -1) {
          let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 390 * j,
            y: init + L[j] * i,
            w: 390,
            h: L[j],
            color: getText() == i + 1 && j == day - 1 ? 0x01a8fc : darkerColors[i],
            radius: 0
          })
          rects.push(rect)
          let text = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 45 + 390 * j,
            y: (init + sum) + L[j] * i,
            w: 390,
            h: 40,
            color: 0xffffff,
            text_size: 26,
            text: Calendar[j][i]
          })
          texts.push(text)
          let time = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 225 + 390 * j,
            y: (init + sum) + L[j] * i,
            w: 390,
            h: 40,
            color: 0xffffff,
            text_size: 18,
            text: initsHour[i] + ":" + initMinute[i] + " - " + endHour[i] + ":" + endMinute[i]
          })
          times.push(time)
        } else {
          if (j != day - 1) {
            let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
              x: 390 * j,
              y: init + L[j] * i,
              w: 390,
              h: L[j],
              color: getText() == i + 1 && j == day - 1 ? 0x01a8fc : darkerColors[i],
              radius: 0
            })
            rects.push(rect)
            let text = hmUI.createWidget(hmUI.widget.TEXT, {
              x: 45 + 390 * j,
              y: (init + sum) + L[j] * i,
              w: 390,
              h: 40,
              color: 0xffffff,
              text_size: 26,
              text: Calendar[j][i]
            })
            texts.push(text)
            let time = hmUI.createWidget(hmUI.widget.TEXT, {
              x: 225 + 390 * j,
              y: (init + sum) + L[j] * i,
              w: 390,
              h: 40,
              color: 0xffffff,
              text_size: 18,
              text: initsHour[i] + ":" + initMinute[i] + " - " + endHour[i] + ":" + endMinute[i]
            })
            times.push(time)
          }else{
            let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
              x: 390 * j,
              y: 0,
              w: 390,
              h: 450,
              color: darkerColors[0],
              radius: 0
            })
            let text = hmUI.createWidget(hmUI.widget.TEXT, {
              x: 45 + 390 * j,
              y: 120,
              w: 390,
              h: 180,
              color: 0xffffff,
              text_size: 35,
              text: "No hay más clases\n hoy. ¡Aprovecha el\n resto del día!"
            })
          }
        }
      }
    }
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 * 5 + (390 / 2 - 75),
      y: 450 / 2 - 75,
      src: "task.png"
  }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
    hmApp.gotoPage({ url: 'pages/newTask', param: '...' })
  })
    function getText() {
      const currentClass = getCurrentClass(h, min);
      return currentClass
    }
    function convertToMinutes(hour, minute) {
      return parseInt(hour) * 60 + parseInt(minute);
    }
    function getCurrentClass(currentHour, currentMinute) {
      const currentTime = convertToMinutes(currentHour, currentMinute);
      for (let i = 0; i < initsHour.length; i++) {
        const classStart = convertToMinutes(initsHour[i], initMinute[i]);
        const classEnd = convertToMinutes(endHour[i], endMinute[i]);

        if (currentTime >= classStart && currentTime <= classEnd) {
          return i + 1;
        }
      }
      return -1;
    }
  },
  onDestroy() {
  },
});
