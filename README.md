# dumpsearch
Простенький скрипт для игры Космические рейнджеры 2.
Скрипт ищет артефакты и ЧД оборудование на необитаемых планетах.
Для поиска нужно создать т.н. dump с помощью ctrl+shift+makedump

# установка
понадобится установить git for windows и nodejs. Ищется поиском.
После чего выполнить следующие пункты.
1. В любой папке, например c:\temp, открываем консоль. Или открываем конслоль из меню Пуск и уже в ней переходим в нужную папку
2. набираем команду "git clone git@github.com:vladimir-repin-intel/dumpsearch.git"
3. следующая команда "cd dumpsearch"
4. "npm install"
5. "npx gulp buildLatest"

# конфигурация
1. В выбранной папке (с:\temp), нужно создать файл с настройками, имя файла dumpsearchConfig.json, содержимое например вот такое
```
{
	"savesPath": "c:/Users/{{username}}/OneDrive/Documents/SpaceRangersHD/Save/",
	"artifacts": ["ускоритель", "Гипергенератор", "Локализатор", "анализатор", "кэш"],
	"blackHoleModules": ["двигатель", "Ракетомет", "радар", "сканер"],
	"showAllArtifacts": true,
	"home": "Солнце",
	"distanceLimit": 40,
	"sizeLimit": 40
}
```
В первой строчке путь, где лежат файлы с сохранениями, надо подменить username и, если не установлен OneDrive, то также подкорректировать путь
 соответствующим образом.
Во второй строчке список артефактов, которые для вас в приоритете. Можно указывать не полностью, а частично, ищется по вхождению строки.
Но с учетом регистра, к примеру "гипергенератор" не найдет, а "Гипергенератор" - найдет. Также, как пишется в самой игре.
В третьей строчке имена (часть имен) предметов из ЧД.
Четвертая строчка - флаг, который после основного поиска, дополнительно выведет в конце все артефакты на всех планетах, 
даже если во второй строчке они не упомянуты.
пятая строчка - ваша домашняя система, если играете за людей, то Солнце, если за феян, то Атлан и т.п.
дальше ограничение по дальности от дома и ограничение по весу.

# Использование
1 в игре создаем dump, например с именем 123. В папке с сохранениями появятся два файла 123.sav и 123.txt
2 В коммандной строке, в папке c:\temp\dumpsearch выполняем команду "node index 123".

# Сценарий использования
1. Создаем новую галактику, после чего делаем дамп
2. alt-tab в консоль, запускаем скрипт, который выведет, есть ли нужные артефакты и оборудование в заданном весе и на заданном растоянии.
3. повторяем, пока не сгенерируется нужная нам галактика. 
