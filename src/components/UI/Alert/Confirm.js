
function Confirm(dialog){
        let winW = window.innerWidth;
        let winH = window.innerHeight;
        let dialogoverlay = document.getElementById('dialogoverlay2');
        let dialogbox = document.getElementById('dialogbox2');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (550 * .5) + "px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxbody2').innerHTML = dialog;
      
      function ok() {
        document.getElementById('dialogbox2').style.display = "none";
        document.getElementById('dialogoverlay2').style.display = "none";
      }
}

export default Confirm;