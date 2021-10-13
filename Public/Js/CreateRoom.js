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

form.addEventListener("submit", (e) => {
    e.preventDefault();
    db.collection("ห้อง").add({
        RoomName    : form.RoomNameAdd.value,
        RoomPassword: form.RoomPasswordAdd.value,
        RoomStart   : form.RoomStartAdd.value,
        RoomClose   : form.RoomCloseAdd.value,
        GuestVote   : form.GuestVoteAdd.value,
        UserData    : [{ food: "Pizza", color: "Blue", Vote: "0,1,2" },
                        {food: "Pizza", color: "Blue", Vote: [1,2,4]}],
    })
    
    form.RoomNameAdd.value = "";
    form.RoomPasswordAdd.value = "";
});
