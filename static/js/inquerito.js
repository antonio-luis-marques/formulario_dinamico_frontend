const totalPerguntas = document.querySelectorAll('.pergunta').length;
document.querySelector('.total_perguntas').value = totalPerguntas;
console.log(totalPerguntas);

function updateQuestionLabels() {
  const questions = document.querySelectorAll('.pergunta');
  questions.forEach((question, index) => {
    const label = question.querySelector('label[for^=pergunta]');
    if (label) {
      label.textContent = `Pergunta ${index + 1}`;
    }
    const input = question.querySelector('input[type=text]');
    if (input) {
      input.name = `pergunta${index}`;
      input.id = `pergunta${index}`;
    }
    const select = question.querySelector('select.type-question');
    if (select) {
      select.name = `type-question${index}`;
      select.id = `type-question${index}`;
    }
    const containerMultichoise = question.querySelector('.container-multichoise');
    if (containerMultichoise) {
       containerMultichoise.name = `type-question${index}`;
      const selectElem = containerMultichoise.querySelector('select.elemt-number');
      if (selectElem) {
        selectElem.name = `elemt-number${index}`;
        selectElem.id = `elemt-number${index}`;
      }

//      const file = document.querySelector('image');
//      if(file){
//        file.forEach((nameInput, i) => {
//          file.name = `name${index}-${i}`;
//        });
//      }
      const namesContainer = containerMultichoise.querySelector('.names-container');
      if (namesContainer) {
        const nameInputs = namesContainer.querySelectorAll('input');
        nameInputs.forEach((nameInput, i) => {
          nameInput.name = `name${index}${i}`;
          nameInput.id = `name${index}${i}`;
        });
      }
    }
  });
}

function typeQuestion(typeQuestionV){
  contentText = ['escolha multipla','texto'];
  for(let i = 0; i < 2; i++){
    const option = document.createElement('option');
    option.value = contentText[i];
    option.textContent = contentText[i];
    typeQuestionV.appendChild(option);
  }
}

function getSelectedTypeQuestion(getSelectedTypeQuestionV,containerMultichoise,textarea){
    contentText = ['escolha multipla','texto'];
        if(getSelectedTypeQuestionV.value === contentText[1]){
            if(!containerMultichoise.classList.contains("d-none")){
                containerMultichoise.classList.add("d-none");
            }
            textarea.classList.remove("d-none");
        }else{
            if(getSelectedTypeQuestionV.value === contentText[0]){
                if(!textarea.classList.contains("d-none")){
                    textarea.classList.add("d-none");
                }
                containerMultichoise.classList.remove("d-none");
            }
        }
}
function addOptionToSelect(selectElement) {
  for (let i = 2; i <= 10; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectElement.appendChild(option);
  }
}

function addNameInputs(namesContainer, numNames, k) {
  namesContainer.innerHTML = '';
  for (let i = 1; i <= numNames; i++) {
    labelOption = document.createElement('label');
      labelOption.setAttribute('for', `name${i}`);
      labelOption.classList.add('form-label');
      labelOption.innerText = `Opcao ${i}`;

      const inputGroup = document.createElement('div');
      inputGroup.classList.add('d-flex', 'input-group', 'w-100', 'align-items-center');
//      inputGroup.setAttribute('id', `labelName${k}${i}`);

      const span = document.createElement('span');
      span.classList.add('input-group-text', 'me-2', 'span-image', 'rounded-circle', 'd-flex', 'align-items-center', 'justify-content-center');
      span.setAttribute('style', 'height: 40px; width: 40px; position: relative');

      const icon = document.createElement('i');
      icon.classList.add('fa-solid', 'fa-image');

      const file = document.createElement('input');
      file.setAttribute('type', 'file');
      file.classList.add('form-control', 'image');
      file.setAttribute('name', `file${k}${i}`);
      file.setAttribute('style', 'height: 100%; width: 100%; position: absolute; opacity: 0');
      file.setAttribute('accept', '.jpg, .png');
      file.addEventListener('change', function() {
        const reader = new FileReader();
        reader.onload = function(event) {
          const image = new Image();
          image.src = event.target.result;
          image.setAttribute('style', 'height: 40px; width: 40px; position: absolute;');
          image.classList.add('rounded-circle','border','border-info');
          span.appendChild(image);
        }
        reader.readAsDataURL(this.files[0]);
      });


      const inputOption = document.createElement('input');
      inputOption.setAttribute('type', 'text');
      inputOption.classList.add('form-control','me-2');
      inputOption.setAttribute('name', `name${k}${i}`);
      inputOption.setAttribute('id', `name${k}${i}`);
      inputOption.setAttribute('placeholder', `Opcao ${i}`);


      span.appendChild(icon);
      span.appendChild(file);
      inputGroup.appendChild(span);
      inputGroup.appendChild(inputOption);

      const error = document.createElement('div');
      error.classList.add('error');

      const inputControl = document.createElement('div');
      inputControl.classList.add('input-control', 'w-100');
      inputControl.appendChild(labelOption);
      inputControl.appendChild(inputGroup);
      inputControl.appendChild(error);

      namesContainer.appendChild(inputControl);
  }
}

function addNewQuestion(contadorPerguntas) {
  var novaPergunta = document.createElement("div");
  novaPergunta.className = "pergunta form-group border rounded p-2 mt-2";

  var label = document.createElement("label");
  label.className = "fw-bold";
  label.setAttribute("for", "pergunta" + contadorPerguntas);
  label.innerText = "Pergunta " + (contadorPerguntas + 1) + " ";

  var typeQuestionV = document.createElement("select");
  typeQuestionV.className = "form-select w-50 mt-2 mb-2 type-question";
  typeQuestionV.setAttribute("name", "type_question" + contadorPerguntas);
  typeQuestion(typeQuestionV);

  var input = document.createElement("input");
  input.type = "text";
  input.className = "form-control";
  input.setAttribute("name", "pergunta" + contadorPerguntas);
  input.setAttribute("id", "pergunta" + contadorPerguntas);
  input.setAttribute('placeholder', 'questao');
  input.required = true;

  var elemtNames = document.createElement("div");
  elemtNames.className = "input-control w-100 mb-2 container-multichoise d-none";
  var elemtNumber = document.createElement("select");
  elemtNumber.className = 'form-select w-50 elemt-number';
  elemtNumber.setAttribute("name", "type_question" + contadorPerguntas);
  addOptionToSelect(elemtNumber);
  var namesContainer = document.createElement("div");
  namesContainer.className = "names-container input-control w-100";
  addNameInputs(namesContainer, elemtNumber.value, contadorPerguntas);
  var textarea = document.createElement("textarea");
  textarea.className = "form-control text-answer d-none";
  textarea.setAttribute('placeholder', 'caixa de resposta');
  textarea.setAttribute('disabled', '');

  elemtNames.appendChild(elemtNumber);
  elemtNames.appendChild(namesContainer);


  var botaoRemover = document.createElement("button");
  botaoRemover.type = "button";
  botaoRemover.className = "remover-pergunta btn btn-danger mt-2";
  var trash = document.createElement("i");
  trash.className = 'fa-regular fa-trash-can';
  botaoRemover.appendChild(trash);


  novaPergunta.appendChild(label);
  novaPergunta.appendChild(input);
  novaPergunta.appendChild(typeQuestionV);
  novaPergunta.appendChild(elemtNames);
  novaPergunta.appendChild(textarea);
  novaPergunta.appendChild(botaoRemover);

  document.getElementById("perguntas-container").appendChild(novaPergunta);

  // Adiciona os listeners de evento para os novos elementos
  elemtNumber.addEventListener('change', function() {
    addNameInputs(namesContainer, elemtNumber.value, contadorPerguntas);
  });
  typeQuestionV.addEventListener('change', function() {
    getSelectedTypeQuestion(typeQuestionV);
  });
  getSelectedTypeQuestion(typeQuestionV,elemtNames,textarea);
  typeQuestionV.addEventListener('change', function() {
    getSelectedTypeQuestion(typeQuestionV,elemtNames,textarea);
  });

  const totalPerguntas = document.querySelectorAll('.pergunta').length;
  document.querySelector('.total_perguntas').value = totalPerguntas;
  console.log(totalPerguntas);
}

document.addEventListener("DOMContentLoaded", function() {
  // Inicializa o contador de perguntas
  var contadorPerguntas = 1;

  // Adiciona uma nova pergunta ao clicar no botão "Adicionar Pergunta"
  document.getElementById("adicionar-pergunta").addEventListener("click", function() {
    addNewQuestion(contadorPerguntas);
    contadorPerguntas++;
  });

  // Adiciona os listeners de evento para os elementos originais
  const selectElement = document.querySelectorAll('.elemt-number');
  const namesContainer = document.querySelectorAll('.names-container');
  const typeQuestionV = document.querySelectorAll('.type-question');
  const textarea = document.querySelectorAll('.text-answer');
  const containerMultichoise = document.querySelectorAll('.container-multichoise');

  for (let j = 0; j < typeQuestionV.length; j++) {
       typeQuestion(typeQuestionV[j]);
  }
  for (let j = 0; j < typeQuestionV.length; j++) {
       typeQuestionV[j].addEventListener('change', function() {
       getSelectedTypeQuestion(typeQuestionV[j],containerMultichoise[j],textarea[j]);
    });
    getSelectedTypeQuestion(typeQuestionV[j],containerMultichoise[j],textarea[j]);
  }
  for (let j = 0; j < selectElement.length; j++) {
       addOptionToSelect(selectElement[j]);
  }

  for (let j = 0; j < selectElement.length; j++) {
       selectElement[j].addEventListener('change', function() {
      addNameInputs(namesContainer[j], selectElement[j].value, j);
    });
  }
  for (let j = 0; j < selectElement.length; j++) {
      addNameInputs(namesContainer[j], selectElement[j].value, j);
  }

  // Remove uma pergunta ao clicar no botão "-"
  var container = document.querySelector(".remover-pergunta.btn.btn-danger.mt-2");

  container.addEventListener("click", function(event) {
      event.target.parentNode.remove();
      contadorPerguntas--;
      updateQuestionLabels();
  });
  


});