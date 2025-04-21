// import express from 'express'
// import cloudinary from 'cloudinary'
// import cors from 'cors'

// const router = express.Router()

// // 启用 CORS
// router.use(cors({
//   origin: 'https://your-frontend-domain.com', // 替換成你的前端應用的域名
//   methods: ['GET', 'POST', 'DELETE'],  // 可以根據需要限制允許的方法
// }));

// cloudinary.config({
//   cloud_name:  import.meta.env.VUE_APP_CLOUDINARY_CLOUD_NAME,
//   api_key: import.meta.env.VUE_APP_CLOUDINARY_API_KEY,
//   api_secret: import.meta.env.VUE_APP_CLOUDINARY_API_SECRET,
// })

// // 测试路由
// router.get('/test', (req, res) => {
//   res.json({ message: 'Cloudinary 删除服务正在运行' })
// })

// router.delete('/images/:publicId', async (req, res) => {
//   const { publicId } = req.params
//   console.log('收到刪除請求，publicId:', publicId)

//   if (!publicId) {
//     console.error('缺少 publicId')
//     return res.status(400).json({ message: '缺少 publicId 參數' })
//   }

//   try {
//     // 先檢查圖片是否存在
//     console.log('正在檢查圖片是否存在...')
//     const result = await cloudinary.api.resource(publicId)
//     console.log('圖片存在:', result)

//     // 使用 Cloudinary 的 destroy 方法刪除圖片
//     console.log('正在刪除圖片...')
//     const deleteResult = await cloudinary.uploader.destroy(publicId)
//     console.log('刪除結果:', deleteResult)

//     res.status(200).json({
//       message: '圖片已刪除',
//       result: deleteResult,
//     })
//   } catch (error) {
//     console.error('Cloudinary 操作錯誤:', {
//       message: error.message,
//       code: error.code,
//       http_code: error.http_code,
//       publicId: publicId,
//       stack: error.stack,
//     })

//     if (error.http_code === 404) {
//       res.status(404).json({
//         message: '找不到指定的圖片',
//         error: error.message,
//       })
//     } else {
//       res.status(500).json({
//         message: '伺服器錯誤',
//         error: error.message,
//         details: error.stack,
//       })
//     }
//   }
// })

// export default router
import cloudinary from 'cloudinary'
const { publicId, api_key } req.query

if (!api_key || api_key !== process.env.CLOUDINARY_API_KEY) {
  return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
}
// Cloudinary 設定（請改用 process.env）
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: api_key,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default async function handler(req, res) {
  // 處理預檢請求
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // 處理 DELETE 請求
  if (req.method === 'DELETE') {
    const { publicId } = req.query

    if (!publicId) {
      return res.status(400).json({ message: '缺少 publicId' })
    }

    try {
      const result = await cloudinary.uploader.destroy(publicId)
      return res.status(200).json({ message: '圖片已刪除', result })
    } catch (error) {
      console.error('Cloudinary 刪除錯誤:', error)
      return res.status(500).json({ message: '伺服器錯誤', error: error.message })
    }
  }

  // 不支援的方法
  res.setHeader('Allow', ['DELETE', 'OPTIONS'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
