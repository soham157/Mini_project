// Student Mini Project: ID Card Generator
function generateCard(event) {
  event.preventDefault();

  document.getElementById('card-name').innerText = document.getElementById('in-name').value;
  document.getElementById('card-id').innerText = document.getElementById('in-id').value;
  document.getElementById('card-enroll').innerText = document.getElementById('in-enroll').value;
  document.getElementById('card-dept').innerText = document.getElementById('in-dept').value;
  document.getElementById('card-course').innerText = document.getElementById('in-course').value;
  document.getElementById('card-blood').innerText = document.getElementById('in-blood').value;
  document.getElementById('card-phone').innerText = document.getElementById('in-phone').value;

  alert("ID Card updated successfully! Click Print / Save PDF to export.");
}

function previewPhoto(event) {
  var file = event.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = document.getElementById('card-photo');
      img.src = e.target.result;
      img.style.display = "block";
      document.getElementById('photo-alt').style.display = "none";
    };
    reader.readAsDataURL(file);
  }
}

function printCard() {
  window.print();
}
