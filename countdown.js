const inputWaktu = document.querySelector("#waktu input"),
  pesanH1 = document.querySelector("#cn > h1"),
  btnMulai = document.querySelector("#btn-mulai"),
  [jamSet, menitSet, detikSet] = document.querySelectorAll(
    "#countdown  .col-md-3"
  ),
  [pesan, btnFile, srcFile] = document.querySelector("#konteks").children,
  containerBtnSet = document.querySelector("#set-countdown"),
  audio = document.createElement("audio"),
  btnStop = document.createElement("div"),
  containerMain = document.querySelector("#main"),
  textSelesai = document.createElement("p"),
  body = document.querySelector("body"),
  countdown = document.querySelector("#countdown");

textSelesai.classList = "text-break";
textSelesai.innerHTML = "Selesai";
audio.loop = true;
audio.src = "/Police Siren.mp3";

btnStop.classList = "rounded-circle";

btnStop.innerHTML = ` <svg
                          width="5em"
                          height="5em"
                          viewBox="0 0 16 16"
                          class="bi bi-stop-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          >
                          <path
                            d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"
                          />
                      </svg>`;

btnFile.onclick = () => {
  srcFile.click();
  srcFile.addEventListener("change", (e) => {
    if (srcFile.value != "") {
      btnFile.textContent = srcFile.value.split(/(\\|\/)/g).pop();
      audio.src = URL.createObjectURL(e.target.files[0]);
    }
  });
};

const timeComplex = (j = 0, m = 0, d = 0) => j * 3600 + m * 60 + d * 1 - 1,
  timeCek = (i) => (i < 10 ? "0" + i : i);
setTimeInput = (j = "00", m = "00", d = "00") => {
  jamSet.textContent = j;
  menitSet.textContent = m;
  detikSet.textContent = d;
};

let intervalCountDown,
  statSelesai = false;

function mulaiCountDown() {}

btnMulai.onclick = () => {
  if (
    inputWaktu.value != "00:00" &&
    inputWaktu.value != "00:00:00" &&
    inputWaktu.value != ""
  ) {
    countdown.classList.remove("d-none");
    containerMain.classList.add("d-none");
    containerBtnSet.replaceChild(btnStop, btnMulai);

    let [j, m, d] = inputWaktu.value.match(/(\d+)/g),
      timeNow = timeComplex(j, m, d);

    setTimeInput(j, m, d);

    intervalCountDown = setInterval(() => {
      jn = Math.floor(timeNow / 3600);
      mn = Math.floor((timeNow % 3600) / 60);
      dn = Math.floor((timeNow % 3600) % 60);

      setTimeInput(timeCek(jn), timeCek(mn), timeCek(dn));
      if (timeNow <= 0) {
        clearInterval(intervalCountDown);

        pesanH1.innerHTML =
          pesan.value != "" ? pesan.value : pesanH1.textContent;
        body.style.animation = " 300ms white-dark infinite";
        btnStop.style.animation = "300ms dark-white infinite";
        cn.replaceChild(textSelesai, countdown);
        audio.play();

        statSelesai = true;
      }
      timeNow--;
    }, 1000);
  }
};

btnStop.onclick = () => {
  audio.pause();
  audio.currentTime = 0;
  inputWaktu.value = "00:00:00";
  countdown.classList.add("d-none");
  containerMain.classList.remove("d-none");
  clearInterval(intervalCountDown);
  containerBtnSet.replaceChild(btnMulai, btnStop);
  if (statSelesai) {
    cn.replaceChild(countdown, textSelesai);
    body.style.removeProperty("animation");
    btnStop.style.removeProperty("animation");
  }
};
