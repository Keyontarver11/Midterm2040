window.onload = function() {
  const studentsContainer = document.getElementById("displaystudents");
  const firstname = document.getElementById("first_name");
  const lastname = document.getElementById("last_name");
  const emaill = document.getElementById("email");
  const genderr = document.getElementById("gender");
  const ipaddress = document.getElementById("ip_address");
  const addButton = document.getElementById("addstudent");
  const buttonDisplayAll = document.getElementById("displayall");

  // EVENT LISTENERS
  addButton.onkeydown = function(e) {
    if (e.keyCode === 13) {
      addStudent();
    }
  };
  addButton.onclick = function(e) {
    addStudent();
  };
  buttonDisplayAll.onkeydown = function(e) {
    if (e.keyCode === 13) {
      displayAll();
    }
  };
  buttonDisplayAll.onclick = function(e) {
    displayAll();
  };

    function displayAll() {
    fetch("/get-students")
      .then(response => response.json())
      .then(response => {
        console.log(response);

        response.forEach(student => {
          document.getElementById('display-students').innerHTML += 
          '<div id="studentflex"><div class= "studentdisplay"> '+student.id+' '+student.first_name+' '+student.last_name+' '+student.email+' '+student.gender+' </div></div>'
        });
      });
    }

  function createStudents(student) {
    let container = document.createElement("div");
    container.id = student.id;
    container.classList.add("student");
    
    
    

    fetch("/update-studentinfo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        id: student.id,
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        gender: gender.value,
        ipaddress: ip_address.value
      })
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
      })
      .catch(error => console.error(error));

    //DELETE STUDENT
    let text = document.createElement("div");
    text.innerHTML = student.text;

    let btn = document.createElement("button");
    btn.id = "btn-" + student.id;
    btn.innerHTML = "X";
    btn.onclick = function(e) {
      console.log("deleting " + student.id);

      fetch("/delete", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          id: student.id
        })
      })
        .then(response => response.json())
        .then(response => {
          // console.log(response);
          if (response.affectedRows) {
            container.remove();
          }
        })
        .catch(error => console.error(error));
    };

    container.appendChild(text);
    studentflex.appendChild(btn);
    let samplecontainer =document.getElementById("display-students")
    samplecontainer.appendChild(container);
  }

  function addStudent() {
    console.log("add student");
    if (
      (firstname.value,
      lastname.value,
      emaill.value,
      genderr.value,
      ipaddress.value)
    ) {
      fetch("/add-studentinfo", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          first_name: firstname.value,
          last_name: lastname.value,
          email: emaill.value,
          gender: genderr.value,
          ipaddress: ipaddress.value
        })
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          if (response.affectedRows) {
            createStudents({
              id: response.insertId,
              first_name: firstname.value,
              last_name: lastname.value,
              email: emaill.value,
              gender: genderr.value,
              ipaddress: ipaddress.value
            });
            (firstname.value = ""),
              (lastname.value = ""),
              (emaill.value = ""),
              (genderr.value = ""),
              (ipaddress.value = "");
          } else {
            alert("Could not create");
          }
        })
        .catch(error => console.error(error));
    } else {
      alert("You can not create a todo without text");
    }
  }
};
    