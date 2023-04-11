import { createFirestoreData } from "./crud.js";

// events fired on the draggable target //
document.addEventListener("drag", (event) => {
  let target_text = window.getSelection().toString();
  /*console.log({target_text});*/
  //localStorage.clear();
  window.localStorage.setItem("targetText", target_text); // 同步的问题 我存到旧的 而不是最新的那一笔资料
  if (target_text.length > 0 && target_text !== "undefined") {
    createFirestoreData(target_text)
      .then(() => {
        console.log("save successful");
      })
      .catch((err) => {
        console.error({ err });
      });
  }

  //   let keys = Object.keys(localStorage);
  //   for (let key of keys) {
  //     var SaveWord = `${key}: ${localStorage.getItem(key)}`;
  //     console.log(`${key}: ${localStorage.getItem(key)}`);
  //     console.log("abcdefg  " + SaveWord + window.localStorage.length);
  //   }

  let video_time = document.getElementById("video1");
  let videotimemin = Math.floor(video_time.currentTime / 60);
  let videotimesc = Math.floor(video_time.currentTime % 60);

  let text2 = document.getElementById("text_english");
  let a = text2.innerHTML;

  let b = text2.innerHTML;

  let c = "<fa id='targetText' style='color: red;'>" + target_text + "</fa>";
  let result = b.replace(b, c);

  var str = b;
  var newstr = str.replace(target_text, c);

  text2.innerHTML = newstr;

  //  Correct
  document.getElementById("dict").innerHTML +=
    "<div class='collocationlist' style='display: flex; padding:10px 10px' >" +
    "<a href='javascript:void(0)' class='go-back-video-timer-btn'>" +
    videotimemin +
    ":" +
    videotimesc +
    "</a>" +
    "<p id='collocationtargetword'>" +
    target_text +
    "</p>" +
    "<button onclick=\"document.getElementById('id01').style.display='block'\" class=\"w3-button w3-black\">" +
    "Edit" +
    "</button>" +
    "</div>" +
    "<br>";
  // Correct
  document.getElementById("modal-create-anott01").innerHTML += "<span class='span-class'>" + "<p>" + target_text + "</p>" + "</span>";

  // Error Think how to make it using function control.
  document.getElementById("modal-create-anott01").innerHTML +=
    '<input className="w3-radio" type="radio" name="proposition" value="male" checked>' +
    "<label>Verb+Adv</label>" +
    '<input className="w3-radio" type="radio" name="proposition" value="female">' +
    "<label>Verb+Verb</label>" +
    '<input className="w3-radio" type="radio" name="proposition" value="">' +
    "<label>Noun+Verb</label>";

  // Correct
  const originText = document.getElementById("text_english");
  document.getElementById("Annotation-originText").innerHTML += originText.textContent;

  /*
   * 完成
   * 问题 1： 每当我create 一个新的target text 我要一个新的 annotation form （modal-create-anott01）
   * 问题 2： 我要post 我的form 里面的 radio button 和两个 input text的 data 去firestore 储存
   * */

  let timer = document.querySelectorAll(".go-back-video-timer-btn");

  for (let i = 0; i < timer.length; i++) {
    timer[i].addEventListener("click", function (e) {
      const goBackVideoTimer = e.target.text;
      //console.log(goBackVideoTimer);
      const splitStr = goBackVideoTimer.split(":");
      const min = parseInt(splitStr[0]); // min = number
      const sec = parseInt(splitStr[1]); // sec = number

      let minutetosec = min * 60;
      let totalsec = parseInt(minutetosec + sec);

      document.getElementById("video1").currentTime = totalsec;
    });
  }
});

/*
    document.addEventListener("dragstart", (event) => {
        // store a ref. on the dragged elem
        dragged = event.target;
        // make it half transparent
        event.target.classList.add("dragging");
    });

    document.addEventListener("dragend", (event) => {
        // reset the transparency
        event.target.classList.remove("dragging");
    });

    /* events fired on the drop targets */
/*   document.addEventListener("dragover", (event) => {
        // prevent default to allow drop
        event.preventDefault();
    }, false);

    document.addEventListener("dragenter", (event) => {
        // highlight potential drop target when the draggable element enters it
        if (event.target.classList.contains("dropzone")) {
            event.target.classList.add("dragover");
        }
    });

    document.addEventListener("dragleave", (event) => {
        // reset background of potential drop target when the draggable element leaves it
        if (event.target.classList.contains("dropzone")) {
            event.target.classList.remove("dragover");
        }
    });

    document.addEventListener("drop", (event) => {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged element to the selected drop target
        if (event.target.classList.contains("dropzone")) {
            event.target.classList.remove("dragover");
            dragged.parentNode.removeChild(dragged);
            event.target.appendChild(dragged);
        }
    });
*/
