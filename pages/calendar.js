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
      const subjectsJson = [
        'Matematicas',
        'Lengua',
        'Fisica',
        'Filosofia',
        'Historia',
        'Ingles',
        'Tecnologia',
        'TIC'
      ]
      const subjectsColors = [
        0xFFD700,
        0x1E90FF,
        0x00FFFF,
        0x800080,
        0x8B4513,
        0xf7c2be,
        0x32CD32,
        0xA9A9A9
      ];
      var jsonBase = readFile('raw/tasks.json')
      console.log("JSON: " + jsonBase);
      var decodeJSON = decodeUint8Array(jsonBase);
      console.log("Decode JSON: " + decodeJSON);
      function decodeUint8Array(uint8array) {
        let decodedString = "";

        // Recorremos cada valor del Uint8Array
        for (let i = 0; i < uint8array.length; i++) {
          decodedString += String.fromCharCode(uint8array[i]);
        }

        return decodedString;
      }
      function readFile(filename) {
        const [fs_stat, err] = hmFS.stat_asset(filename);
        if (err === 0) {
          const { size } = fs_stat;
          const file_content_buffer = new Uint8Array(new ArrayBuffer(size));
          const file = hmFS.open_asset(filename, hmFS.O_RDONLY);
          hmFS.seek(file, 0, hmFS.SEEK_SET);
          hmFS.read(file, file_content_buffer.buffer, 0, size);
          hmFS.close(file);
          console.log("err: " + err)
          console.log("size: " + size)
          console.log("TEXT: " + new Uint8Array(file_content_buffer))
          return file_content_buffer;
        } else {
          console.log("err: " + err)
        } // file not found handler
      }
      var dates = JSON.parse(decodeJSON).fechas
      console.log("fechas: " + dates)
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
      var impt = []

      function reColor() {
        for (let index = 0; index < 42; index++) {
          let i = index % 7;   // Calcula el valor de i (columna)
          let j = Math.floor(index / 7);
          impt[index].setProperty(hmUI.prop.MORE, {
            color: i < 5 ? 0xffffff : j > 4 ? 0xffffff : 0xdce8da,
          })
          events[index].removeEventListener(hmUI.event.CLICK_UP, function (info) {

          })
        }
      }
      var color = 0xea780d
      function renderCalendar(year, month) {
        let str = '\n\n\n\n';
        let firstDay = getFirstDayOfMonth(year, month);
        let dayNum = getDayNum(year, month);
        firstDay = (firstDay + 6) % 7;
        var initI = 1
        let cWeek = firstDay;
        reColor()
        console.log("actualStart: " + cWeek)
        var counter = 0
        var count = 0
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
            count++
          } else {
            if (i == 0) {
              str += "\n"
            }
            cWeek = 0
          }
        }
        for (let i = initI; i <= dayNum; i++, cWeek++) {
          count++
          if (i < 10) str += '0';
          str += i + '     ';
          let renderDate = String(i) + "/" + String(month) + "/" + String(year)
          if (String(i).length == 1 && dates.includes(renderDate) && String(i) == String(dates[dates.indexOf(renderDate)]).slice(0, 1)) {
            console.log("First day: " + String(dates[dates.indexOf(renderDate)]).slice(0, 1))
            impt[count - 1].setProperty(hmUI.prop.MORE, {
              color: color
            })
            events[count - 1].addEventListener(hmUI.event.CLICK_UP, function (info) {
              let data = buscarFecha(renderDate)
              renderPageDate(data, renderDate)
            })
          } else if (String(i).length == 2 && dates.includes(renderDate) && String(i) == String(dates[dates.indexOf(renderDate)]).slice(0, 2)) {
            impt[count - 1].setProperty(hmUI.prop.MORE, {
              color: color
            })
            events[count - 1].addEventListener(hmUI.event.CLICK_UP, function (info) {
              let data = buscarFecha(renderDate)
              renderPageDate(data, renderDate)
            })
          }
          if (cWeek >= 4) {
            str += '\n';
            cWeek = -1
            i += 2;
            count += 2
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
      var colorv = 0xb1cdd0
      function renderCalendarEnd(year, month) {
        let str = '\n\n\n\n';
        let firstDay = getFirstDayOfMonth(year, month);
        let f = (firstDay + 6) % 7;
        let dayNum = getDayNum(year, month);
        console.log("actualStart: " + firstDay);
        if (firstDay == 0) {
          str += "          "
        }
        let mult = 1
        var count = 0
        var add = 0
        for (let i = 1; i <= dayNum; i++) {
          count++
          console.log(count)
          let dayOfWeek = new Date(year, month - 1, i).getDay();
          dayOfWeek = (dayOfWeek + 6) % 7;
          if (dayOfWeek === 5 || dayOfWeek === 6) {
            if (i < 10) str += '0';
            str += i + '     ';
            let renderDate = String(i) + "/" + String(month) + "/" + String(year)
            if (String(i).length == 1 && dates.includes(renderDate) && String(i) == String(dates[dates.indexOf(renderDate)]).slice(0, 1)) {
              console.log("First day: " + String(dates[dates.indexOf(renderDate)]).slice(0, 1))
              impt[count].setProperty(hmUI.prop.MORE, {
                color: colorv
              })
              events[count].addEventListener(hmUI.event.CLICK_UP, function (info) {
                let data = buscarFecha(renderDate)
                renderPageDate(data, renderDate)
              })
            } else if (String(i).length == 2 && dates.includes(renderDate) && String(i) == String(dates[dates.indexOf(renderDate)]).slice(0, 2)) {
              impt[count].setProperty(hmUI.prop.MORE, {
                color: colorv
              })
              events[count].addEventListener(hmUI.event.CLICK_UP, function (info) {
                let data = buscarFecha(renderDate)
                renderPageDate(data, renderDate)
              })
            }
          } else {
            if (add < 1) {
            }
          }
          if (dayOfWeek === 6) {
            str += '\n';
            add++
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
      function renderPageDate(data, date) {
        console.log("jgjjgjhgjh: " + date)
        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: 0,
          y: 0,
          h: 9999,
          w: 390,
          color: 0xffffff,
        })
        let maskMonth = hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: 0,
          y: 0,
          w: 390,
          h: 70,
          color: 0xee1907
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 40,
          y: 20,
          w: 255,
          h: 70,
          text: `Filtradas: ${date}`,
          text_size: 25,
          color: 0xffffff
        })
        let refresh = hmUI.createWidget(hmUI.widget.IMG, {
          x: 390 - 105,
          y: 5,
          src: "refresh.png"
        }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
          hmApp.reloadPage({ url: 'pages/calendar', param: '...' })
        })
        for (let i = 0; i < data[0].length; i++) {
          let txt = data[0][i].substring(0, data[0][i].indexOf("!"))
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 10,
            y: 120 + 85 * i,
            w: 370,
            h: 80,
            radius: 12,
            color: 0xdce8da
          })
          let colourNum = subjectsJson.indexOf(data[1][i])
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 20,
            y: 130 + 85 * i,
            w: 10,
            h: 60,
            color: subjectsColors[colourNum],
            radius: 12
          })
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 40,
            y: 130 + 85 * i, // Usa el contador para posicionar correctamente
            w: 390 - 20,
            h: 80,
            color: 0x000000,
            text: txt, // Mostrar la asignatura y la tarea
            text_size: 18
          })
        }
      }
      let mask = calendarGroup.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: 0xffffff
      });
      let maskweekend = calendarGroup.createWidget(hmUI.widget.FILL_RECT, {
        x: 243,
        y: 147,
        w: 80,
        h: 160,
        radius: 12,
        color: 0xdce8da
      });
      var rad = 12
      for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 7; i++) {
          var widget = calendarGroup.createWidget(hmUI.widget.FILL_RECT, {
            x: i < 5 ? (2 + 390 / 8) - 1 + i * 40 : (2 + 390 / 8) + i * 40,
            y: 184 - 8 + j * 26,
            w: 24,
            h: 24,
            color: i < 5 ? 0xffffff : j > 4 ? 0xffffff : 0xdce8da,
            radius: 24,
          })
          impt.push(widget)
        }
      }
      var events = []
      for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 7; i++) {
          var widget = hmUI.createWidget(hmUI.widget.IMG, {
            x: i < 5 ? (2 + 390 / 8) - 1 + i * 40 : (2 + 390 / 8) + i * 40,
            y: 184 - 8 + j * 26,
            w: 24,
            h: 24,
            src: ".png"
          })
          events.push(widget)
        }
      }
      let maskMonth = calendarGroup.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 70,
        color: 0xee1907
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
      function buscarFecha(fechaBuscada) {
        // Parsear el JSON
        const data = JSON.parse(decodeJSON);
    
        // Arrays para almacenar las actividades encontradas y sus asignaturas correspondientes
        const fechasEncontradas = [];
        const asignaturasEncontradas = [];
        const dev = [];
    
        // Iterar sobre cada asignatura y sus actividades
        data.asignaturas.forEach(asignatura => {
            // Combinar todas las actividades de exámenes, tareas y proyectos
            const actividades = [
                ...asignatura.actividades.examenes,
                ...asignatura.actividades.tareas,
                ...asignatura.actividades.proyectos
            ];
    
            // Filtrar actividades que contienen la fecha buscada
            actividades.forEach(actividad => {
                console.log("actividad: " + actividad); // Depuración
    
                if (actividad.indexOf("Fecha: " + fechaBuscada) !== -1) {
                    // Si es examen o tarea, verifica la fecha
                    console.log("lklhklh");
                    fechasEncontradas.push(actividad);
                    asignaturasEncontradas.push(asignatura.nombre); // Agregar la asignatura correspondiente
                } else if (actividad.indexOf("Entrega: " + fechaBuscada) !== -1) {
                    // Si es proyecto, verifica la fecha de entrega
                    console.log("wergw");
                    fechasEncontradas.push(actividad);
                    asignaturasEncontradas.push(asignatura.nombre); // Agregar la asignatura correspondiente
                }
            });
        });
    
        // Crear el array `dev` con ambos arrays (fechas y asignaturas)
        dev.push(fechasEncontradas);  // Primer array: actividades con la fecha encontrada
        dev.push(asignaturasEncontradas);  // Segundo array: asignaturas correspondientes
    
        // Mostrar resultados
        if (fechasEncontradas.length > 0) {
            console.log(`Fechas encontradas: ${fechasEncontradas}`);
            console.log(`Asignaturas correspondientes: ${asignaturasEncontradas}`);
            return dev; // Devolver ambos arrays
        } else {
            console.log(`La fecha ${fechaBuscada} NO se encuentra en las actividades.`);
            return dev; // Devuelve arrays vacíos si no se encuentra nada
        }
    }
    buscarFecha("7/10/2024")
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