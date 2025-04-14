import { v4 as uuidv4 } from 'uuid';

/**
 * 模擬 API：影片上傳 API
 * @param {FormData} formData - 影片的 FormData，需包含一個 key 為 'file' 的 video 檔案
 * @returns {Promise<{ message: string, data: { url: string, id: number, duration: number } }>} - 上傳結果的 Promise，包含影片 URL、唯一 ID 與影片長度（秒）
 */
export function uploadVideo(formData) {
  return new Promise((resolve, reject) => {
    const blobUrl = URL.createObjectURL(formData);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = blobUrl;

    video.onloadedmetadata = () => {
      const duration = video.duration;

      resolve({
        message: 'success',
        data: {
          id: uuidv4(),
          url: blobUrl,
          duration,
        },
      });
    };

    video.onerror = (e) => {
      reject(new Error('Error'));
    };
  });
}

/**
 * 模擬 API：取得影片的逐字稿資料
 *
 * @function getTranscript
 * @param {number} id - 影片的唯一識別碼
 * @returns {Promise<{ message: string, data: TranscriptSection[] }>} - 一個包含訊息與逐字稿資料的 Promise
 *
 * @typedef {Object} TranscriptItem
 * @property {string} id - 逐字稿項目的唯一 ID
 * @property {number} startTime - 該段逐字稿的開始時間（以秒為單位）
 * @property {number} endTime - 該段逐字稿的結束時間（以秒為單位）
 * @property {string} text - 顯示在螢幕上的逐字稿文字內容
 *
 * @typedef {Object} TranscriptSection
 * @property {string} section - 該區塊的標題名稱
 * @property {string} id - 該區塊的唯一 ID
 * @property {TranscriptItem[]} items - 此區塊內的逐字稿項目陣列
 */
export function getTranscript(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        message: 'success',
        data: [
          {
            section: 'Introduction',
            id: uuidv4(),
            items: [
              {
                id: uuidv4(),
                startTime: 0,
                endTime: 2,
                text: 'Welcome to our product demonstration.',
              },
              {
                id: uuidv4(),
                startTime: 5,
                endTime: 8,
                text: 'Today, we’ll be showcasing our latest innovation.',
                isSelected: true
              },
            ],
          },
          {
            section: 'Key Features',
            id: uuidv4(),
            items: [
              {
                id: uuidv4(),
                startTime: 15,
                endTime: 18,
                text: 'Our product has three main features.',
              },
              {
                id: uuidv4(),
                startTime: 20,
                endTime: 23,
                text: 'First, it’s incredibly easy to use.',
              },
              {
                id: uuidv4(),
                startTime: 25,
                endTime: 28,
                text: 'Second, it’s highly efficient.',
              },
              {
                id: uuidv4(),
                startTime: 30,
                endTime: 35,
                text: 'And third, it’s cost-effective.',
              },
            ],
          },
          {
            section: 'Demonstration',
            id: uuidv4(),
            items: [
              {
                id: uuidv4(),
                startTime: 40,
                endTime: 43,
                text: 'Let me show you how it works.',
              },
              {
                id: uuidv4(),
                startTime: 45,
                endTime: 50,
                text: 'Simply press this button to start.',
              },
              {
                id: uuidv4(),
                startTime: 50,
                endTime: 60,
                text: 'The interface is intuitive and user-friendly.',
              },
            ],
          },
          {
            section: 'Conclusion',
            id: uuidv4(),
            items: [
              {
                id: uuidv4(),
                startTime: 60,
                endTime: 65,
                text: 'In conclusion, our product is a game-changer.',
              },
              {
                id: uuidv4(),
                startTime: 65,
                endTime: 70,
                text: 'We’re excited to bring this to market.',
              },
              {
                id: uuidv4(),
                startTime: 70,
                endTime: 75,
                text: 'Thank you for your attention.',
              },
            ],
          },
        ],
      });
    }, 1000);
  });
}
