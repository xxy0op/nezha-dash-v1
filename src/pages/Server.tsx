import GlobalMap from "@/components/GlobalMap"
import GroupSwitch from "@/components/GroupSwitch"
import ServerCard from "@/components/ServerCard"
import ServerCardInline from "@/components/ServerCardInline"
import ServerOverview from "@/components/ServerOverview"
import { Loader } from "@/components/loading/Loader"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SORT_ORDERS, SORT_TYPES } from "@/context/sort-context"
import { useSort } from "@/hooks/use-sort"
import { useStatus } from "@/hooks/use-status"
import { useWebSocketContext } from "@/hooks/use-websocket-context"
import { fetchServerGroup } from "@/lib/nezha-api"
import { cn, formatNezhaInfo } from "@/lib/utils"
import { NezhaWebsocketResponse } from "@/types/nezha-api"
import { ServerGroup } from "@/types/nezha-api"
import { ArrowDownIcon, ArrowUpIcon, ArrowsUpDownIcon, MapIcon, ViewColumnsIcon } from "@heroicons/react/20/solid"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

export default function Servers() {
  const { t } = useTranslation()
  const { sortType, sortOrder, setSortOrder, setSortType } = useSort()
  const { data: groupData } = useQuery({
    queryKey: ["server-group"],
    queryFn: () => fetchServerGroup(),
  })
  const { lastMessage, connected } = useWebSocketContext()
  const { status } = useStatus()
  const [showMap, setShowMap] = useState<string>("0")
  const [inline, setInline] = useState<string>("1")
  const containerRef = useRef<HTMLDivElement>(null)
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
  const [currentGroup, setCurrentGroup] = useState<string>("All")

  const customBackgroundImage = (window.CustomBackgroundImage as string) !== "" ? window.CustomBackgroundImage : undefined

  const restoreScrollPosition = () => {
    const savedPosition = sessionStorage.getItem("scrollPosition")
    if (savedPosition && containerRef.current) {
      containerRef.current.scrollTop = Number(savedPosition)
    }
  }

  const handleTagChange = (newGroup: string) => {
    setCurrentGroup(newGroup)
    sessionStorage.setItem("selectedGroup", newGroup)
    sessionStorage.setItem("scrollPosition", String(containerRef.current?.scrollTop || 0))
  }

          <button
            onClick={() => {
              setInline(inline === "0" ? "1" : "0")
              localStorage.setItem("inline", inline === "0" ? "1" : "0")
            }}
            className={cn(
              "rounded-[50px] bg-white dark:bg-stone-800 cursor-pointer p-[10px] transition-all border dark:border-none border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
              {
                "shadow-[inset_0_1px_0_rgba(0,0,0,0.2)] !bg-blue-600 hover:!bg-blue-600 border-blue-600 dark:border-blue-600": inline === "1",
                "text-white": inline === "1",
              },
              {
                "bg-opacity-70 dark:bg-opacity-70": customBackgroundImage,
              },
            )}
          >
            <ViewColumnsIcon
              className={cn("size-[13px]", {
                "text-white": inline === "1",
              })}
            />
          </button>
          <GroupSwitch tabs={groupTabs} currentTab={currentGroup} setCurrentTab={handleTagChange} />
        </section>
        <Popover onOpenChange={setSettingsOpen}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "rounded-[50px] flex items-center gap-1 dark:text-white border dark:border-none text-black cursor-pointer dark:[text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] dark:bg-stone-800 bg-white  p-[10px] transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]  ",
                {
                  "shadow-[inset_0_1px_0_rgba(0,0,0,0.2)] dark:bg-stone-700 bg-stone-200": settingsOpen,
                },
                {
                  "dark:bg-stone-800/70 bg-stone-100/70 ": customBackgroundImage,
                },
              )}
            >
              <p className="text-[10px] font-bold whitespace-nowrap">{sortType === "default" ? "Sort" : sortType.toUpperCase()}</p>
              {sortOrder === "asc" && sortType !== "default" ? (
                <ArrowUpIcon className="size-[13px]" />
              ) : sortOrder === "desc" && sortType !== "default" ? (
                <ArrowDownIcon className="size-[13px]" />
              ) : (
                <ArrowsUpDownIcon className="size-[13px]" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-4 w-[240px] rounded-lg">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Sort by</Label>
                <Select value={sortType} onValueChange={setSortType}>
                  <SelectTrigger className="w-full text-xs h-8">
                    <SelectValue placeholder="Choose type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_TYPES.map((type) => (
                      <SelectItem key={type} value={type} className="text-xs">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Sort order</Label>
                <Select value={sortOrder} onValueChange={setSortOrder} disabled={sortType === "default"}>
                  <SelectTrigger className="w-full text-xs h-8">
                    <SelectValue placeholder="Choose order" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_ORDERS.map((order) => (
                      <SelectItem key={order} value={order} className="text-xs">
                        {order.charAt(0).toUpperCase() + order.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {showMap === "1" && <GlobalMap now={nezhaWsData.now} serverList={nezhaWsData?.servers || []} />}
{inline === "1" && (
  <section ref={containerRef} className="flex flex-col gap-2 mt-6 server-inline-list overflow-x-auto lg:overflow-x-scroll lg:scrollbar-hidden hidden lg:flex">
    {filteredServers.map((serverInfo) => (
      <ServerCardInline now={nezhaWsData.now} key={serverInfo.id} serverInfo={serverInfo} />
    ))}
  </section>
)}
{(inline === "0" || inline === "1") && (
  <section ref={containerRef} className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-6 server-card-list flex lg:hidden">
    {filteredServers.map((serverInfo) => (
      <ServerCard now={nezhaWsData.now} key={serverInfo.id} serverInfo={serverInfo} />
    ))}
  </section>
)}
    </div>
  )
}
