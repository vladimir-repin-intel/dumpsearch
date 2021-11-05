# dumpsearch
Простенький скрипт для игры Космические рейнджеры 2 HD.
Скрипт конвертирует сейв дамп в удобоваримый json по которому проще написать условие выборки.
Соответственно если хоть немного понимаете в программировании и в js, то сможете написать для себя комплексные условия выборки.

# установка
понадобится установить git for windows и nodejs. Ищется поиском.
После чего выполнить следующие пункты.
1. В любой папке, например c:\temp, открываем консоль. Или открываем конслоль из меню Пуск и уже в ней переходим в нужную папку
2. набираем команду "git clone git@github.com:vladimir-repin-intel/dumpsearch.git"
3. следующая команда "cd dumpsearch"
4. "npm ci"
5. "npm run build"

# конфигурация
1. В выбранной папке (с:\temp), нужно создать файл с именем dumpMetric.js, содержимое например вот такое
```
const inProximity = (item) => item.cornerDistance < 40;
const inRange = (item) => item.horizontalDistance <= 30 && item.cornerDistance <= 50;

function getMetric(model) {	
	const goodPlanets = model.planets.filter(inRange).filter(p => p.isIndustrial && p.isGaalOrFei).filter(p => p.size >= 4);	
	const arts = model.artifacts.filter(inProximity);
	const hasAccel = arts.some(art => art.name.includes("ускоритель") || art.name.includes("Сопланатор"));
  const hasBeacon = arts.some(art => art.name.includes("маяк"));
	const launchers = model.launchers.filter(inProximity).filter(e => e.weight <= 20 && e.level > 1);
	const print = `planets ${goodPlanets.length} accelerator ${hasAccel} beacon ${hasBeacon} launchers ${launchers.length}`;
	
	let metric = 10 + goodPlanets.length;
	if(!hasAccel) { metric -= 3; }
	if(!hasBeacon) { metric -= 2; }
  if(launchers.length < 2) { metric -= 1; }
	return { metric, print };
}

module.exports = {
	getMetric
};
```
cornerDistance это расстояние от угла карты, а не от домашней системы, horizontalDistance - расстояние от левого или правого края карты.
можно такжев файле searchModel.type.ts (либо через console.log) посмотреть какие еще поля доступны в модели, например engines и home


# Использование
1. Пишем нужные нам условия по оценке файла
2. с помощью программы SRHDDumpReader создаем сейвы, можно запустить создание сейвов на ночь, чтобы сейвов было несколько сотен
3. В коммандной строке, в папке c:\temp\dumpsearch выполняем команду "npm start [path]", где path это путь к сейв-файлам.
4. Скрипт выведет 20 результатов с наибольшей метрикой.


Также скрипт кеширует результат парсинга в json файлах, если нужно подкорректировать условие, повторный поиск выполнится намного быстрее.

# результат работы
выглядит примерно вот так
top 20 results:
save: autodump20211105-101550.txt, metric 12
planets 3 accelerator true beacon true launchers 1
save: autodump20211105-103440.txt, metric 12
planets 4 accelerator true beacon false launchers 2
save: autodump20211105-111214.txt, metric 12
planets 4 accelerator true beacon false launchers 2
save: autodump20211105-074031.txt, metric 11
planets 4 accelerator true beacon false launchers 0
save: autodump20211105-075131.txt, metric 11
planets 4 accelerator true beacon false launchers 0
save: autodump20211105-083902.txt, metric 11
planets 1 accelerator true beacon true launchers 2
save: autodump20211105-095410.txt, metric 11
planets 4 accelerator true beacon false launchers 1
...