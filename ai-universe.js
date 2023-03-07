const aiContainer = document.getElementById("ai-container");
const seeMoreDiv = document.getElementById("seeMore");
const btnAccuracy = document.getElementById("btn-top");
const modalFooter = document.getElementById("modalFooter");
const sortButton = document.getElementById("btn-sortBy");

const loadSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};
sortButton.addEventListener("click", () => {

  aiContainer.textContent = "";
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData1(data.data));
});
const displayData1 = (data) => {
  data.tools.sort(
    (a, b) => new Date(b.published_in) - new Date(a.published_in)
  );
  data.tools.forEach((info) => {
    const aiDiv = document.createElement("div");
    aiDiv.classList.add("col");

    aiDiv.innerHTML = `
            <div class="card h-100">
                    <img src="${info.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h6 class="card-title "><span class="h2">Features</span></h6>
                    <p>      
                    <ol>
                    ${info.features[0] ? `<li>${info.features[0]}</li>` : ``}
                  ${info.features[1] ? `<li>${info.features[1]}</li>` : ``}
                  ${info.features[2] ? `<li>${info.features[2]}</li>` : ``}                  
                  ${info.features[3] ? `<li>${info.features[3]}</li>` : ``}                  
                  </ol>
                      <p class="card-text">${info.description ? info.description : ""
      }</p>
                     <p class="h4">${info.name}</p>
                     <div class="d-flex justify-content-between">
                     <p class=""><i class="fa-solid fa-calendar-days"></i> ${info.published_in
      }</p>
    
    
                     <!-- Button trigger modal -->
                     <button onclick="aiDetails2('${info.id
      }')" type="button" class="border-0 btn btn-danger" data-bs-toggle="modal" data-bs-target="#aiModal">
                     <i class="fa-solid fa-arrow-right"></i>
                     </button>
                     </div>
                    </div>
                  </div>
            `;
    aiContainer.appendChild(aiDiv);
  });
  seeMoreDiv.classList.add("d-none");
};


const loadData = (funcName) => {
  loadSpinner(true);
  const url = `https://openapi.programming-hero.com/api/ai/tools`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => funcName(data.data));

};





const seeMore = () => {
  loadSpinner(true);
  aiContainer.textContent = "";
  seeMoreDiv.textContent = "";
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData2(data.data));
};
const displayData2 = (data) => {
  data.tools.forEach((info) => {
    const aiDiv = document.createElement("div");
    aiDiv.classList.add("col");

    aiDiv.innerHTML = `
            <div class="card h-100">
                    <img src="${info.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h6 class="card-title "><span class="h2">Features</span></h6>
                    <p>      
                    <ol>                
                    ${info.features[0] ? `<li>${info.features[0]}</li>` : ``}
                  ${info.features[1] ? `<li>${info.features[1]}</li>` : ``}
                  ${info.features[2] ? `<li>${info.features[2]}</li>` : ``}
                  ${info.features[3] ? `<li>${info.features[3]}</li>` : ``}
                  </ol>
                      <p class="card-text">${info.description ? info.description : ""
      }</p>
                     <p class="h4">${info.name}</p>
                     <div class="d-flex justify-content-between">
                     <p class=""><i class="fa-solid fa-calendar-days"></i> ${info.published_in
      }</p>
    
    
                     <!-- Button trigger modal -->
                     <button onclick="aiDetails2('${info.id
      }')" type="button" class="border-0 btn btn-danger" data-bs-toggle="modal" data-bs-target="#aiModal">
                     <i class="fa-solid fa-arrow-right"></i>
                     </button>
                     </div>
                    </div>
                  </div>
            `;
    aiContainer.appendChild(aiDiv);
  });
  loadSpinner(false);
};

const displayData = (data) => {

  data.tools = data.tools.slice(0, 6);
  data.tools.forEach((info) => {
    loadSpinner(true);
    const aiDiv = document.createElement("div");
    aiDiv.classList.add("col");
    aiDiv.innerHTML = `
        <div class="card h-100">
                <img src="${info.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h6 class="card-title "><span class="h2">Features</span></h6>
                  <p>      
                  <ol>                 
                  ${info.features[0] ? `<li>${info.features[0]}</li>` : ``}
                  ${info.features[1] ? `<li>${info.features[1]}</li>` : ``}
                  ${info.features[2] ? `<li>${info.features[2]}</li>` : ``}
                  ${info.features[3] ? `<li>${info.features[3]}</li>` : ``}
                 
                  
                </ol>
                </p>
                  <p class="card-text">${info.description ? info.description : ""
      }</p>
                 <p class="h4">${info.name}</p>
                 <div class="d-flex justify-content-between">
                 <p class=""><i class="fa-solid fa-calendar-days"></i> ${info.published_in
      }</p>


                 <!-- Button trigger modal -->
                 <button onclick="aiDetails2('${info.id
      }')" type="button" class="border-0 btn btn-danger " data-bs-toggle="modal" data-bs-target="#aiModal">
                 <i class="fa-solid fa-arrow-right"></i>
                 </button>
                 </div>
                </div>
              </div>
        `;
    aiContainer.appendChild(aiDiv);
  });
  loadSpinner(false);
};

const aiDetails2 = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    displayAiDetails(data.data);
  } catch (error) {
    console.log(error);
  }
};

const displayAiDetails = (data) => {
  const modalContainer = document.getElementById("aiModalBody");
  modalContainer.innerHTML = "";
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("d-lg-flex", "gap-3", "row-gap-3");
  modalFooter.innerHTML = `
  ${data.accuracy.score === null ?
      ``
      :
      `<button id="btn-top" class="btn btn-danger">${data.accuracy.score * 100
      }% accuracy</button>`
    }
  `;
  console.log(data);
  modalDiv.innerHTML = `
        <div class="h-100 w-100">
                <div class="border border-danger p-2 bg-warning-subtle rounded">
                <p>${data.description}</p>

                <div class="d-flex gap-2 ">
                <div class="bg-danger-subtle p-2 rounded">
                <p>
                ${data.pricing === null ? "Free of Cost" : data?.pricing[0]?.price
    } Basic</p >
                </div >
                <div class="bg-danger-subtle p-2 rounded">
                <p>
                ${data.pricing === null ? "Free of Cost" : data?.pricing[1]?.price
    } Pro</p >
              
                </p>
                </div>
                <div class="bg-danger-subtle p-2 rounded">
                <p>
                ${data.pricing === null ? "Free of Cost" : data?.pricing[2]?.price
    }
    Enterprice
                </p>
                </div>
                </div >

  <div class="d-flex justify-content-between gap-2">
    <div>
      <h6>Features</h6>
      
      ${data.features[1]?.feature_name ? `<li>${data.features[1]?.feature_name}</li>` : ``}
      ${data.features[2]?.feature_name ? `<li>${data.features[2]?.feature_name}</li>` : ``}
      ${data.features[3]?.feature_name ? `<li>${data.features[3]?.feature_name}</li>` : ``}
      ${data.features[4]?.feature_name ? `<li>${data.features[4]?.feature_name}</li>` : ``}
                 
    </div>
    <div>
      <h6>Integrations</h6>  
      <li>${((data.integrations === null) || (!data?.integrations[0])) ? "data not Found" : data?.integrations[0]}</li>
      
      <li>${((data.integrations === null) || (!data?.integrations[1])) ? "data not Found" : data?.integrations[1]}</li>
      <li>${((data.integrations === null) || (!data?.integrations[2])) ? "data not Found" : data?.integrations[2]}</li>
    </div>
  </div>

                </div >
              </div >
  <div class="card h-100 p-2 pt-5 pt-lg-2">
    <img class="img-fluid" src="${data.image_link[0] ? data.image_link[0] : "image not found"
    }" class="card-img-top" alt="...">
      ${data.input_output_examples === null ?
      ` <div class="card-body">
                  <p>can you give any example</p>
                  <p>not!yet take a break</p>
                  </div>
                  ` :
      `<div class="card-body">
        <p>${data?.input_output_examples[0]?.input}</p>
        <p class="card-text">
          ${data?.input_output_examples[0]?.output}
        </p>
      </div>`
    }


  </div>
`;
  modalContainer.appendChild(modalDiv);
};
const modalTop = () => {


}

loadData(displayData);
