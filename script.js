const activeMembers = {
  'Se Rah': '37484292',
  'Krystal Paige': '37484253',
  'Agnar Aroxalana': '38024136',
  'Beag Anseo': '38229208',
  'Erasmus Jones': '38030259',
  'Jebei Phaezen': '39353857',
  'Skye Lark': '38047214'
}

let fcData = {};

function loadData() {
  let promises = Object.keys(activeMembers).map(name => {
    let id = activeMembers[name];
    let url = `https://xivapi.com/character/${id}?data=MIMO`;
    return fetch(url).then(rsp=>rsp.json());
  });
  Promise.all(promises).then(responses => {
    let data = responses.map(rsp => {
      let minions = rsp.Minions.map(minion=>minion.Name);
      let mounts = rsp.Mounts.map(mount=>mount.Name);
      return [rsp.Character.Name, {'minions': minions, 'mounts': mounts}];
    });
    return Object.fromEntries(data);
  }).then(data => {
    fcData = data;
    document.querySelector('h1').style = 'display: none;';
    document.querySelector('#mounts').onclick = checkMounts;
    document.querySelector('#minions').onclick = checkMinions;
    document.querySelector('#checker').style = 'display: block;';
  });
}

function checkData(dataKey) {
  let item = document.querySelector('#item').value;
  let data = Object.keys(fcData).map(name => {
    let value = fcData[name][dataKey].includes(item) ? "✔" : "❌"
    return [name, value];
  });
  let output = document.querySelector('#output');
  output.textContent = '';
  let rows = data.forEach(d => {
    let row = document.createElement('tr');
    let nameCell = document.createElement('td');
    let valueCell = document.createElement('td');
    nameCell.textContent = d[0];
    valueCell.textContent = d[1];
    row.appendChild(nameCell);
    row.appendChild(valueCell);

    output.appendChild(row);
  });
}

function checkMounts() {
  checkData('mounts');
}

function checkMinions() {
  checkData('minions');
}

window.onload = loadData;
