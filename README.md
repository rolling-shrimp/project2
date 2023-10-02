# 可以新增、修改、刪除、查詢課資料和訂單資料的網頁

# 專案結構
主頁: fetchh/src/pages/Interface.jsx <br>
搜尋區塊: fetchh/src/components/Search.jsx <br>
展示區塊: fetchh/src/components/Show.jsx <br>
新增資料的頁面: fetchh/src/components/Create.jsx<br>
修改資料的頁面: fetchh/src/components/Edit.jsx (修改客戶資料) fetchh/src/components/EditOrd.jsx (修改訂單資料) <br>
主頁的部分由 fetchh/src/components/Show.jsx(顯示查找資料結果的地方) 和 fetchh/src/components/Search.jsx(使用者輸入查找條件的地方)構成，呈現的是客戶資料和訂單資料，有切換頁面按鈕可以進行切換，讓使用者查看不同的資料。<br>
搜尋區塊(Search.jsx)有新增按鈕，點擊後會進入新增資料頁面，新增資料的頁面有取消按鈕可以回到主頁<br>
呈現在主頁上的資料是由Show.jsx呈現的，介面上的每筆資料都有修改和刪除的按鈕，點擊修改按鈕可以進入修改該資料的頁面進行資料修改，進入修改頁面後，點擊取消按鈕可以回到主頁。

此專案使用React撰寫，以下是該網頁的功能設計介紹:
# 使用useContext設計使用者輸入框的標題，和分頁轉換
從長輩組件(App.js)定義一個陣列，裡面存放著使用者會看到的輸入框標題字串(姓名，國家...等)，透過creatContext和useContext這兩個React hook把該標題陣列，傳到會需要設置輸入欄位的組件(Search.jsx, Create.jsx)後，使用陣列的方式(.map() )呈現。既可以直接數據共享，從長輩組件拿取陣列，不需要透過多層組件傳遞，也可以以陣列的方式呈現，不需要一個一個設置欄位。<br>
<br>
除了傳遞標題陣列，也在不一樣Route的兒孫組件(Search.jsx, Interface.jsx, Show.jsx)傳遞了不一樣的特定字串，在不一樣的Route設計兒孫組件的時候可以套過傳來的特定字串判斷目前在哪個Route而呈現屬於這個Route的內容，隱藏不屬於這個Route的內容，會設計一個連結來進行頁面切換，達成只使用一個組件設計多個類似頁面的效果。<br>

# 使用useMemo儲存修改過的標題陣列
由於不是每個標題陣列裡面的元素都會被用到，在一些有特殊需求(Create.jsx, Edit.jsx, EditOrd.jsx)的狀況下，必須要刪除標題陣列中的UID和ID，原因是UID和ID是有順序性的資料，通常交給後端mysql資料庫自行幫忙排序是比較有效率且不會出錯的選擇，因此在新增方面，使用者不用去記順序新增資料就好，在修改方面，不能
讓使用者擅自修改順序，否則會造成錯亂。<br>
由於有重新渲染的問題，每次重新渲染，在組件內定義的變數任何東西會是新的身份，useMemo是用來儲存經過處理後的結果，並且確保重新渲染後還是同一個變數，而不是重新定義的，畢竟重新定義是一個多餘的流程，這不是一個好的做法，useMemo可以確保每次重新渲染以後，製造輸入框標題的陣列都是同一個陣列。

# 使用useEffect, useCallback設計使用者剛進入頁面時會看到的資料呈現
由於我決定讓使用者進入頁面(Interface.jsx)時可以先看到全部的資料呈現，不是只有搜尋條件的資料，因此需要在頁面第一次生成時，進行一次向後端發送拿取資料請求並且呈現在前端的流程，只進行一次，否則一直重複請求會產生問題，造成不必要的流程，為了達成只發送一次請求，需要確保兩件事情，<br>
第一，發送請求的函式要保持原來的身份，不能因為重新渲染又被重新定義一次，useEffect會無法識別，造成重複發送請求產生問題，useCallback可以保留發送請求函式的身份。<br>
第二，要確保只有在第一次渲染後才會觸發一次發送請求的函式，useEffect的第二個參數設置成空的陣列可以確保，只有在第一次渲染完成後才會發送請求。

# 使用useState和onChange屬性把搜尋、新增、修改的內容存成一個物件搭配axios傳送到後端
在搜尋、新增、修改的區塊都有 useState和onChange在做配合，先透過useState設一個空的物件為初始值，當使用者輸入時，onChange的函式會開始執行修改空物件，輸入框input的屬性name會成為該物件的key名稱，value屬性會成為key對應到的value，當使用者輸入完成後，修改後的物件可以成為axios發送請求函式的第二個參數，被傳到後端為後端環境所用，當發送請求後，會重新透過useState把修改後的物件轉回空物件，清空輸入框裡面的值。

# 使用state lifting概念把從後端拿取資料的結果傳到長輩組件進行不同的用途
使用者剛進入頁面(Interface.jsx)的時候，看到頁面上所呈現的全部資料，這些資料是透過兒孫組件(Show.jsx)呈現的，由於刪除呈現在介面上的資料後，需要再發送請求重新查找，重新查找的程序會在長輩組件進行，因此才使用state lifting的方式，先在父親組件透過useState定義變數，把此變數傳到兒孫組件(Show.jsx)來儲存從後端查找的結果，既可以在兒孫組件呈現，也能在長輩組件做其他的用途。<br>
在刪除資料後，長輩組件可以把刪除後重新查找的結果存入傳給兒孫組件(Show.jsx)的變數，讓兒孫組件跟著改變，達成刪除後，使用者可以看到呈現資料的變化。

# 後端處理根據多個欄位搜尋條件執行模糊查詢的程序
針對傳到後端的查詢條件物件使用for in loop判斷物件裡面的屬性是否含有值，如果有的話，把屬性名稱納入my sql查詢語句，把屬性對應的值存進一個空陣列，執行完for in loop之後會出現一個mysql 的查詢字串，和代表查詢字串當中的?　的陣列，陣列和字串會以參數的形式被帶入與mysql資料庫進行互動的函式。





