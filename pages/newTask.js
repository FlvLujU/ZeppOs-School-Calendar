
Page({
  state: {},
  build() {
    hmUI.setStatusBarVisible(false)
    hmUI.setLayerScrolling(false)
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
    const subjects = [
      'Matemáticas',
      'Lengua',
      'Física',
      'Filosofía',
      'Historia',
      'Inglés',
      'Tecnología',
      'TIC'
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
    const docsTypes = [
      'tarea',
      'proyecto',
      'examen'
    ]
    var count = 0
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      color: 0x355E3B,
      radius: 7
    })
    var time = hmSensor.createSensor(hmSensor.id.TIME)
    let txt = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 390 / 2 - 100,
      y: 50,
      w: 250,
      h: 70,
      text: subjects[count],
      text_size: 34,
      color: 0xffffff
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 10,
      y: 45,
      w: 70,
      h: 70,
      radius: 7,
      normal_color: 0x4CBB17,
      press_color: 0x5DCC28,
      text_size: 38,
      text: '<',
      click_func: () => {
        count = count - 1
        if (count < 0) {
          count = 7
        }
        txt.setProperty(hmUI.prop.MORE, {
          x: 390 / 2 - 50,
          w: 250,
          h: 70,
          text: subjects[count],
        })
      }
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 310,
      y: 45,
      w: 70,
      h: 70,
      radius: 7,
      normal_color: 0x4CBB17,
      press_color: 0x5DCC28,
      text_size: 38,
      text: '>',
      click_func: () => {
        count = count + 1
        if (count > 7) {
          count = 0
        }
        txt.setProperty(hmUI.prop.MORE, {
          x: 390 / 2 - 50,
          w: 250,
          h: 70,
          text: subjects[count],
        })
      }
    })
    const radioGroup = hmUI.createWidget(hmUI.widget.RADIO_GROUP, {
      x: 0,
      y: 0,
      w: 480,
      h: 64,
      select_src: 'select.png',
      unselect_src: 'unselect.png',
      check_func: (group, index, checked) => {
        if (index == 3 && checked == true) {

        } else if (index == 1 && checked == true) {
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 0,
            y: 0,
            w: 390,
            h: 450,
            color: 0x000000,
            radius: 7
          })
          let maskMonth = hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 0,
            y: 0,
            w: 390,
            h: 70,
            color: 0xee1907
          })
          let refresh = hmUI.createWidget(hmUI.widget.IMG, {
            x: 390 - 65,
            y: 5,
            src: "refresh.png"
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            hmApp.reloadPage({ url: 'pages/newTask', param: '...' })
          })
          let sig = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 30,
            y: 20,
            w: 250,
            h: 70,
            text: subjects[count] + ":",
            text_size: 27,
            color: 0xffffff
          })
          const pick_date_date = hmUI.createWidget(hmUI.widget.PICK_DATE)
          pick_date_date.setProperty(hmUI.prop.MORE, {
            w: 300,
            x: 45,
            y: 70,
            startYear: time.year,
            endYear: time.year + 1,
            initYear: time.year,
            initMonth: time.month,
            initDay: time.day
          })
          hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 0,
            y: 400,
            w: 390,
            h: 50,
            radius: 7,
            normal_color: 0x355E3B,
            press_color: 0x5DCC28,
            text: 'Submit',
            click_func: () => {
              const dateObj = pick_date_date.getProperty(hmUI.prop.MORE, {})
              const { year, month, day } = dateObj
              addItem(subjectsJson[count], docsTypes[index], `Proyecto de ${subjects[count]}.\nEntrega: ${day}/${month}/${year} !Fecha de creación: \n${time.day}/${time.month}/${time.year} ${time.hour}:${time.minute}:${time.second}`)
            }
          })
        } else if (index == 2 && checked == true) {
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 0,
            y: 0,
            w: 390,
            h: 450,
            color: 0x000000,
            radius: 7
          })
          let maskMonth = hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 0,
            y: 0,
            w: 390,
            h: 70,
            color: 0xee1907
          });
          let refresh = hmUI.createWidget(hmUI.widget.IMG, {
            x: 390 - 65,
            y: 5,
            src: "refresh.png"
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            hmApp.reloadPage({ url: 'pages/newTask', param: '...' })
          })
          let sig = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 30,
            y: 20,
            w: 250,
            h: 70,
            text: subjects[count] + ":",
            text_size: 27,
            color: 0xffffff
          })
          const pick_date_date = hmUI.createWidget(hmUI.widget.PICK_DATE)
          pick_date_date.setProperty(hmUI.prop.MORE, {
            w: 300,
            x: 45,
            y: 70,
            startYear: time.year,
            endYear: time.year + 1,
            initYear: time.year,
            initMonth: time.month,
            initDay: time.day
          })
          hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 0,
            y: 400,
            w: 390,
            h: 50,
            radius: 7,
            normal_color: 0x355E3B,
            press_color: 0x5DCC28,
            text: 'Submit',
            click_func: () => {
              const dateObj = pick_date_date.getProperty(hmUI.prop.MORE, {})
              const { year, month, day } = dateObj
              addItem(subjectsJson[count], docsTypes[index], `Examen de ${subjects[count]}.\nFecha: ${day}/${month}/${year} !Fecha de creación: \n${time.day}/${time.month}/${time.year} ${time.hour}:${time.minute}:${time.second}`)
            }
          })
        } else if (index == 0 && checked != true) {
          let pageCent = 1
          let pageDec = 2
          let pageUnit = 3
          let exDec = 1
          let exUnit = 2
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 0,
            y: 0,
            w: 390,
            h: 450,
            color: 0x000000,
            radius: 7
          })
          let maskMonth = hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 0,
            y: 0,
            w: 390,
            h: 70,
            color: 0xee1907
          })
          let refresh = hmUI.createWidget(hmUI.widget.IMG, {
            x: 390 - 65,
            y: 5,
            src: "refresh.png"
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            hmApp.reloadPage({ url: 'pages/newTask', param: '...' })
          })
          let sig = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 30,
            y: 20,
            w: 250,
            h: 70,
            text: subjects[count] + ":",
            text_size: 27,
            color: 0xffffff
          })
          const pick_date_date = hmUI.createWidget(hmUI.widget.PICK_DATE)
          pick_date_date.setProperty(hmUI.prop.MORE, {
            w: 300,
            x: 45,
            y: 70,
            startYear: time.year,
            endYear: time.year + 1,
            initYear: time.year,
            initMonth: time.month,
            initDay: time.day
          })
          let pageDesp = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 20,
            y: 225,
            w: 250,
            h: 70,
            text: "Page: ",
            text_size: 45,
            color: 0xffffff
          })
          let pageCentText = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 130 + 42,
            y: 225,
            w: 30,
            h: 70,
            text: pageCent,
            text_size: 50,
            color: 0xffffff
          })
          let pageDecText = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 155 + 42,
            y: 225,
            w: 30,
            h: 70,
            text: pageDec,
            text_size: 50,
            color: 0xffffff
          })
          let pageUnitText = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 180 + 42,
            y: 225,
            w: 30,
            h: 70,
            text: pageUnit,
            text_size: 50,
            color: 0xffffff
          })
          let exDesp = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 20,
            y: 300,
            w: 250,
            h: 70,
            text: "Ex: ",
            text_size: 45,
            color: 0xffffff
          })
          let exDecText = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 155 + 42,
            y: 300,
            w: 30,
            h: 70,
            text: pageDec,
            text_size: 50,
            color: 0xffffff
          })
          let exUnitText = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 180 + 42,
            y: 300,
            w: 30,
            h: 70,
            text: pageUnit,
            text_size: 50,
            color: 0xffffff
          })
          pageCentText.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            pageCent = pageCent + 1
            if (pageCent > 9) {
              pageCent = 0
            }
            pageCentText.setProperty(hmUI.prop.MORE, {
              text: pageCent,
              color: 0x0ec0f9
            })
            pageDecText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            pageUnitText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            exDecText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            exUnitText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
          })
          pageDecText.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            pageDec = pageDec + 1
            if (pageDec > 9) {
              pageDec = 0
            }
            pageCentText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            pageDecText.setProperty(hmUI.prop.MORE, {
              text: pageDec,
              color: 0x0ec0f9
            })
            pageUnitText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            exDecText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            exUnitText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
          })
          pageUnitText.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            pageUnit = pageUnit + 1
            if (pageUnit > 9) {
              pageUnit = 0
            }
            pageCentText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            pageDecText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            pageUnitText.setProperty(hmUI.prop.MORE, {
              text: pageUnit,
              color: 0x0ec0f9
            })
            exDecText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            exUnitText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
          })
          exDecText.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            exDec = exDec + 1
            if (exDec > 9) {
              exDec = 0
            }
            pageCentText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            pageDecText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            pageUnitText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            exDecText.setProperty(hmUI.prop.MORE, {
              text: exDec,
              color: 0x0ec0f9
            })
            exUnitText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
          })
          exUnitText.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            exUnit = exUnit + 1
            if (exUnit > 9) {
              exUnit = 0
            }
            pageCentText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            pageDecText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            pageUnitText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            exDecText.setProperty(hmUI.prop.MORE, {
              color: 0xffffff
            })
            exUnitText.setProperty(hmUI.prop.MORE, {
              text: exUnit,
              color: 0x0ec0f9
            })
          })
          hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 0,
            y: 400,
            w: 390,
            h: 50,
            radius: 7,
            normal_color: 0x355E3B,
            press_color: 0x5DCC28,
            text: 'Submit',
            click_func: () => {
              const dateObj = pick_date_date.getProperty(hmUI.prop.MORE, {})
              const { year, month, day } = dateObj
              addItem(subjectsJson[count], docsTypes[index], `Ejercicios de ${subjects[count]}.\nEntrega: ${day}/${month}/${year}, Page: ${String(pageCent) + String(pageDec) + String(pageUnit)}, Ejs: ${String(exDec) + String(exUnit)} !Fecha de creación: \n${time.day}/${time.month}/${time.year} ${time.hour}:${time.minute}:${time.second}`)
            }
          })
        }
      }
    })

    const button4 = radioGroup.createWidget(hmUI.widget.STATE_BUTTON, {
      x: 450,
      y: 190,
      w: 57,
      h: 57
    })
    const button2 = radioGroup.createWidget(hmUI.widget.STATE_BUTTON, {
      x: 55 - 35,
      y: 180 + 57 + 20,
      w: 57,
      h: 57
    })
    const button3 = radioGroup.createWidget(hmUI.widget.STATE_BUTTON, {
      x: 55 - 35,
      y: 180 + 57 + 20 + 57 + 20,
      w: 57,
      h: 57
    })
    const button1 = radioGroup.createWidget(hmUI.widget.STATE_BUTTON, {
      x: 55 - 35,
      y: 180,
      w: 57,
      h: 57
    })

    radioGroup.setProperty(hmUI.prop.INIT, button4)
    let txt1 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 55 + 57 + 20 - 35,
      y: 180,
      w: 250,
      h: 70,
      text: "Ejercicios",
      text_size: 26,
      color: 0xffffff
    })
    let txt2 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 55 + 57 + 20 - 35,
      y: 180 + 57 + 20,
      w: 250,
      h: 70,
      text: "Proyecto",
      text_size: 26,
      color: 0xffffff
    })
    let txt3 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 55 + 57 + 20 - 35,
      y: 180 + 57 + 20 + 57 + 20,
      w: 250,
      h: 70,
      text: "Examen",
      text_size: 26,
      color: 0xffffff
    })
    function addItem(name, type, element) {
      console.log("name: " + name, "type: " + type, "element: ", element);

      let data;
      try {
        data = JSON.parse(decodeJSON);
        console.log("dataaaaa: ", data);
      } catch (error) {
        console.error("Error al decodificar JSON: ", error);
        return;
      }

      // Encontrar la asignatura
      let subjectJSON = data.asignaturas.find(asig => asig.nombre === name);
      console.log("subjectJSON encontrado: ", subjectJSON);

      if (!subjectJSON) {
        // Crear nueva asignatura si no existe
        subjectJSON = {
          nombre: name,
          actividades: {
            tareas: [],
            proyectos: [],
            examenes: []
          }
        };
        data.asignaturas.push(subjectJSON);
        console.log("Nueva asignatura creada: ", subjectJSON);
      } else if (!subjectJSON.actividades) {
        // Asegurarte de que 'actividades' está definido
        subjectJSON.actividades = {
          tareas: [],
          proyectos: [],
          examenes: []
        };
        console.log("Actividades inicializadas para: ", subjectJSON);
      }

      // Ahora accede a examenes de forma segura
      if (!subjectJSON.actividades.examenes) {
        console.error("El objeto 'examenes' está indefinido");
        subjectJSON.actividades.examenes = [];
      }

      // Agregar el elemento a la sección correspondiente
      switch (type) {
        case 'tarea':
          subjectJSON.actividades.tareas.push(element);
          break;
        case 'proyecto':
          subjectJSON.actividades.proyectos.push(element);
          break;
        case 'examen':
          subjectJSON.actividades.examenes.push(element);
          break;
        default:
          console.log('Tipo no válido. Usa "tarea", "proyecto" o "examen".');
          return;
      }

      console.log("Nuevo Item agregado: ", element);
      console.log("Estado final de data: ", data);
      saveJson('raw/tasks.json', data);
      hmApp.reloadPage({ url: 'pages/newTask', param: '...' })
    }
    function saveJson(filename, json) {
      writeFile(filename, json);
    }
    function writeFile(filename, data) {
      console.log("withOutString: " + data)
      const buffer = jsonToArrayBuffer(data);
      console.log("newJsonString: " + JSON.stringify(data))
      const file = hmFS.open_asset(filename, hmFS.O_RDWR | hmFS.O_TRUNC);
      console.log("new Json: " + data)
      hmFS.write(file, buffer, 0, buffer.byteLength);
      hmFS.close(file);

    }
    function jsonToArrayBuffer(json) {
      const jsonString = JSON.stringify(json);
      const buffer = new ArrayBuffer(jsonString.length);
      const uint8Array = new Uint8Array(buffer);
      for (let i = 0; i < jsonString.length; i++) {
        uint8Array[i] = jsonString.charCodeAt(i);
      }
      return buffer;
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
      } else { console.log("err: " + err) } // file not found handler
    }
  },
  onDestroy() {
    console.log("Good By")
  },
});





