// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  //when select the horn
  //display correct images
  //set correct audio sound file
  const choose = document.getElementById("horn-select");
  const correspondingImg = document.getElementsByTagName("img")[0];
  const audioFile = document.querySelector(".hidden");

  choose.addEventListener("change", function() {
    switch(choose.value) {
      case "air-horn":
        correspondingImg.src = "assets/images/air-horn.svg";
        audioFile.src = "assets/audio/air-horn.mp3";
        break;
      case "car-horn":
        correspondingImg.src = "assets/images/car-horn.svg";
        audioFile.src = "assets/audio/car-horn.mp3";
        break;
      case "party-horn":
        correspondingImg.src = "assets/images/party-horn.svg";
        audioFile.src = "assets/audio/party-horn.mp3";
        break;
      default:
        correspondingImg.src = "assets/images/no-image.png"
        audioFile.src = "";
    }
  });

  //when change the value on the slider
  //set correct volume icon
  const slider = document.getElementById("volume");
  const volumnImg = document.getElementsByTagName("img")[1];
  slider.addEventListener('change', function() {
    //display the mute icon (level 0) at 0 volume
    if (slider.value == 0) {
      volumnImg.src = "assets/icons/volume-level-0.svg";
      volumnImg.alt = "Volume level 0";
    }
    //display the first volume level(from 1 to < 33 volume)
    else if (1 < slider.value && slider.value <= 33) {
      volumnImg.src = "assets/icons/volume-level-1.svg";
      volumnImg.alt = "Volume level 1";
    }
    //display the second volume level(rom 33 to < 67 volume)
    else if (33 < slider.value && slider.value <= 66) {
      volumnImg.src = "assets/icons/volume-level-2.svg";
      volumnImg.alt = "Volume level 2";
    }
    //display third volume level(from 67 and up)
    else if (66 < slider.value && slider.value <= 100) {
      volumnImg.src = "assets/icons/volume-level-3.svg";
      volumnImg.alt = "Volume level 3";
    }
  });

  //When click the “Play Sound” button
  const playSound = document.getElementsByTagName("button")[0];
  //Initialize confetti
  const jsConfetti = new JSConfetti();
  playSound.addEventListener("click", function() {
    let audio = new Audio(audioFile.getAttribute("src"));
    //set the corresponding volume for the audio element(volume <= 100)
    //the corresponding sound for the horn selected should play at the specified volume
    audio.volume = slider.value/100;
    audio.play();
    //If Party Horn is selected, shoot out confetti as shown in the video.
    if(choose.value == "party-horn"){
      jsConfetti.addConfetti();
    }
  });
}