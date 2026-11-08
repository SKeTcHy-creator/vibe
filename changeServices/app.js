const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;

function buildReport(services, guideChecked, audioChecked, catalogChecked) {

  const selected = services.filter((service) =>{
    if (service.id === "guide") return guideChecked;
    if (service.id === "audio") return audioChecked;
    if (service.id === "catalog") return catalogChecked;
    return false;
  }).map(({ title, price }) => ({ title: title.trim(), price }));

  const total = selected.reduce((sum, item) => sum + item.price, 0);

  return {
    count: selected.length,
    total: total,
    items: selected
  }
}

let data = null;

try {
  if (sourceJson === "") {
    throw new Error(`Пустая строка передоваемого объекта`);
  }
  data = JSON.parse(sourceJson);
} catch (e) {
  data = null;
}

const title = document.querySelector("#event-title");
const date = document.querySelector("#event-date");
const place = document.querySelector("#event-place");
const description = document.querySelector("#event-description");
const form = document.querySelector("#service-form");
const showProgramBtn = document.querySelector("#show-program");
const program = document.querySelector("#program");
const guide = document.querySelector("#guide");
const audio = document.querySelector("#audio");
const catalog = document.querySelector("#catalog");
const choiceError = document.querySelector("#choice-error");
const dataError = document.querySelector("#data-error");
const result = document.querySelector("#result");
const reportJson = document.querySelector("#report-json");

if(!data){
  dataError.hidden = false;
} else {
  showProgramBtn.addEventListener("click", () =>{
    title.innerHTML = data.event.title;
    date.innerHTML = `Дата и время: ${data.event.date}`;
    place.innerHTML = `Место: ${data.event.place}`;
    description.innerHTML = `Описание: ${data.event.description}`;
    program.innerHTML = data.event.meeting;
    program.hidden = false;
  })

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const guideChecked = guide.checked;
    const audioChecked = audio.checked;
    const catalogChecked = catalog.checked;

    if(!guideChecked && !audioChecked && !catalogChecked){
      choiceError.hidden = false;
      result.hidden = true;
      reportJson.hidden = true;
      return;
    }

    choiceError.hidden = true;

    const report = buildReport(
      data.services,
      guideChecked,
      audioChecked,
      catalogChecked
    );

    const stringJson = JSON.stringify(report);
    JSON.parse(stringJson);

    let html = 'Выбрано услуг: ' + report.count + '<br>';
    html += 'Итого: ' + report.total + ' руб.';
    report.items.forEach((item) => {
      html += '<br>';
      html += '<br>' + item.title;
    });

    result.innerHTML = html;
    result.hidden = false;

    reportJson.textContent = stringJson;
    reportJson.hidden = false;
  })
}



