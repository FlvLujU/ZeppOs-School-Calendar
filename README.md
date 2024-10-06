# ZeppOS-School Calendar


## Schedule calendar App for Zepp os users.

For now, app can only be runed on amazfit gts 3, and app´s languaje is Spanish, this will be updated in the future.

This is app interface:

![alt text](assets/image-2.png)

![alt text](assets/image-6.png)

For now in the calendar, you can only see a calendar, in future, a better implementation with task will be added.

![alt text](assets/image-3.png)

In the schhol calendar, you will, be able to see your current day schedule and the other days ones.

How to set your schedule will be explained later...

![alt text](assets/image-5.png)

![alt text](assets/image-4.png)

Swipe to the last page to enter to the new task creation manager.

![alt text](assets/image-7.png)

Click it and here is Interface:

![alt text](assets/image-8.png)

Click on the arrows to change between the subjects (more will be added in the future).

Click on the dots to select the New Task type, after that, you will see this:

![alt text](assets/image-9.png)

This is a new Task, which type is task (avaliable are task, exam and project), so you will have to select the deadline date and which exercises you are asked to make for.

Click in a number to move to the next and change pages´s index and move up and down the date to select one date

When all is good, just press submit button, and you will be redirected into the previous page, in case you want to create another task,

make the previous steps again, else, swipe left to go the last page.

Here is Task manager Page

![alt text](assets/image-10.png)

Touch in a task in order to delete it or see a few more data about it...

![alt text](assets/image-11.png)

In case you dont have task, you will see this:

![alt text](assets/image-12.png)



# How to use

## Requirements

* [Node.js](https://youtu.be/MrJkkG-yt7A?t=23)
* [ZeusCLI](https://docs.zepp.com/docs/guides/tools/cli/#installing-the-zeus-cli)

## Installation process

#### 1. Download the project.

#### 2. Open it.

#### 3. Go to pages sub-folder.

#### 4. Open in edit-mode index.js

#### 5. After opening you will see this:

            const Calendar = [
      ["Inglés", "Tecnología", "Lengua", "Recreo", "Física", "Historia", "Filosofía"],
      ["Matemáticas", "TIC", "Filosofía", "Recreo", "Física", "Historia", "Inglés"],
      ["TIC", "Historia", "Filosofía", "Recreo", "Tecnología", "Matemáticas", "Lengua", "Física"],
      ["Lengua", "Matemáticas", "Historia", "Recreo", "Tecnología", "TIC", "Inglés"],
      ["Inglés", "Lengua", "Tutoría", "Recreo", "TIC", "Matemáticas", "Física", "Tecnología"]
    ]

#### 6. Just put your subjects in each gap, without adding or deleting any one, if there arent no more subjects today just don´t put nothing(this will be added in future)

#### 7. YOU MUSN´T DELETE THE "" AT THE INIT OF EACH SUBJECT, IF YOU DO, PROGRAM WON´T WORK

#### 8. Modifying your subjects time...

#### 9. In next line, you will see this:

    var initsHour = ["8", "9", "10", "11", "11", "12", "13", "14"]
    var endHour = ["9", "10", "11", "11", "12", "13", "14", "15"]
    var initMinute = ["30", "25", "20", "15", "45", "40", "35", "30"]
    var endMinute = ["25", "20", "15", "45", "40", "35", "30", "25"]

#### 10. Just modify it according to your needs, I think it is not need to be mentioned how to do it...

#### 11. YOU MUSN´T DELETE THE "" AT THE INIT OF EACH SUBJECT, IF YOU DO, PROGRAM WON´T WORK

#### 12. Save the file and use Zeus Cli tool to see it on your watch

App will be more user-friendly in future for now, this is what it is...

ANY SUGGESTION WILL BE GREATLY APPRECIATED.


## Zepp-School-Calendar
