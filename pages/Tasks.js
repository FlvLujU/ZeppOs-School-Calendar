
Page({
  state: {},
  build() {
    hmUI.setStatusBarVisible(false)
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
    function extraerExamenes(data) {
      data = JSON.parse(data);
      const examenesPorAsignatura = {};
      data.asignaturas.forEach(asignatura => {
        examenesPorAsignatura[asignatura.nombre] = asignatura.actividades.examenes;
      });
      console.log("Examenes por Asignatura: ", JSON.stringify(examenesPorAsignatura));
      return examenesPorAsignatura;
    }
    function extraerTareas(data) {
      data = JSON.parse(data);
      const tareasPorAsignatura = {};
      data.asignaturas.forEach(asignatura => {
        tareasPorAsignatura[asignatura.nombre] = asignatura.actividades.tareas;
      });
      console.log("Tareas por Asignatura: ", JSON.stringify(tareasPorAsignatura));
      return tareasPorAsignatura;
    }
    function extraerProtectos(data) {
      data = JSON.parse(data);
      const proyectosPorAsignatura = {};
      data.asignaturas.forEach(asignatura => {
        proyectosPorAsignatura[asignatura.nombre] = asignatura.actividades.proyectos;
      });
      console.log("Proyectos por Asignatura: ", JSON.stringify(proyectosPorAsignatura));
      return proyectosPorAsignatura;
    }
    var bg = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      h: 9999,
      w: 390,
      color: 0xffffff,
    })
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

    // Uso de la función
    const tareas = extraerTareas(decodeJSON);
    const proyectos = extraerProtectos(decodeJSON);
    const examenes = extraerExamenes(decodeJSON);
    const tArray = []
    const eArray = []
    const pArray = []
    var tCount = 0
    var eCount = 0
    var pCount = 0
    var Mat_T = []
    var Leng_T = []
    var Ing_T = []
    var Tic_T = []
    var Fil_T = []
    var His_T = []
    var Fis_T = []
    var Tec_T = []
    var Mat_E = []
    var Leng_E = []
    var Ing_E = []
    var Tic_E = []
    var Fil_E = []
    var His_E = []
    var Fis_E = []
    var Tec_E = []
    var Mat_P = []
    var Leng_P = []
    var Ing_P = []
    var Tic_P = []
    var Fil_P = []
    var His_P = []
    var Fis_P = []
    var Tec_P = []
    for (const asignatura in tareas) {
      console.log("TLENGTH: " + tareas[asignatura].length)
      tCount += tareas[asignatura].length
      if (tareas[asignatura].length > 0) {
        console.log(`Tareas de ${asignatura}: ${tareas[asignatura].join(", ")}`);
        switch (asignatura) {
          case "Matemáticas":
            Mat_T.push(...tareas[asignatura]);
            break;
          case "Lengua":
            Leng_T.push(...tareas[asignatura]);
            break;
          case "Inglés":
            Ing_T.push(...tareas[asignatura]);
            break;
          case "TIC":
            Tic_T.push(...tareas[asignatura]);
            break;
          case "Filosofía":
            Fil_T.push(...tareas[asignatura]);
            break;
          case "Historia":
            His_T.push(...tareas[asignatura]);
            break;
          case "Física":
            Fis_T.push(...tareas[asignatura]);
            break;
          case "Tecnología":
            Tec_T.push(...tareas[asignatura]);
            break;
        }
      } else {
        console.log(`No hay tareas para ${asignatura}.`);
      }
    }

    for (const asignatura in proyectos) {
      pCount += proyectos[asignatura].length
      if (proyectos[asignatura].length > 0) {
        console.log(`Proyectos de ${asignatura}: ${proyectos[asignatura].join(", ")}`);
        switch (asignatura) {
          case "Matemáticas":
            Mat_P.push(...proyectos[asignatura]);
            break;
          case "Lengua":
            Leng_P.push(...proyectos[asignatura]);
            break;
          case "Inglés":
            Ing_P.push(...proyectos[asignatura]);
            break;
          case "TIC":
            Tic_P.push(...proyectos[asignatura]);
            break;
          case "Filosofía":
            Fil_P.push(...proyectos[asignatura]);
            break;
          case "Historia":
            His_P.push(...proyectos[asignatura]);
            break;
          case "Física":
            Fis_P.push(...proyectos[asignatura]);
            break;
          case "Tecnología":
            Tec_P.push(...proyectos[asignatura]);
            break;
        }
      } else {
        console.log(`No hay proyectos para ${asignatura}.`);
      }
    }

    for (const asignatura in examenes) {
      eCount += examenes[asignatura].length
      if (examenes[asignatura].length > 0) {
        console.log(`Examenes de ${asignatura}: ${examenes[asignatura].join(", ")}`);
        switch (asignatura) {
          case "Matemáticas":
            Mat_E.push(...examenes[asignatura]);
            break;
          case "Lengua":
            Leng_E.push(...examenes[asignatura]);
            break;
          case "Inglés":
            Ing_E.push(...examenes[asignatura]);
            break;
          case "TIC":
            Tic_E.push(...examenes[asignatura]);
            break;
          case "Filosofía":
            Fil_E.push(...examenes[asignatura]);
            break;
          case "Historia":
            His_E.push(...examenes[asignatura]);
            break;
          case "Física":
            Fis_E.push(...examenes[asignatura]);
            break;
          case "Tecnología":
            Tec_E.push(...examenes[asignatura]);
            break;
        }
        eCount++
      } else {
        console.log(`No hay examenes para ${asignatura}.`);
      }
    }
    function deleteElement(asignatura, tipoElemento, indiceElemento) {
      // Decodifica el archivo JSON cargado previamente
      var data = JSON.parse(decodeJSON);  // decodeJSON es el JSON original cargado

      // Buscar la asignatura correcta
      data.asignaturas.forEach(asig => {
        if (asig.nombre === asignatura) {
          // Dependiendo del tipo de elemento (tarea, examen o proyecto), eliminamos el elemento correspondiente
          switch (tipoElemento) {
            case "tarea":
              if (indiceElemento >= 0 && indiceElemento < asig.actividades.tareas.length) {
                asig.actividades.tareas.splice(indiceElemento, 1);  // Eliminar la tarea en el índice especificado
                console.log(`Tarea eliminada de ${asignatura}: Índice ${indiceElemento}`);
              } else {
                console.log("Índice de tarea no válido");
              }
              break;

            case "examen":
              if (indiceElemento >= 0 && indiceElemento < asig.actividades.examenes.length) {
                asig.actividades.examenes.splice(indiceElemento, 1);  // Eliminar el examen en el índice especificado
                console.log(`Examen eliminado de ${asignatura}: Índice ${indiceElemento}`);
              } else {
                console.log("Índice de examen no válido");
              }
              break;

            case "proyecto":
              if (indiceElemento >= 0 && indiceElemento < asig.actividades.proyectos.length) {
                asig.actividades.proyectos.splice(indiceElemento, 1);  // Eliminar el proyecto en el índice especificado
                console.log(`Proyecto eliminado de ${asignatura}: Índice ${indiceElemento}`);
              } else {
                console.log("Índice de proyecto no válido");
              }
              break;

            default:
              console.log("Tipo de elemento no válido");
          }

          // Después de eliminar el elemento, guardar el archivo actualizado
          saveJson('raw/tasks.json', data);
          hmApp.reloadPage({ url: 'pages/Tasks', param: '...' })
        }
      });
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
    var t = 20
    let c = 0; // Contador para las posiciones y
    for (const asignatura in tareas) {
      if (tareas[asignatura].length > 0) {
        // Crear un rectángulo para cada tarea de la asignatura
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 40,
          y: 10, // Usa el contador para posicionar correctamente
          w: 390 - 20,
          h: 80,
          color: 0x000000,
          text_size: 30,
          text: `Tareas:` // Mostrar la asignatura y la tarea
        });
        for (const [i, tarea] of tareas[asignatura].entries()) {
          // Crear un rectángulo para cada tarea
          let txt = tarea.substring(0, tarea.indexOf("!"))
          let colourNum = subjectsJson.indexOf(asignatura)
          console.log("colourNUm: " + colourNum)
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 10,
            y: 40 + 85 * c + 6 + 30, // Usa el contador para posicionar correctamente
            w: 390 - 20,
            h: 80,
            color: 0xdce8da,
            radius: 12
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(tarea, asignatura, i, "tarea");
          })
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 20,
            y: 50 + 85 * c + 6 + 30, // Usa el contador para posicionar correctamente
            w: 10,
            h: 60,
            color: subjectsColors[colourNum],
            radius: 12
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(tarea, asignatura, i, "tarea");
          })
          // Crear un texto para mostrar la asignatura y la tarea
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 40,
            y: 50 + 85 * c + 6 + 30 - 10, // Usa el contador para posicionar correctamente
            w: 390 - 20,
            h: 80,
            color: 0x000000,
            text: txt, // Mostrar la asignatura y la tarea
            text_size: t - 2
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(tarea, asignatura, i, "tarea");
          })

          c++; // Incrementa el contador para la próxima tarea
        }
      }
    }
    function renderMoreTask(description, name, index, doc) {
      hmApp.setLayerY(0)
      hmUI.setLayerScrolling(true)
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 550,
        color: 0xffffff,
      })
      let maskMonth = hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 70,
        color: 0xee1907
      });
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 50,
        y: 20,
        w: 390,
        h: 450,
        text_size: 26,
        color: 0x000000,
        text: name + ":"
      })
      let refresh = hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 - 115,
        y: 5,
        src: "refresh.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        hmApp.reloadPage({ url: 'pages/Tasks', param: '...' })
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: 90,
        w: 390,
        h: 450,
        text_size: 20,
        color: 0x000000,
        align_h: hmUI.align.CENTER_H,
        text: "Descripción:\n" + description.substring(0, description.indexOf("!"))
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: 210,
        w: 390,
        h: 450,
        text_size: 20,
        color: 0x000000,
        align_h: hmUI.align.CENTER_H,
        text: description.substring(description.indexOf("!") + 1, description.length)
      })
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 / 2 - 175,
        y: 300,
        src: "delete.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        deleteElement(name, doc, index)
      })
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 / 2 + 50,
        y: 300,
        src: "edit.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        console.log("coming soon")
      })
    }
    var d = 0
    for (const asignatura in examenes) {
      if (examenes[asignatura].length > 0) {
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 40,
          y: 10 + 80 + 85 * c + 10 + 5 + 36, // Usa el contador para posicionar correctamente
          w: 390 - 20,
          h: 80,
          color: 0x000000,
          text_size: 30,
          text: `Examenes:` // Mostrar la asignatura y la tarea
        });
        // Crear un rectángulo para cada tarea de la asignatura
        for (const [i, examen] of examenes[asignatura].entries()) {
          // Crear un rectángulo para cada tarea
          let colourNum = subjectsJson.indexOf(asignatura)
          let txt = examen.substring(0, examen.indexOf("!"))
          console.log("colourNUm: " + colourNum)
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 10,
            y: 10 + 80 + 85 * c + 10 + 5 + 40 + 85 * d + 66, // Usa el contador para posicionar correctamente
            w: 390 - 20,
            h: 80,
            color: 0xdce8da,
            radius: 12
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(examen, asignatura, i, "examen");
          })
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 20,
            y: 10 + 80 + 85 * c + 10 + 5 + 50 + 85 * d + 66, // Usa el contador para posicionar correctamente
            w: 10,
            h: 60,
            color: subjectsColors[colourNum],
            radius: 12
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(examen, asignatura, i, "examen");
          })
          // Crear un texto para mostrar la asignatura y la tarea
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 40,
            y: 10 + 80 + 85 * c + 70 + 5 + 50 + 85 * d + 6, // Usa el contador para posicionar correctamente
            w: 390 - 20,
            h: 80,
            color: 0x000000,
            text: txt, // Mostrar la asignatura y la tarea
            text_size: t
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(examen, asignatura, i, "examen");
          })
          d++; // Incrementa el contador para la próxima tarea
        }
      }
    }
    var e = 0
    for (const asignatura in proyectos) {
      if (proyectos[asignatura].length > 0) {
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 40,
          y: 10 + 80 + 85 * c + 10 + 5 + 50 + 85 * d + 10 + 5 + 66,
          h: 80,
          w: 222,
          text_size: 30,
          color: 0x000000,
          text: `Proyectos:`
        });
        for (const [i, proyecto] of proyectos[asignatura].entries()) {
          let colourNum = subjectsJson.indexOf(asignatura)
          let txt = proyecto.substring(0, proyecto.indexOf("!"))
          console.log("colourNUm: " + colourNum)
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 10,
            y: 10 + 80 + 85 * c + 10 + 5 + 70 + 85 * d + 10 + 35 + 90 + 85 * e + 6,
            w: 390 - 20,
            h: 80,
            color: 0xdce8da,
            radius: 12
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(proyecto, asignatura, i, "proyecto");
          })
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 20,
            y: 10 + 80 + 85 * c + 10 + 5 + 80 + 85 * d + 10 + 35 + 90 + 85 * e + 6, // Usa el contador para posicionar correctamente
            w: 10,
            h: 60,
            color: subjectsColors[colourNum],
            radius: 12
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(proyecto, asignatura, i, "proyecto");
          })
          // Crear un texto para mostrar la asignatura y la tarea
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 40,
            y: 10 + 80 + 85 * c + 10 + 5 + 80 + 85 * d + 40 + 35 + 70 + 85 * e - 5 + 6, // Usa el contador para posicionar correctamente
            w: 390 - 20,
            h: 80,
            color: 0x000000,
            text: txt, // Mostrar la asignatura y la tarea
            text_size: t
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(proyecto, asignatura, i, "proyecto");
          })

          e++; // Incrementa el contador para la próxima tarea
        }
      }
    }
    let minV2 = 10 + 80 + 85 * c + 10 + 5 + 80 + 85 * d + 40 + 35 + 70 + 85 * e - 5 + 6
    if (10 + 80 + 85 * c + 10 + 5 + 80 + 85 * d + 40 + 35 + 70 + 85 * e - 5 + 6 < 450) {
      minV2 = 450
    }
    if (c > 0 || d > 0 || e > 0) {
      let add = hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 / 2 - 76 / 2,
        y: minV2,
        src: "add.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        hmApp.reloadPage({ url: 'pages/newTask', param: '...' })
      })
    }
    if (c == 0 && d == 0 && e == 0) {
      hmUI.setLayerScrolling(false)
      let maskMonth = hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: 0xffffff
      });
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: 0x000000,
        text_size: 22,
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        text: "No task added!!!.\n\n Add task by sliding to the right\non the init page or\nin shcool calendar´s last page or here"
      });
      let add = hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 / 2 - 76 / 2,
        y: 300 + 35,
        src: "add.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        hmApp.reloadPage({ url: 'pages/newTask', param: '...' })
      })
    }
    console.log("tareas.length: " + tCount)
  },
  onDestroy() {
    console.log("Good By")
  },
});





