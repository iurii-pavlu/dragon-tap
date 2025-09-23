"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/hooks/use-translations"
import { formatNumber } from "@/lib/utils"
import { Copy, Share2 } from "lucide-react"

const mockFriends = [
  { id: 1, name: "Alice Dragon", avatar: "👩‍🦰", coins: 25000, status: "accepted", joinedAt: "2 days ago" },
  { id: 2, name: "Bob Hunter", avatar: "👨‍🦱", coins: 18500, status: "accepted", joinedAt: "1 week ago" },
  { id: 3, name: "Carol Tapper", avatar: "👩‍🦲", coins: 12000, status: "pending", joinedAt: "3 days ago" },
]

export default function FriendsPage() {
  const { t } = useTranslations()
  const [copied, setCopied] = React.useState(false)
  
  const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL}?ref=DRAGON123`
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Dragon Tap!',
          text: 'Join me in Dragon Tap and earn coins together!',
          url: referralLink
        })
      } catch (error) {
        console.error('Share failed:', error)
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Referral Section */}
      <div className="px-4 py-4 space-y-4">
        {/* Invite Card */}
        <Card className="card-shadow bg-gradient-to-r from-coin/10 to-amber-500/10 border-coin/20">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🐲🤝</div>
              <h3 className="font-bold text-text-primary mb-1">{t('friends.invite')}</h3>
              <p className="text-sm text-text-secondary">
                Invite friends and earn bonus coins for each new player!
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1 bg-surface border border-border rounded-lg px-3 py-2">
                  <p className="text-xs text-text-secondary mb-1">{t('friends.referralLink')}</p>
                  <p className="text-xs text-text-primary font-mono truncate">
                    {referralLink}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={handleCopyLink}
                >
                  <Copy className="w-4 h-4" />
                  {copied ? t('friends.copied') : t('friends.copy')}
                </Button>
                <Button 
                  variant="coin" 
                  className="flex-1 gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="card-shadow">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-coin">{mockFriends.length}</p>
                <p className="text-xs text-text-secondary">{t('friends.invited')}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-energy">{mockFriends.filter(f => f.status === 'accepted').length}</p>
                <p className="text-xs text-text-secondary">{t('friends.accepted')}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-orange">{mockFriends.filter(f => f.status === 'pending').length}</p>
                <p className="text-xs text-text-secondary">{t('friends.pending')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Friends List */}
      <div className="flex-1 px-4 pb-6">
        <Card className="card-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-text-primary">
              Your Friends
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {mockFriends.length > 0 ? (
              <div className="space-y-0">
                {mockFriends.map((friend) => (
                  <div 
                    key={friend.id}
                    className="flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                        <span className="text-lg">{friend.avatar}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary text-sm">{friend.name}</p>
                        <p className="text-xs text-text-secondary">
                          Joined {friend.joinedAt}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-coin font-bold text-sm mb-1">
                        {formatNumber(friend.coins)} coins
                      </div>
                      <Badge 
                        variant={friend.status === 'accepted' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {friend.status === 'accepted' ? t('friends.accepted') : t('friends.pending')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="font-semibold text-text-primary mb-2">
                  No friends yet
                </h3>
                <p className="text-sm text-text-secondary">
                  Share your referral link to invite friends and earn together!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}