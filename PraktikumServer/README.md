# *Workers Management*

# ניהול עובדים

## תיאור הפרויקט

מערכת לניהול עובדים.


## ישויות
 - עובד
 - תפקיד
 - מנהל

## מיפוי Routes לעובד
 

 - שליפת רשימת הספרים- GET [https://localhost:7170/api/Worker
 - שליפת gucs לפי מזהה- GET
   [https://localhost:7170/api/Worker](https://library.co.il/Worker)/1
 - הוספת עובד-  POST [https://localhost:7170/api/Worker](https://api/Worker%20) 
 - עדכון עובד- PUT [https://localhost:7170/api/Worker/1](https://api/Worker/1)
 - עדכון סטטוס עובד  PUT [https://localhost:7170/api/Worker/1](https://api/Worker/1)/status
 
## מיפוי Routes לתפקיד

 - שליפת רשימת התפקידים- GET [https://localhost:7170/api/Role](https://api/) 
 - הוספת תפקיד- POST [https://localhost:7170/api/Members](https://api/Role) 
 - מחיקת תפקיד- DELETE [https://localhost:7170/api/Member/1](https://api/Role/1)

## מיפוי Routes למנהל

 -  שליפת רשימת המנהלים- GET https://localhost:7170/api/Manager
 - שליפת השאלה לפי מזהה- GET
   [https://localhost:7170/api/Manager](https://api/Manager%20) /1
 - הוספת השאלה-  POST [https://localhost:7170/api/Manager](https://api/%20Manager%20)
