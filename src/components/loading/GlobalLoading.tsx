import React from "react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

// 脉冲点动画组件
const PulseDots = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="w-3 h-3 rounded-full bg-primary animate-pulse"
          style={{
            animationDelay: `${index * 0.15}s`,
            animationDuration: "0.8s",
          }}
        />
      ))}
    </div>
  )
}

// 渐变圆形加载动画
const GradientCircle = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative w-16 h-16", className)}>
      <div className="absolute inset-0 rounded-full border-4 border-muted-foreground/20" />
      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      <div className="absolute inset-2 rounded-full border-4 border-muted-foreground/10 animate-pulse" />
    </div>
  )
}

// 科技感线条动画
const TechLines = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative w-24 h-24 overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 45, 90, 135].map((rotation, index) => (
          <div
            key={index}
            className="absolute w-1 h-8 bg-primary/30 rounded-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              animation: `pulse-line 1.5s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-primary/50 animate-ping opacity-20" />
      </div>
    </div>
  )
}

// 中心Logo + 动态环
const LogoLoader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* 外圈 */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin" style={{ animationDuration: "3s" }} />
        <div className="absolute inset-1 rounded-full border-2 border-primary/50 animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }} />
        <div className="absolute inset-2 rounded-full border border-primary/20 animate-pulse" />
      </div>
      {/* 中心点 */}
      <div className="absolute flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        <div className="w-1 h-1 rounded-full bg-primary mt-2 animate-pulse" style={{ animationDelay: "0.3s" }} />
      </div>
    </div>
  )
}

interface GlobalLoadingProps {
  variant?: "default" | "pulse" | "circle" | "tech" | "logo"
  text?: string
  className?: string
}

export function GlobalLoading({
  variant = "logo",
  text,
  className,
}: GlobalLoadingProps) {
  const { t } = useTranslation()

  const loadingText = text || t("loading", "正在加载...")

  const renderLoader = () => {
    switch (variant) {
      case "pulse":
        return <PulseDots className="w-16 h-16" />
      case "circle":
        return <GradientCircle className="w-16 h-16" />
      case "tech":
        return <TechLines className="w-24 h-24" />
      case "logo":
      default:
        return <LogoLoader className="w-24 h-24" />
    }
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
        "bg-background/95 backdrop-blur-sm",
        "transition-all duration-300",
        className
      )}
    >
      {/* 加载动画 */}
      <div className="mb-6">{renderLoader()}</div>

      {/* 加载文字 */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium text-foreground/80">
          {loadingText}
        </span>
        <span className="text-lg font-medium text-foreground/60 animate-pulse">
          .
        </span>
        <span
          className="text-lg font-medium text-foreground/60 animate-pulse"
          style={{ animationDelay: "0.2s" }}
        >
          .
        </span>
        <span
          className="text-lg font-medium text-foreground/60 animate-pulse"
          style={{ animationDelay: "0.4s" }}
        >
          .
        </span>
      </div>

      {/* 底部信息 */}
      <p className="mt-8 text-sm text-muted-foreground/50">
        Reb Monitor
      </p>

      {/* 装饰性背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  )
}

// 迷你加载指示器
export function MiniLoading({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  )
}

export default GlobalLoading