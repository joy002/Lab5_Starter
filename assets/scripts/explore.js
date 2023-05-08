// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  //all of the available voices that you can use for your SpeechSynthesizer should be loaded 
  //and populate the “Select Voice” dropdown when page load, each browser might be different.
  const voiceSelect = document.querySelector("#voice-select");
  let voices = [];
  function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    for(let i = 0; i<voices.length; i++){
      //creating different options
      const option = document.createElement("option");
      option.textContent = voices[i].name;
      option.value = voices[i].name;
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      //adding them on the dropdown list
      voiceSelect.appendChild(option);
    }
  }
  populateVoiceList();  //Need to populate the voice first or it will not work!
  speechSynthesis.addEventListener("voiceschanged", populateVoiceList);

  //When you click the “Press to Talk” button
  const talk = document.getElementsByTagName("button")[0];
  //The text that you have typed into the “Text to speak here” textarea should be spoken 
  //using the voice that you have selected
  talk.addEventListener("click", function() {
    const inputText = document.getElementById("text-to-speak").value;

    const sayThis = new SpeechSynthesisUtterance(inputText);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        sayThis.voice = voices[i];
      }
    }
    speechSynthesis.speak(sayThis);
    //Only while the synthesizer is speaking, the face should swap to being open mouthed
    const faceImg = document.getElementsByTagName("img")[0];
    faceImg.src = "assets/images/smiling-open.png";

    // change the image back when it's the 'end' event of the SpeechSynthesisUtterance object 
    sayThis.addEventListener("end", function() {
      faceImg.src = "assets/images/smiling.png";
    });
  });
}