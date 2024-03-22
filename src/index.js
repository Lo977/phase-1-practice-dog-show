document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("table-body");
  const form = document.getElementById("dog-form");

  fetch("http://localhost:3000/dogs")
    .then((res) => res.json())
    .then((dogsData) => {
      dogsData.forEach((dog) => {
        // console.log(dogsData);
        renderDogs(dog);
      });
    });

  function renderDogs(dog) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button id="${dog.id}">Edit Dog</button></td>`;
    tableBody.appendChild(tr);
    tr.querySelector("button").addEventListener("click", (e) => {
      //   console.log(e);
      let id = e.target.id;
      form.name.value = dog.name;
      form.breed.value = dog.breed;
      form.sex.value = dog.sex;
      patchDog(id);
    });
  }
  function patchDog(dogId) {
    form.addEventListener("submit", (e) => {
      //   e.preventDefault();
      // console.log(e);
      const dogObj = {
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value,
      };
      fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogObj),
      });
      form.reset();
    });
  }
});
