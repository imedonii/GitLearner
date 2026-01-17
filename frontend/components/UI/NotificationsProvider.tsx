import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Notification, { NotificationItem } from './Notification'

interface NotificationsContextType {
  addNotification: (notification: Omit<NotificationItem, 'id'>) => void
  removeNotification: (id: string) => void
}

const NotificationsContext = createContext<NotificationsContextType | null>(null)

export const useNotifications = () => {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return context
}

interface NotificationsProviderProps {
  children: ReactNode
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const addNotification = (notification: Omit<NotificationItem, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const newNotification: NotificationItem = { id, ...notification }
    setNotifications(prev => [...prev, newNotification])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  return (
    <NotificationsContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      {mounted && createPortal(
        <div className="fixed top-4 right-4 z-[10000] space-y-2">
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              {...notification}
              onClose={removeNotification}
            />
          ))}
        </div>,
        document.body
      )}
    </NotificationsContext.Provider>
  )
}