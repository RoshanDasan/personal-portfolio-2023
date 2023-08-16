const handleSubmit = (e) => {
  e.preventDefault();
  console.log("submitted");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;
  let flag = 0;

  if (name.length == 0 || /^\S*$/.test(name) == false) {
    document.getElementById("nameError").innerHTML = "Please Enter Valid Name";
    flag = 1;
  }
  if (
    email.length == 0 ||
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email) == false
  ) {
    document.getElementById("emailError").innerHTML =
      "Please Enter Valid Email";
    flag = 1;
  }
  if (subject.length == 0 || /^\S*$/.test(subject) == false) {
    document.getElementById("subjectError").innerHTML =
      "Please Enter Valid Subject";
    flag = 1;
  }

  if (flag == 0) {
    const errorSpans = document.querySelectorAll(
      "#nameError, #emailError, #subjectError"
    );
    errorSpans.forEach((span) => {
      span.innerHTML = "";
    });


    fetch("http://localhost:5000/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the response is JSON
      })
      .then((data) => {
        console.log(data); // This will log the response data
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }
};
