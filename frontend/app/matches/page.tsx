import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, MapPin, MessageCircle, Heart } from "lucide-react"
import Link from "next/link"

export default function MatchesPage() {
  const matches = [
    {
      id: 1,
      name: "Arjun Singh",
      age: 28,
      location: "Udaipur, Rajasthan",
      clan: "Sisodiya",
      bio: "Software engineer with a passion for history and heritage. Love exploring forts and palaces.",
      interests: ["History", "Technology", "Travel"],
      matchPercentage: 95,
      isNewMatch: true,
    },
    {
      id: 2,
      name: "Vikram Chauhan",
      age: 30,
      location: "Delhi",
      clan: "Chauhan",
      bio: "Entrepreneur and classical music enthusiast. Believe in traditional values.",
      interests: ["Music", "Business", "Culture"],
      matchPercentage: 88,
      isNewMatch: false,
    },
    {
      id: 3,
      name: "Rajesh Rathore",
      age: 32,
      location: "Jodhpur, Rajasthan",
      clan: "Rathore",
      bio: "Doctor by profession, photographer by passion. Love capturing heritage sites.",
      interests: ["Photography", "Medicine", "Art"],
      matchPercentage: 92,
      isNewMatch: true,
    },
    {
      id: 4,
      name: "Aditya Tomar",
      age: 27,
      location: "Gwalior, MP",
      clan: "Tomar",
      bio: "Fitness enthusiast and history buff. Looking for someone who shares similar values.",
      interests: ["Fitness", "History", "Sports"],
      matchPercentage: 85,
      isNewMatch: false,
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <Heart className="w-8 h-8 text-red-500" />
                  Your Matches
                </h1>
                <p className="text-gray-600">
                  {matches.filter((m) => m.isNewMatch).length} new matches • {matches.length} total matches
                </p>
              </div>

              {/* New Matches Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  New Matches
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matches
                    .filter((match) => match.isNewMatch)
                    .map((match) => (
                      <Card
                        key={match.id}
                        className="border-amber-200 hover:shadow-lg transition-shadow overflow-hidden"
                      >
                        <CardContent className="p-0">
                          {/* Photo Section */}
                          <div className="relative h-48 bg-gradient-to-br from-amber-200 to-red-300">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center text-amber-800">
                                <Crown className="w-12 h-12 mx-auto mb-2" />
                                <p className="font-medium text-sm">Profile Photo</p>
                              </div>
                            </div>

                            {/* Match Percentage */}
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-green-500 text-white font-bold">
                                {match.matchPercentage}% Match
                              </Badge>
                            </div>

                            {/* New Badge */}
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-red-500 text-white animate-pulse">New</Badge>
                            </div>
                          </div>

                          {/* Info Section */}
                          <div className="p-4 space-y-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                {match.name}
                                <Crown className="w-4 h-4 text-amber-600" />
                              </h3>
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {match.location} • {match.age}
                              </p>
                            </div>

                            <Badge className="bg-gradient-to-r from-amber-600 to-red-700 text-white text-xs">
                              {match.clan} Rajput
                            </Badge>

                            <p className="text-sm text-gray-700 line-clamp-2">{match.bio}</p>

                            <div className="flex flex-wrap gap-1">
                              {match.interests.slice(0, 2).map((interest) => (
                                <Badge
                                  key={interest}
                                  variant="outline"
                                  className="text-xs border-amber-300 text-amber-700"
                                >
                                  {interest}
                                </Badge>
                              ))}
                              {match.interests.length > 2 && (
                                <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                                  +{match.interests.length - 2}
                                </Badge>
                              )}
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Link href={`/profile/${match.id}`} className="flex-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                                >
                                  View Profile
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                              >
                                <MessageCircle className="w-4 h-4 mr-1" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* All Matches Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">All Matches</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matches.map((match) => (
                    <Card key={match.id} className="border-amber-200 hover:shadow-lg transition-shadow overflow-hidden">
                      <CardContent className="p-0">
                        {/* Photo Section */}
                        <div className="relative h-48 bg-gradient-to-br from-amber-200 to-red-300">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-amber-800">
                              <Crown className="w-12 h-12 mx-auto mb-2" />
                              <p className="font-medium text-sm">Profile Photo</p>
                            </div>
                          </div>

                          {/* Match Percentage */}
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-green-500 text-white font-bold">{match.matchPercentage}% Match</Badge>
                          </div>

                          {/* New Badge */}
                          {match.isNewMatch && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-red-500 text-white animate-pulse">New</Badge>
                            </div>
                          )}
                        </div>

                        {/* Info Section */}
                        <div className="p-4 space-y-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                              {match.name}
                              <Crown className="w-4 h-4 text-amber-600" />
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {match.location} • {match.age}
                            </p>
                          </div>

                          <Badge className="bg-gradient-to-r from-amber-600 to-red-700 text-white text-xs">
                            {match.clan} Rajput
                          </Badge>

                          <p className="text-sm text-gray-700 line-clamp-2">{match.bio}</p>

                          <div className="flex flex-wrap gap-1">
                            {match.interests.slice(0, 2).map((interest) => (
                              <Badge
                                key={interest}
                                variant="outline"
                                className="text-xs border-amber-300 text-amber-700"
                              >
                                {interest}
                              </Badge>
                            ))}
                            {match.interests.length > 2 && (
                              <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                                +{match.interests.length - 2}
                              </Badge>
                            )}
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Link href={`/profile/${match.id}`} className="flex-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                              >
                                View Profile
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
