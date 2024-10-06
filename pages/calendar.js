Page({
  state: {},
  build() {
    try {
      hmUI.setStatusBarVisible(false)
      hmUI.setLayerScrolling(false)
      const time = hmSensor.createSensor(hmSensor.id.TIME);
      var months =
        [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      console.log("CALENDAR")
      var year, month, week;
      let cYear = time.year, cMonth = time.month, cWeek = time.week, cDay = time.day;
      console.log(cYear);
      if (cYear != year || cMonth != month) {
        year = cYear, month = cMonth;
        week = (cWeek + 35 - (cDay - 1)) % 7;
        console.log(cYear, cMonth, cWeek)
      }
      function getFirstDayOfMonth(year, month) {
        let date = new Date(year, month - 1, 1);
        return date.getDay();
      }

      function getDayNum(year, month) {
        return new Date(year, month, 0).getDate();
      }
      function renderCalendar(year, month) {
        let str = '\n\n\n\n';
        let firstDay = getFirstDayOfMonth(year, month);
        let dayNum = getDayNum(year, month);
        firstDay = (firstDay + 6) % 7;
        var initI = 1
        let cWeek = firstDay;
        console.log("actualStart: " + cWeek)
        var counter = 0
        if (cWeek == 5) {
          initI += 2
          cWeek = -1
        }
        if (cWeek == 6) {
          initI += 1
          cWeek = -1
        }
        console.log("Init: " + initI)
        for (let i = 0; i < firstDay + initI - 1; i++) {
          if (initI == 1) {
            str += '          ';
          } else {
            if (i == 0) {
              str += "\n"
            }
            cWeek = 0
          }
        }
        for (let i = initI; i <= dayNum; i++, cWeek++) {
          if (i < 10) str += '0';
          str += i + '     ';
          if (cWeek >= 4) {
            str += '\n';
            cWeek = -1
            i += 2;
            counter++
          }
        }
        calendar.setProperty(hmUI.prop.MORE, {
          text: str
        });
        monthShow.setProperty(hmUI.prop.MORE, {
          text: months[month - 1] + ' ' + year
        });

        console.log(str);
      }
      function renderCalendarEnd(year, month) {
        let str = '\n\n\n\n';
        let firstDay = getFirstDayOfMonth(year, month);
        let dayNum = getDayNum(year, month);
        console.log("actualStart: " + firstDay);
        if (firstDay == 0) {
          str += "          "
        }
        let mult = 1
        for (let i = 1; i <= dayNum; i++) {
          let dayOfWeek = new Date(year, month - 1, i).getDay();
          dayOfWeek = (dayOfWeek + 6) % 7;
          if (dayOfWeek === 5 || dayOfWeek === 6) {
            if (i < 10) str += '0';
            str += i + '     ';
          }
          if (dayOfWeek === 6) {
            str += '\n';
          }
        }
        calendarEnd.setProperty(hmUI.prop.MORE, {
          text: str
        });
        console.log(str);
      }
      let calendarGroup = hmUI.createWidget(hmUI.widget.GROUP, {
        x: 0,
        y: 0,
        w: 192,
        h: 450
      });
      let mask = calendarGroup.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: 0xffffff
      });
      let maskMonth = calendarGroup.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 70,
        color: 0xee1907
      });
      let maskweekend = calendarGroup.createWidget(hmUI.widget.FILL_RECT, {
        x: 243,
        y: 147,
        w: 80,
        h: 164,
        radius: 12,
        color: 0xdce8da
      });
      let dateCover = calendarGroup.createWidget(hmUI.widget.TEXT, {
        x: 50,
        y: 338,
        w: 81,
        h: 21,
      });
      let calendar = calendarGroup.createWidget(hmUI.widget.TEXT, {
        x: 2 + 390 / 8,
        y: 70,
        w: 200,
        h: 420,
        color: 0x535352,
        text_size: 18,
        text_style: hmUI.text_style.WRAP
      });
      let calendarEnd = calendarGroup.createWidget(hmUI.widget.TEXT, {
        x: 2 + 250,
        y: 70,
        w: 200,
        h: 350,
        color: 0xf96053,
        text_size: 18,
        text_style: hmUI.text_style.WRAP
      });
      let calendarDays = calendarGroup.createWidget(hmUI.widget.TEXT, {
        x: 2 + 390 / 8,
        y: 70,
        w: 390,
        h: 350,
        color: 0x000000,
        text: `\n\n\nM        T       W       T        F`,
        text_size: 18,
        text_style: hmUI.text_style.WRAP
      });
      let calendarDaysEnd = calendarGroup.createWidget(hmUI.widget.TEXT, {
        x: 2 + 390 / 8,
        y: 70,
        w: 390,
        h: 350,
        color: 0xee1907,
        text: `\n\n\n                                                     S       S`,
        text_size: 18,
        text_style: hmUI.text_style.WRAP
      });
      calendar.addEventListener(hmUI.event.CLICK_UP, function (info) {
        calendarGroup.setProperty(hmUI.prop.VISIBLE, false);
      });
      let monthShow = calendarGroup.createWidget(hmUI.widget.TEXT, {
        x: 100,
        y: 10,
        w: 192,
        h: 40,
        color: 0xffffff,
        text_size: 30,
        align_h: hmUI.align.CENTER_H,
      });

      dateCover.addEventListener(hmUI.event.CLICK_UP, function (info) {
        //console.log(info.x);
        let cYear = time.year, cMonth = time.month, cWeek = time.week, cDay = time.day;
        console.log(cYear);
        if (cYear != year || cMonth != month) {
          year = cYear, month = cMonth;
          week = (cWeek + 35 - (cDay - 1)) % 7;
          renderCalendar(year, month, week)
        }
      });
      function preButtonClick(button) {
        if (month == 1) year--, month = 12;
        else month--;
        let day = getDayNum(year, month);
        week = (week + 35 - day) % 7;
        if (week == 0) week = 7;
        renderCalendar(year, month, week)
        renderCalendarEnd(year, month, week);
      }
      let preButton = calendarGroup.createWidget(hmUI.widget.BUTTON, {
        x: 0,
        y: 450 - 80,
        w: 390 / 2,
        h: 80,
        press_color: 0xe9efe8,
        normal_color: 0xd8ded7,
        color: 0x000000,
        text_size: 33,
        text: 'Prev.',
        click_func: preButtonClick
      });
      function nextButtonClick(button) {
        let day = getDayNum(year, month);
        if (month == 12) year++, month = 1;
        else month++;
        week = (week + day) % 7;
        if (week == 0) week = 7;
        renderCalendar(year, month, week);
        renderCalendarEnd(year, month, week);
      };
      let nextButton = calendarGroup.createWidget(hmUI.widget.BUTTON, {
        x: 390 / 2,
        y: 370,
        w: 390 / 2,
        h: 80,
        press_color: 0xe9efe8,
        normal_color: 0xd8ded7,
        color: 0x000000,
        text_size: 33,
        text: 'Next.',
        click_func: nextButtonClick
      });
      let day = getDayNum(year, month);

      week = (week + day) % 7;
      if (week == 0) week = 7;
      renderCalendar(year, month, week);
      renderCalendarEnd(year, month, week);
    } catch (e) {
      console.log("error: " + e)
    }
  },
  onDestroy() {
  },
});