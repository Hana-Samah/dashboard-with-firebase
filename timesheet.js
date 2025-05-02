import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    serverTimestamp
  } from "firebase/firestore";
  import { db } from "./firebase.js";
  
  // تحميل بيانات timesheets الخاصة بالمستخدم
  async function loadTimesheets() {
    const userId = localStorage.getItem("loggedInUserId");
    if (!userId) return;
  
    const timesheetList = document.getElementById("timesheetList");
    timesheetList.innerHTML = "";
  
    const q = query(collection(db, "timesheets"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const li = document.createElement("li");
      li.textContent = `Date: ${data.date}, Task: ${data.task}, In: ${data.checkInTime}, Out: ${data.checkOutTime}`;
      timesheetList.appendChild(li);
    });
  }
  
  // حفظ timesheet جديد
  async function saveTimesheet() {
    const userId = localStorage.getItem("loggedInUserId");
    if (!userId) return alert("User not logged in!");
  
    const date = document.getElementById("date").value;
    const checkInTime = document.getElementById("checkInTime").value;
    const checkOutTime = document.getElementById("checkOutTime").value;
    const task = document.getElementById("task").value;
    const workplace = document.getElementById("workplace").value;
  
    try {
      await addDoc(collection(db, "timesheets"), {
        userId,
        date,
        checkInTime,
        checkOutTime,
        task,
        workplace,
        createdAt: serverTimestamp(),
      });
  
      alert("Timesheet saved successfully.");
      loadTimesheets(); // Reload after saving
    } catch (error) {
      console.error("Error saving timesheet:", error);
      alert("Failed to save timesheet.");
    }
  }
  
  // ربط الزر بعملية الحفظ
  document.getElementById("saveTimesheet").addEventListener("click", saveTimesheet);
  
  // تحميل البيانات عند بداية الصفحة
  window.addEventListener("load", loadTimesheets);

  import {
    query,
    where,
    getDocs
  } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
  
  // مثال: طباعة البيانات في الكونسول
  async function fetchUserTimesheets() {
    const userId = localStorage.getItem("loggedInUserId");
    const q = query(collection(db, "timesheets"), where("userId", "==", userId));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      // يمكنك عرضها على الصفحة هنا
    });
  }
  
  