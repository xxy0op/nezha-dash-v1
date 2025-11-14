import { useEffect, useState } from "react"

interface HitokotoData {
  id: number
  hitokoto: string
  from: string
  from_who: string | null
  type: string
}

export function Hitokoto() {
  const [data, setData] = useState<HitokotoData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://v1.hitokoto.cn/?c=k&c=d&c=i&encode=json')
      .then(response => response.json())
      .then((data: HitokotoData) => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('一言加载失败:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="mt-3 animate-pulse">
        <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="mt-3 text-center">
      <p className="text-sm font-medium text-foreground/80 leading-relaxed">
        「{data.hitokoto}」
      </p>
      <p className="text-xs text-muted-foreground mt-1.5 opacity-70">
        —— {data.from}{data.from_who && ` · ${data.from_who}`}
      </p>
    </div>
  )
}