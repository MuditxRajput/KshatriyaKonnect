import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Crown, MapPin, Heart, MessageCircle, ArrowLeft, Star, Shield, Camera } from "lucide-react"
import Link from "next/link"

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const user = {
    id: params.id,
    name: "Arjun Singh",
    age: 28,
    location: "Udaipur, Rajasthan",
    clan: "Sisodiya",
    origin: "Mewar, Rajasthan",
    bio: "Software engineer with a deep passion for history and heritage. I love exploring ancient forts and palaces, understanding our rich Rajput culture, and preserving our traditions for future generations. Looking for someone who shares similar values and appreciates our royal heritage.",
    interests: ["History", "Technology", "Travel", "Photography", "Classical Music", "Heritage Sites"],
    education: "B.Tech Computer Science",
    profession: "Senior Software Engineer",
    lookingFor: "Serious Relationship",
    photos: [
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    matchPercentage: 95,
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <Link href="/matches" className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Matches
                </Link>
                <Badge className="bg-green-500 text-white font-bold">{user.matchPercentage}% Match</Badge>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Photos */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Main Photo */}
                  <Card className="overflow-hidden border-amber-200">
                    <div className="aspect-[3/4] bg-gradient-to-br from-amber-200 to-red-300 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-amber-800">
                          <Crown className="w-16 h-16 mx-auto mb-2" />
                          <p className="font-medium">Main Photo</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Additional Photos */}
                  <div className="grid grid-cols-2 gap-2">
                    {user.photos.slice(1, 4).map((photo, index) => (
                      <Card key={index} className="overflow-hidden border-amber-200">
                        <div className="aspect-square bg-gradient-to-br from-amber-200 to-red-300 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-amber-800" />
                          </div>
                        </div>
                      </Card>
                    ))}
                    <Card className="overflow-hidden border-amber-200 border-dashed">
                      <div className="aspect-square bg-amber-50 relative flex items-center justify-center">
                        <div className="text-center text-amber-600">
                          <span className="text-lg font-bold">+2</span>
                          <p className="text-xs">more photos</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Right Column - Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Info */}
                  <Card className="border-amber-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            {user.name}
                            <Crown className="w-7 h-7 text-amber-600" />
                          </h1>
                          <p className="text-lg text-gray-600 flex items-center gap-2 mt-1">
                            <MapPin className="w-5 h-5" />
                            {user.location} • {user.age} years old
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-gradient-to-r from-amber-600 to-red-700 text-white">
                          <Shield className="w-3 h-3 mr-1" />
                          {user.clan} Rajput
                        </Badge>
                        <Badge variant="outline" className="border-amber-300 text-amber-700">
                          {user.origin}
                        </Badge>
                      </div>

                      <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                    </CardContent>
                  </Card>

                  {/* Interests */}
                  <Card className="border-amber-200">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Interests</h2>
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest) => (
                          <Badge
                            key={interest}
                            variant="outline"
                            className="border-amber-300 text-amber-700 hover:bg-amber-50"
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Details */}
                  <Card className="border-amber-200">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Education</span>
                          <span className="text-gray-900 font-medium">{user.education}</span>
                        </div>
                        <Separator className="bg-amber-200" />
                        <div className="flex justify-between">
                          <span className="text-gray-600">Profession</span>
                          <span className="text-gray-900 font-medium">{user.profession}</span>
                        </div>
                        <Separator className="bg-amber-200" />
                        <div className="flex justify-between">
                          <span className="text-gray-600">Looking For</span>
                          <span className="text-gray-900 font-medium">{user.lookingFor}</span>
                        </div>
                        <Separator className="bg-amber-200" />
                        <div className="flex justify-between">
                          <span className="text-gray-600">Clan</span>
                          <span className="text-gray-900 font-medium">{user.clan}</span>
                        </div>
                        <Separator className="bg-amber-200" />
                        <div className="flex justify-between">
                          <span className="text-gray-600">Origin</span>
                          <span className="text-gray-900 font-medium">{user.origin}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-red-300 text-red-500 hover:bg-red-50 bg-transparent"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Like
                    </Button>
                    <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                      <Star className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
