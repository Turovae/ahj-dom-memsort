export default class Table {
  constructor(container, data) {
    this.container = document.querySelector(`.${container}`);
    this.data = data;
    this.tbody = null;
    this.thead = null;

    this.draw();
  }

  draw() {
    const table = document.createElement('table');
    this.container.appendChild(table);
    table.classList.add('table');

    this.thead = document.createElement('thead');
    table.appendChild(this.thead);

    const headRow = document.createElement('tr');
    this.thead.appendChild(headRow);

    headRow.innerHTML = `
      <th data-type="id">id</th>
      <th data-type="title">title</th>
      <th data-type="year">year</th>
      <th data-type="imdb">imdb</th>
    `;

    this.tbody = document.createElement('tbody');
    table.appendChild(this.tbody);

    for (let i = 0; i < this.data.length; i += 1) {
      const row = document.createElement('tr');
      this.tbody.appendChild(row);
      const dataRow = this.data[i];
      ['id', 'title', 'year', 'imdb'].forEach((column) => {
        row.dataset[column] = dataRow[column];
      });
      row.innerHTML = `
        <td>${dataRow.id}</td>
        <td>${dataRow.title}</td>
        <td>(${dataRow.year})</td>
        <td>imdb: ${dataRow.imdb.toFixed(2)}</td>
      `;
    }
  }

  sort(type, direction) {
    [...this.thead.querySelectorAll('th')].forEach((elem) => {
      elem.classList.remove('sort-down');
      elem.classList.remove('sort-up');
    });
    const rows = Array.from(this.tbody.children);
    rows.sort((rowA, rowB) => {
      if (Number.isNaN(+rowA.dataset[type])) {
        return rowA.dataset[type] > rowB.dataset[type] ? 1 : -1;
      }
      return rowA.dataset[type] - rowB.dataset[type];
    });
    switch (direction) {
      case 'down':
        this.tbody.append(...rows);
        this.thead.querySelector(`[data-type=${type}]`).classList.add('sort-down');
        break;
      case 'up':
        this.tbody.append(...rows.reverse());
        this.thead.querySelector(`[data-type=${type}]`).classList.add('sort-up');
        break;
      default:
    }
  }
}
