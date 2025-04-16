# video-highlight-tool

### 技術使用
Vue3：框架

Pinia：全域資料傳遞

uuid：製作唯獨 id

### 程式結構
分成 Transcript 與 Preview，並再細分 TranscriptItem、Upload、SeekBar、ActionBar 等元件出來做處理

方便各元件各司其職

### API
分成兩隻是希望提高 Api 的覆用性

### 部屬
使用 netlify 做快速部屬
[video-highlight-tool
](https://video-highlight-tool.netlify.app/)

### 使用
建議使用一分鐘的影片
因為 Api 回傳 transcripts 的資料是固定的