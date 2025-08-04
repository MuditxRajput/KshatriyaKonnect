"use client"

import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, X, Star, MapPin, Crown, Rewind } from "lucide-react"
import { CircleArrowLeft } from "lucide-react"
import { CircleArrowRight } from "lucide-react"
import toast from "react-hot-toast"
import { Riple } from "react-loading-indicators"
import { setUser } from "@/store/userSlice"
import {useInteraction} from '../hooks/useInteractions';
import {useUser} from '../hooks/useUser'
  import { AnimatePresence } from "framer-motion"
import { MatchOverlay } from "@/components/ui/MatchOverlay.jsx"
type User = {
  id: number
  firstname: string
  lastname: string
  age: number
  location: string
  gotra: string
  bio: string
  looking_for: string
  photo: { url: string }[]
}

export default function HomePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "up" | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
   const[match,setMatch] = useState(false);
  const {interact} = useInteraction();
  const {firstTimeUser,loading,secondTimeUser} = useUser();
  useEffect(() => {
    const user =  firstTimeUser();
     user.then((res)=>setUsers(res))
     .catch((err)=>toast.error('Something went wrong'));
  }, [])
  const currentUser = users?.[currentCardIndex];
  const nextUser = users?.[currentCardIndex + 1]
  const handleSwipe =async ({direction ,interaction}:any) => {
    if (isAnimating || currentCardIndex >= users.length) return
    setSwipeDirection(direction)
    setIsAnimating(true);
    try {
        const res = await interact ({userId : currentUser.user_id,action : interaction})
      if(res.success && res.msg==='match')
      {
        setMatch(true)
        setTimeout(() => setMatch(false), 3000)
      }
    } catch (error) {
      console.error("Interaction failed:", error);
    }
    setTimeout(() => {
      setCurrentCardIndex((prev) => prev + 1)
      setSwipeDirection(null)
      setIsAnimating(false)
    }, 300)
  }

  const handleRewind = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1)
    }
  }

  useEffect(() => {
    const fetchMoreUser = async (id: any) => {
      try {
         const res = await secondTimeUser({id});
        if(res.success)
        {
            const value = res.user;
          setUsers((pre:any)=>([...pre,...value]));
        }
        else if(res.error ==="No users found")
        {
          toast.error('No more users ....')
        }
      
      } catch (error) {
        console.log(error)
      }
    }
    if (users?.length && currentCardIndex > users?.length - 2) {
      console.log(currentCardIndex,users.length-1);
      
      console.log("yes inside last fetch");
      const lastUser_id = users[users?.length - 1]?._id
      fetchMoreUser(lastUser_id)
    }
  }, [currentCardIndex])
   
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <AnimatePresence>
      {match && <MatchOverlay />}
    </AnimatePresence>
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-sm mx-auto">
              {/* Card Stack Container */}
              <div className="relative h-[600px]">
                {/* Background Card (Next User) */}
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <Riple color="#f8d944" size="medium" text="" textColor="" />
                  </div>
                ) : (
                  nextUser && (
                    <div className="absolute inset-0 transform scale-95 opacity-50">
                      <Card className="w-full h-full bg-white border-amber-200 shadow-lg overflow-hidden">
                        <CardContent className="p-0 h-full flex flex-col">
                          <div className="relative flex-1 bg-gradient-to-br from-amber-200 to-red-300 overflow-hidden">
                            {nextUser?.photo?.[0]?.url ? (
                              <img
                                src={nextUser.photo[0].url || "/placeholder.svg"}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-amber-800">
                                  <Crown className="w-16 h-16 mx-auto mb-2" />
                                  <p className="font-medium">Next Profile</p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-900">{nextUser.firstname}</h3>
                            <p className="text-gray-600">
                              {nextUser?.age} • {nextUser?.location}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )
                )}

                {/* Main Card (Current User) */}
                {
                  currentCardIndex >= users?.length ? <p>no more profiles</p> : 
                  <div
                  className={`absolute inset-0 transition-all duration-300 ease-out ${
                    swipeDirection === "left"
                      ? "transform -translate-x-full -rotate-12 opacity-0"
                      : swipeDirection === "right"
                        ? "transform translate-x-full rotate-12 opacity-0"
                        : swipeDirection === "up"
                          ? "transform -translate-y-full scale-110 opacity-0"
                          : "transform translate-x-0 translate-y-0 rotate-0 opacity-100"
                  }`}
                >
                  <Card className="relative w-full h-full bg-white border-amber-200 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing">
                    <CardContent className="p-0 h-full flex flex-col">
                      {/* Photo Section */}
                      <div className="relative flex-1 bg-gradient-to-br from-amber-200 to-red-300 overflow-hidden">
                        {/* Image Display */}
                        <div className="absolute inset-0">
                          {currentUser?.photo?.[currentImageIndex]?.url ? (
                            <img
                              src={currentUser.photo[currentImageIndex].url || "/placeholder.svg"}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-center text-amber-800">
                                <Crown className="w-16 h-16 mx-auto mb-2" />
                                <p className="font-medium">No Photo Available</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Photo indicators */}
                        <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
                          {currentUser?.photo?.slice(0, 4).map((_, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setCurrentImageIndex(index)
                              }}
                              className={`flex-1 h-1 rounded-full cursor-pointer transition-all ${
                                index === currentImageIndex ? "bg-white" : "bg-white/30"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Navigation Arrows */}
                        <div className="absolute left-2 right-2 top-1/2 transform -translate-y-1/2 flex justify-between z-20">
                          <div>
                            <CircleArrowLeft
                              width={40}
                              height={40}
                              className={`text-white/80 hover:text-white transition-all cursor-pointer drop-shadow-lg ${
                                currentImageIndex <= 0 ? "opacity-30 pointer-events-none" : "hover:scale-110"
                              }`}
                              onClick={() => {
                                
                                setCurrentImageIndex((pre) => pre - 1)
                              }}
                            />
                          </div>
                          <div>
                            <CircleArrowRight
                              width={40}
                              height={40}
                              className={`text-white/80 hover:text-white transition-all cursor-pointer drop-shadow-lg ${
                                currentImageIndex >= ((Math.min(currentUser?.photo?.length, 4) ?? 0) - 1)
                                  ? "opacity-30 pointer-events-none"
                                  : "hover:scale-110"
                              }`}
                              onClick={() => {
                                
                                
                                setCurrentImageIndex((prev) => prev + 1)
                              }}
                            />
                          </div>
                        </div>

                        {/* Swipe Indicators */}
                        <div className="absolute inset-0 pointer-events-none z-10">
                          {/* NOPE indicator */}
                          <div
                            className={`absolute top-1/2 left-8 transform -translate-y-1/2 -rotate-12 transition-opacity duration-200 ${
                              swipeDirection === "left" ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-xl border-4 border-red-500">
                              NOPE
                            </div>
                          </div>

                          {/* LIKE indicator */}
                          <div
                            className={`absolute top-1/2 right-8 transform -translate-y-1/2 rotate-12 transition-opacity duration-200 ${
                              swipeDirection === "right" ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-xl border-4 border-green-500">
                              LIKE
                            </div>
                          </div>

                          {/* SUPER LIKE indicator */}
                          <div
                            className={`absolute top-20 left-1/2 transform -translate-x-1/2 transition-opacity duration-200 ${
                              swipeDirection === "up" ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-xl border-4 border-blue-500">
                              SUPER LIKE
                            </div>
                          </div>
                        </div>

                        {/* Gradient overlay for better text readability */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                      </div>

                      {/* Info Section */}
                      <div className="p-6 space-y-4 bg-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                              {currentUser?.firstname + " " + currentUser?.lastname}
                              <Crown className="w-5 h-5 text-amber-600" />
                            </h2>
                            <p className="text-gray-600 flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {currentUser?.location} • {currentUser?.age}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Badge className="bg-gradient-to-r from-amber-600 to-red-700 text-white">
                            {currentUser?.gotra} Rajput
                          </Badge>
                        </div>

                        <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">{currentUser?.bio}</p>

                        <div className="pt-1">
                          <p className="text-sm">
                            <span className="text-amber-700 font-medium">Looking for:</span>{" "}
                            <span className="text-gray-700">{currentUser?.looking_for}</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                }
                
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center items-center gap-4 mt-8">
                {/* Rewind Button */}
                <Button
                  size="icon"
                  variant="outline"
                  className="w-12 h-12 rounded-full border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-400 bg-transparent disabled:opacity-50"
                  onClick={handleRewind}
                  disabled={currentCardIndex === 0}
                >
                  <Rewind className="w-5 h-5" />
                </Button>

                {/* Pass Button */}
                <Button
                  size="icon"
                  variant="outline"
                  className="w-14 h-14 rounded-full border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400 bg-transparent hover:scale-110 transition-transform"
                  onClick={() => handleSwipe({direction : "left",interaction : 'pass'})}
                  disabled={isAnimating}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Super Like Button */}
                <Button
                  size="icon"
                  className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 hover:scale-110 transition-transform"
                  // onClick={() => handleSwipe({direction : "up",interaction : 'like'})}
                  disabled={isAnimating}
                >
                  <Star className="w-5 h-5" />
                </Button>

                {/* Like Button */}
                <Button
                  size="icon"
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-lg hover:scale-110 transition-transform"
                  onClick={() => handleSwipe({direction : "right",interaction : 'like'})}
                  disabled={isAnimating}
                >
                  <Heart className="w-7 h-7" />
                </Button>

                {/* Boost Button */}
                <Button
                  size="icon"
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-110 transition-transform"
                >
                  <Crown className="w-5 h-5" />
                </Button>
              </div>

              {/* Action Labels */}
              <div className="flex justify-center items-center gap-4 mt-2">
                <span className="text-xs text-gray-500 w-12 text-center">Rewind</span>
                <span className="text-xs text-gray-500 w-14 text-center">Pass</span>
                <span className="text-xs text-gray-500 w-12 text-center">Super</span>
                <span className="text-xs text-gray-500 w-16 text-center">Like</span>
                <span className="text-xs text-gray-500 w-12 text-center">Boost</span>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  {currentCardIndex + 1} of {users?.length} profiles
                </p>
                <div className="w-full bg-amber-200 rounded-full h-1 mt-2">
                  <div
                    className="bg-gradient-to-r from-amber-600 to-red-700 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${((currentCardIndex + 1) / users?.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
