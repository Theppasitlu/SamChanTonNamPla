// Import the functions you need from the SDKs you need
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
          apiKey: "AIzaSyB12sMrvrt3zfmbmeoLrnhxkYt6vtriCE8",
          authDomain: "ararkodai.firebaseapp.com",
          projectId: "ararkodai",
          storageBucket: "ararkodai.appspot.com",
          messagingSenderId: "235827349277",
          appId: "1:235827349277:web:91f35ebb4a2f667ce543f4",
          measurementId: "G-SHZZM5KTB6"
        };  
      firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore();
      let form = document.querySelector("#CreateRoomAdd");

function WriteDB(UserData, ID){
  UserData.reduce(function (Prev,Cur){
      Prev = Cur;
      if (Prev.UserName == form.UserNameEdit.value){
          if(form.AddOrEdit.value == "Edit"){
              let TimeIndex = Prev.Time.indexOf(form.TimeEditIndex.value);
              Prev.Time[TimeIndex] = form.TimeEdit.value;
          } else if (form.AddOrEdit.value == "Add") {
              Prev.Time.push(form.TimeEdit.value);
          }            
      } else{
      }
      db.collection("RoomPlan").doc(ID).update({
          "UserData": firebase.firestore.FieldValue.arrayUnion(Prev),
      }); 
      // return Prev;
  }, {});
  renderUser(change.doc);
  form.TimeEdit.value = "";
}

function renderUser(doc){
  let li = document.createElement("li");

  let RoomNameVar = document.createElement("span");
  let RoomPasswordVar = document.createElement("span");
  let RoomStartVar = document.createElement("span");
  let RoomCloseVar = document.createElement("span");
  let GuestVoteVar = document.createElement("span");
  let UserNameVar = document.createElement("span");
  let UserTimeVar = document.createElement("span");
  let NameTimeVar = document.createElement("span");
  let edit = document.createElement("div")
  let del = document.createElement("div")

  // let NameTimeDataValue = doc.data().UserData.reduce((Prev, Cur) => ({...Prev,
  //     [Cur.UserName]: Object.assign(Prev[Cur.Time] || {}, Cur) 
  //     }),{}); //ชื่อ : map ทั้งหมด
  // console.log(NameTimeDataValue);
  // let TimeVal = doc.data().UserData.reduce((Time, Cur) => ({
  //     ...Time,
  //     [Cur.Vote]: (Time[Cur.Vote] || []).concat(Cur)
  // }), {});    //หาเวลาโวหดตรงกัน
  // let NameTimeValue = doc.data().UserData.reduce((Prev, Cur) => ({
  //     ...Prev, 
  //     [Cur.UserName]: (Prev[RoomStartVar] || []).concat(Cur.Time) 
  //     }), {});    //ชื่อ : เวลา

  let TimeValue = doc.data().UserData.reduce((Prev, Cur) => [Cur.Time + "\r\n"].concat(Prev), []);    //เวลาทุกคน
  let RawName = doc.data().UserData.reduce(function (Prev,Cur){
    Prev = Cur;
    console.log(Prev.UserName);
    let ABC = document.createElement("span");
    li.appendChild(ABC);
    Availablelist.appendChild(li);
    return Prev.UserName;
}, {});    //เวลาทุกคน

  let UserDataVar = doc.data().UserData;
  const Array1 = [{ UserID: "Nugget", UserName: "Yellow", Time:["20191025_10:30","20191025_11:30","20191026_09:30","20191026_12:30"], Vote: "0,1,2" }];
  const Array2 = [{ UserID: "Steak", UserName: "Red", Time:["20191025_10:30","20191025_11:30","20191026_09:30","20191026_12:30"], Vote: "0,3,5" }];
  const DataUser = { UserID: "Pie", UserName: "Pink", Time:["20191025_10:30","20191025_11:30","20191026_09:30","20191026_12:30"], Vote: "0,3,5" };

  edit.className = "edit";
  del.className = "del";
  
  li.setAttribute("data-id", doc.id);
  RoomNameVar.textContent = doc.data().RoomName;
  RoomPasswordVar.textContent = doc.data().RoomPassword;
  RoomStartVar.textContent = doc.data().RoomStart;
  RoomCloseVar.textContent = doc.data().RoomClose;
  GuestVoteVar.textContent = doc.data().GuestVote;
  UserNameVar.textContent = RawName;
  UserTimeVar.innerText = TimeValue;
  
  edit.textContent = "Edit";
  del.textContent = "Del";

  // li.appendChild(RoomNameVar);
  // li.appendChild(RoomPasswordVar);
  // li.appendChild(RoomStartVar);
  // li.appendChild(RoomCloseVar);
  // li.appendChild(GuestVoteVar);
  li.appendChild(UserNameVar);
  // li.appendChild(UserTimeVar);
  // li.appendChild(NameTimeVar);
  // li.appendChild(edit);
  // li.appendChild(del);

  console.log(RawName)


  del.addEventListener("click", (e) => {
      let id = e.target.parentElement.getAttribute("data-id");
      db.collection("RoomPlan").doc(id).update({
          "UserData": firebase.firestore.FieldValue.arrayUnion(DataUser),
      });
  });
  edit.addEventListener("click", (e) => {
      let id = e.target.parentElement.getAttribute("data-id");
      db.collection("RoomPlan").doc(id).update({
          "UserData": firebase.firestore.FieldValue.delete(),
      });
      WriteDB(UserDataVar, id)
  });
}
// db.collection("RoomPlan").orderBy("RoomName")
//     .onSnapshot(function(snapshot) {
//         snapshot.docChanges().forEach(function(change) {
//             if (change.type === "added") {
//                 // console.log("New city: ", change.doc.data());
//                 renderUser(change.doc);

//             } if (change.type === "modified") {
//                 console.log("Modified city: ", change.doc.data());
//                 let li = userlist.querySelector(`[data-id=${change.doc.id}]`);
//                 userlist.removeChild(li);
//                 renderUser(change.doc);
//             } else if (change.type === "removed"){
//                 let li = userlist.querySelector(`[data-id=${change.doc.id}]`);
//                 userlist.removeChild(li);
//             }
//         });
//     });
db.collection("RoomPlan").doc("OHklkKTiqSsRzwmS93Jv").onSnapshot({
  includeMetadataChanges: true
    }, (doc) => {
      renderUser(doc);
});

// db.collection("RoomPlan").doc("OHklkKTiqSsRzwmS93Jv").onSnapshot(snapshot => {
//   let changes = snapshot.docChanges();
//   changes.forEach(change => {
//     if(change.type == "added"){
//       renderUser(change.doc);
//     } else if (change.type == "removed"){
//       let li = userlist.querySelector(`[data-id=${change.doc.id}]`);
//       userlist.removeChild(li);
//     }
//   })
// });

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: 'UTC',
      themeSystem: 'bootstrap',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      select: function(info) {
        alert('selected ' + info.startStr + ' to ' + info.endStr);
      },
      selectable: true,
      selectMirror: true,
      unselectAuto: true,
      weekNumbers: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: "https://fullcalendar.io/demo-events.json"
    });
  
    calendar.render();
  });
