import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

interface HitokotoData {
  id: number
  hitokoto: string
  from: string
  from_who: string | null
  type: string
}

interface TranslationData {
  translatedText: string
}

export function Hitokoto() {
  const { i18n, t } = useTranslation()
  const [data, setData] = useState<HitokotoData | null>(null)
  const [translatedData, setTranslatedData] = useState<TranslationData | null>(null)
  const [loading, setLoading] = useState(true)

  // 翻译一言内容
  const translateHitokoto = async (text: string, targetLang: string) => {
    try {
      // 使用免费的翻译API - 这里使用MyMemory翻译服务
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=zh|${targetLang}`
      )
      const result = await response.json()
      return result.responseData?.translatedText || text
    } catch (error) {
      console.error('翻译失败:', error)
      return text // 返回原文
    }
  }

  useEffect(() => {
    const fetchHitokoto = async () => {
      setLoading(true)
      try {
        // 根据当前语言选择API参数
        const isEnglish = i18n.language === 'en-US'
        const apiParam = isEnglish ? '?c=e&encode=json' : '?c=k&c=i&c=d&encode=json'
        
        const response = await fetch(`https://v1.hitokoto.cn${apiParam}`)
        const hitokotoData: HitokotoData = await response.json()
        
        // 如果是中文且当前语言是英文，需要翻译
        if (!isEnglish && i18n.language === 'en-US') {
          // 如果是一言API返回的是中文，需要翻译为英文
          const translatedText = await translateHitokoto(hitokotoData.hitokoto, 'en')
          setTranslatedData({ translatedText })
        }
        
        setData(hitokotoData)
      } catch (err) {
        console.error('一言加载失败:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHitokoto()
  }, [i18n.language])

  if (loading) {
    return (
      <div className="mt-3 animate-pulse">
        <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
      </div>
    )
  }

  if (!data) return null

  const currentLanguage = i18n.language
  const isEnglish = currentLanguage === 'en-US'
  
  // 获取显示内容
  const displayText = isEnglish && translatedData 
    ? translatedData.translatedText 
    : data.hitokoto
  
  const displayFrom = isEnglish && data.from 
    ? (data.from_who ? `${data.from} · ${data.from_who}` : data.from)
    : `${data.from}${data.from_who ? ` · ${data.from_who}` : ''}`

  return (
    <div className="mt-3 text-center">
      <p className="text-sm font-medium text-foreground/80 leading-relaxed">
        「{displayText}」
      </p>
      <p className="text-xs text-muted-foreground mt-1.5 opacity-70">
        —— {displayFrom}
      </p>
    </div>
  )
}