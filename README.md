# 可以新增、修改、刪除、查詢課資料和訂單資料的網頁

# 專案結構
主頁: fetchh/src/pages/Interface.jsx <br>
搜尋區塊: fetchh/src/components/Search.jsx <br>
展示區塊: fetchh/src/components/Show.jsx <br>
新增資料的頁面: fetchh/src/components/Create.jsx<br>
修改資料的頁面: fetchh/src/components/Edit.jsx (修改客戶資料) fetchh/src/components/EditOrd.jsx (修改訂單資料) <br>
<br>
- 主頁的部分由 fetchh/src/components/Show.jsx(顯示查找資料結果的地方) 和 fetchh/src/components/Search.jsx(使用者輸入查找條件的地方)構成，呈現的是客戶資料和訂單資料，有切換頁面按鈕可以進行切換，讓使用者查看不同的資料。
- 搜尋區塊(Search.jsx)有新增按鈕，點擊後會進入新增資料頁面，新增資料的頁面有取消按鈕可以回到主頁
- 呈現在主頁上的資料是由Show.jsx呈現的，介面上的每筆資料都有修改和刪除的按鈕，點擊修改按鈕可以進入修改該資料的頁面進行資料修改，進入修改頁面後，點擊取消按鈕可以回到主頁。

# 主頁
![image](https://github.com/rolling-shrimp/project2/blob/master/88.png)

# 新增資料的頁面
![image](https://github.com/rolling-shrimp/project2/blob/master/784.png)

# 修改資料的頁面
![image]( https://github.com/rolling-shrimp/project2/blob/master/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2%202023-10-02%20154937.png)

此專案使用React撰寫，以下是該網頁的功能設計介紹:

# 使用者輸入框設計
- 使用 React 和 useContext 技術設計了用戶輸入框的標題和分頁切換。
 - 使用長輩組件 (App.js) 定義一個標題陣列，包含使用者將看到的輸入框標題（例如：姓名、國家等）。
 - 使用 React Hook createContext 和 useContext，在需要設置輸入欄位的組件 (Search.jsx, Create.jsx) 中傳遞該標題陣列。

# 動態頁面切換
- 在不同的 Route 中，傳遞不同的特定字串，以在兒孫組件 (Search.jsx, Interface.jsx, Show.jsx) 中設計不同的頁面。
- 使用這些特定字串來判斷目前處於哪個 Route，以呈現相應的內容，隱藏不屬於當前 Route 的內容。

# useMemo 的使用
- 使用 useMemo 儲存修改過的標題陣列，以提高性能並確保一致性。
- 在一些特殊情況下（例如：Create.jsx、Edit.jsx、EditOrd.jsx），需要在標題陣列中刪除 UID 和 ID，原因是UID和ID是有順序性的資料，通常交給後端mysql資料庫自行幫忙排序是比較有效率且不會出錯的選擇，因此在新增方面，使用者不用去記順序新增資料就好，在修改方面，不能讓使用者擅自修改順序，否則會造成錯亂。
# useEffect 和 useCallback

- 使用 useEffect 和 useCallback 設計用戶剛進入頁面時的資料呈現。
- 第一次渲染時，向後端發送一次請求以獲取資料。
- 這兩個 React Hooks 確保發送請求函式保持原始身份並在必要時觸發。

# useState 和 onChange 屬性

- 在搜尋、新增和修改功能中使用 useState 和 onChange 屬性，以將輸入的內容存儲為物件，並使用 Axios 將其發送到後端。
- 當請求完成後，清空輸入框中的值。

# 使用state lifting概念
- 使用 state lifting 概念將後端返回的資料傳遞到不同的組件，以實現即時呈現和刪除後的更新。

# 後端處理根據多個欄位搜尋條件執行模糊查詢的程序
- 針對傳到後端的查詢條件物件使用for in loop判斷物件裡面的屬性是否含有值，如果有的話，把屬性名稱納入my sql查詢語句，把屬性對應的值存進一個空陣列，執行完for in loop之後會出現一個mysql 的查詢字串，和代表查詢字串當中的?　的陣列，陣列和字串會以參數的形式被帶入與mysql資料庫進行互動的函式。





