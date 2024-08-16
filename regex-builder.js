

let currentGroup = '';

function setCurrentGroup(value){
    currentGroup = value;
    seeCurrentGroup(value)
}
function seeCurrentGroup(valueParam){
    let constructVisible = document.querySelector(".construct");
    constructVisible.innerHTML = valueParam;
}

function addCharType(type) {
  currentGroup += type;
  seeCurrentGroup(currentGroup);
}

function addQuantifier(quantifier) {
  currentGroup += quantifier;
  seeCurrentGroup(currentGroup);
}

function addCustomQuantifier() {
  let customQuantifier = prompt("Entrez votre quantificateur personnalisé (ex: {2,5})");
  if (customQuantifier) {
    currentGroup += `{${customQuantifier}}`;
    seeCurrentGroup(currentGroup);
  }
}

function addRecurrentName(name){
    const groupName = document.querySelector('#groupName');
    if(name != undefined & name != null & name.trim() != ''){
        groupName.value = name;
        seeCurrentGroup(currentGroup);
    }
}


function testRegex() {
    const regexInput = document.getElementById('regex').value;
    const textInput = document.getElementById('text').value;

    if (!regexInput.trim()) {
      document.getElementById('result').textContent = '';
      return;
    }

    try {
      const regex = new RegExp(regexInput, 'g');
      const matches = [...textInput.matchAll(regex)];

      if (matches.length === 0) {
        document.getElementById('result').textContent = 'Aucune correspondance trouvée.';
        return;
      }

      let resultHTML = '';
      matches.forEach((match) => {
        resultHTML += `<div><strong>Correspondance :</strong> ${match[0]}</div>`;

        if (match.groups) {
          for (const [name, value] of Object.entries(match.groups)) {
            resultHTML += `<div class="named-group">Groupe "${name}": ${value}</div>`;
          }
        } else {
          match.forEach((group, index) => {
            if (index === 0) return; 
            resultHTML += `<div class="group">Groupe ${index}: ${group}</div>`;
          });
        }
      });

      document.getElementById('result').innerHTML = resultHTML;

    } catch (e) {
      document.getElementById('result').textContent = `Erreur : ${e.message}`;
    }
  }


function closeGroup() {
    const groupName = document.getElementById('groupName').value;
    if (groupName) {
      const regexInput = document.getElementById('regex');
      regexInput.value += `(?<${groupName}>${currentGroup})`;
      currentGroup = '';
      document.getElementById('groupName').value = '';
      testRegex();
      seeCurrentGroup('')
    } else {
      alert("Veuillez entrer un nom de groupe.");
    }
  }

function closeRegex() {
    const regexInput = document.getElementById('regex');
    regexInput.value += currentGroup;
    currentGroup = '';
    document.getElementById('groupName').value = '';
    seeCurrentGroup('')
    testRegex();
}

document.getElementById('regex').addEventListener('input', testRegex);
document.getElementById('text').addEventListener('input', testRegex);
