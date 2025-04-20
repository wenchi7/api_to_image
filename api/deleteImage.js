import express from 'express'
import cloudinary from 'cloudinary'
import cors from 'cors'

const router = express.Router()

// 启用 CORS
router.use(cors())

cloudinary.config({
  cloud_name: 'dvzkvj8cs',
  api_key: '955368792789983',
  api_secret: 'JATRnGqZEErfAqf96U0WMI2lXAg',
})

// 测试路由
router.get('/test', (req, res) => {
  res.json({ message: 'Cloudinary 删除服务正在运行' })
})

router.delete('/images/:publicId', async (req, res) => {
  const { publicId } = req.params
  console.log('收到刪除請求，publicId:', publicId)

  if (!publicId) {
    console.error('缺少 publicId')
    return res.status(400).json({ message: '缺少 publicId 參數' })
  }

  try {
    // 先檢查圖片是否存在
    console.log('正在檢查圖片是否存在...')
    const result = await cloudinary.api.resource(publicId)
    console.log('圖片存在:', result)

    // 使用 Cloudinary 的 destroy 方法刪除圖片
    console.log('正在刪除圖片...')
    const deleteResult = await cloudinary.uploader.destroy(publicId)
    console.log('刪除結果:', deleteResult)

    res.status(200).json({
      message: '圖片已刪除',
      result: deleteResult,
    })
  } catch (error) {
    console.error('Cloudinary 操作錯誤:', {
      message: error.message,
      code: error.code,
      http_code: error.http_code,
      publicId: publicId,
      stack: error.stack,
    })

    if (error.http_code === 404) {
      res.status(404).json({
        message: '找不到指定的圖片',
        error: error.message,
      })
    } else {
      res.status(500).json({
        message: '伺服器錯誤',
        error: error.message,
        details: error.stack,
      })
    }
  }
})

export default router
