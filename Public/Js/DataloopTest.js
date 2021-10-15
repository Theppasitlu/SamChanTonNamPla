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
        // firebase.analytic();

        // Initialize Firebase
        // const app = initializeApp(firebaseConfig);
        // const analytics = getAnalytics(app);
        const db = firebase.firestore();

        let form = document.querySelector("#CreateRoomAdd");


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

    // let TimeVal = doc.data().UserData.reduce((Time, Cur) => ({
    //     ...Time,
    //     [Cur.Vote]: (Time[Cur.Vote] || []).concat(Cur)
    // }), {});    //หาเวลาตรงกัน

    let TimeValue = doc.data().UserData.reduce((Prev, Cur) => [Cur.Time + "\r\n"].concat(Prev), []);    //เวลาทุกคน
    // let NameTimeValue = doc.data().UserData.reduce((Prev, Cur) => ({
    //     ...Prev, 
    //     [Cur.UserName]: (Prev[RoomStartVar] || []).concat(Cur.Time) 
    //     }), {});    //ชื่อ : เวลา

    let DataUser = doc.data().UserData;

    console.log(DataUser);
    
    edit.className = "edit";
    del.className = "del";
    

    li.setAttribute("data-id", doc.id);
    RoomNameVar.textContent = doc.data().RoomName;
    RoomPasswordVar.textContent = doc.data().RoomPassword;
    RoomStartVar.textContent = doc.data().RoomStart;
    RoomCloseVar.textContent = doc.data().RoomClose;
    GuestVoteVar.textContent = doc.data().GuestVote;
    UserTimeVar.innerText = TimeValue;

    
    edit.textContent = "Edit";
    del.textContent = "Del";

    li.appendChild(RoomNameVar);
    li.appendChild(RoomPasswordVar);
    li.appendChild(RoomStartVar);
    li.appendChild(RoomCloseVar);
    li.appendChild(GuestVoteVar);
    li.appendChild(UserNameVar);
    li.appendChild(UserTimeVar);
    li.appendChild(NameTimeVar);
    li.appendChild(edit);
    li.appendChild(del);

    userlist.appendChild(li);

    del.addEventListener("click", (e) => {
        let id = e.target.parentElement.getAttribute("data-id");
        db.collection("RoomPlan").doc(id).update({
            "UserData": firebase.firestore.FieldValue.delete(),
            
        });
        
    });
    edit.addEventListener("click", (e) => {
        let id = e.target.parentElement.getAttribute("data-id");
        db.collection("RoomPlan").doc(id).update({
            "UserData": firebase.firestore.FieldValue.delete(),
            
        });
        db.collection("RoomPlan").doc(id).update({
            "UserData": firebase.firestore.FieldValue.arrayUnion(DataUser + { UserID: "Steak", UserName: "Red", Time:["20191025_10:30","20191025_11:30","20191026_09:30","20191026_12:30"], Vote: "0,3,5" }),
            
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    db.collection("RoomPlan").add({
        RoomName    : form.RoomNameAdd.value,
        RoomPassword: form.RoomPasswordAdd.value,
        RoomStart   : form.RoomStartAdd.value,
        RoomClose   : form.RoomCloseAdd.value,
        GuestVote   : form.GuestVoteAdd.value,
        UserData    : [{ UserID: "Pizza", UserName: "Blue", Time:["20191025_10:30","20191025_11:30","20191026_09:30","20191026_12:30"], Vote: "0,1,2" },
                        {UserID: "Cake", UserName: "Green", Time:["20191025_10:30","20191025_11:30","20191026_09:30","20191026_12:30"], Vote: "0,1,2"}],
        
    })
    
    form.RoomNameAdd.value = "";
    form.RoomPasswordAdd.value = "";
});

// form.addEventListener("edit", (e) => {
//     e.preventDefault();
//     db.collection("ห้อง").update({
//         RoomName    : form.RoomNameAdd.value,
//         RoomPassword: form.RoomPasswordAdd.value,
//         RoomStart   : form.RoomStartAdd.value,
//         RoomClose   : form.RoomCloseAdd.value,
//         GuestVote   : form.GuestVoteAdd.value,
        
//     })
    
//     form.RoomNameAdd.value = "";
//     form.RoomPasswordAdd.value = "";
// });

//real-time
// db.collection("ห้อง").where("RoomName", "==", "--" ).orderBy("RoomName")
db.collection("RoomPlan").orderBy("RoomName")
    .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                // console.log("New city: ", change.doc.data());
                renderUser(change.doc);

            } if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
                let li = userlist.querySelector(`[data-id=${change.doc.id}]`);
                userlist.removeChild(li);
                renderUser(change.doc);
            } else if (change.type === "removed"){
                let li = userlist.querySelector(`[data-id=${change.doc.id}]`);
                userlist.removeChild(li);
            }
        });
    });
