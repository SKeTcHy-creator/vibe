// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}



function selectAttempts(filter) {

  const attempts = window.reportData.attempts;
  if(filter === 'passed'){
    return attempts.filter(attempt => attempt.passed === true)
  }
  if(filter === 'failed'){
    return attempts.filter(attempt => attempt.passed === false)
  }
  return attempts
}


function renderAttempts(attempts) {
  let html = ''
  attempts.forEach(attempt => {
    const name = escapeHtml(attempt.name)
    html += `<li>${name} — ${attempt.score} из 6 (${attempt.percentage}%)</li>`
  })
  return html
}

function startFilter() {
  const filterForm = document.querySelector('#filter-form')
  const filter = document.querySelector('#filter')
  const resultCount = document.querySelector('#result-count')
  const resultList = document.querySelector('#result-list')

  filterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const attempts = selectAttempts(filter.value)

    resultCount.innerHTML = `Показано: ${attempts.length} из ${window.reportData.attempts.length}`
    resultList.innerHTML = renderAttempts(attempts)
  })
}

startFilter()
