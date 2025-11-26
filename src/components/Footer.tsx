// import { fetchSetting } from "@/lib/nezha-api"
// import { useQuery } from "@tanstack/react-query"
import React from "react"
import { useTranslation } from "react-i18next"

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent)

  // const { data: settingData } = useQuery({
  //   queryKey: ["setting"],
  //   queryFn: () => fetchSetting(),
  //   refetchOnMount: true,
  //   refetchOnWindowFocus: true,
  // })

  return (
    <footer className="mx-auto w-full max-w-5xl px-4 lg:px-0 pb-4 server-footer">
      <section className="flex flex-col">
	<section className="mt-1 flex items-center sm:flex-row flex-col justify-between gap-2 text-[13px] font-light tracking-tight text-neutral-600/50 dark:text-neutral-300/50 server-footer-name">
  {/* 版权信息 */}
  <div className="flex flex-col gap-1">
    <p>© 2025 - 2025 Komari Monitor Dashboard</p>
	<p>Powered by <a href={"https://github.com/komari-monitor/komari"} target="_blank" className="hover:underline">Komari</a></p>
    {/* 自定义内容区域 */}
    <div className="mt-2 pt-2 border-t border-neutral-600/20 dark:border-neutral-300/20">
      <p className="text-xs text-neutral-500/80 dark:text-neutral-400/80">
        {/* 在这里添加你的自定义内容 */}
        {/* 例如：服务器状态监控 | 数据更新时间：{new Date().toLocaleString()} */}
      </p>
    </div>
  </div>
          </section>   
      </section>      
    </footer>        
  )                 
}                     
  
  <div className="server-footer-theme flex flex-col items-center sm:items-end">
    <p className="mt-1 text-[13px] font-light tracking-tight text-neutral-600/50 dark:text-neutral-300/50">
      <kbd className="pointer-events-none mx-1 inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        {isMac ? <span className="text-xs">⌘</span> : "Ctrl "}K
      </kbd>
    </p>
  </div>
</section>

export default Footer
