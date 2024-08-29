const getProjects = () => {
  $.get('/api/projects', (response) => {
    console.log("API Response:", response);
      if (response.statusCode == 200) {
          addCards(response.data);
      }
  });
}

function addCards(items) {
  console.log("Items to Add:", items); 
  items.forEach(item => {
      let card = `<div class="col s4">
                      <div class="card">
                          <div class="card-image">
                              <img src="${item.image}">
                              <span class="card-title">${item.title}</span>
                          </div>
                          <div class="card-content">
                              <p>${item.description}</p>
                          </div>
                          <div class="card-action">
                              <a href="#">${item.link}</a>
                          </div>
                      </div>
                  </div>`;
      $('#card-section').append(card);  
  });
}


$(document).ready(function() {
  getProjects(); 
});

