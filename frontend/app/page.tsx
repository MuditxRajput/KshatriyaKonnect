"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, Shield, Sword, Users } from "lucide-react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
export default function LandingPage() {
  const user = useSelector((state:any)=>state.profile);
  // if(user){window.location.href ="/home"; return}
  const router =useRouter();
  useEffect(()=>{
    if(user) router.push('/home');
  },[user])
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="border-b border-amber-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-red-700 bg-clip-text text-transparent">
              KshatriyaKonnect
            </h1>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-red-100 px-4 py-2 rounded-full text-amber-800 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              For the Royal Rajput Community
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-700 via-red-700 to-amber-700 bg-clip-text text-transparent">
              Find Your Royal Match
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Connect with fellow Rajputs for love, friendship, and meaningful relationships. Where tradition meets
              modern connections.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800 px-8 py-3 text-lg"
              >
                Start Your Journey
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg bg-transparent"
            >
              Learn More
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-amber-200 to-red-300 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <Crown className="w-24 h-24 text-amber-700 mx-auto mb-4" />
                <p className="text-amber-800 font-medium">Royal Connections Await</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-amber-400 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-red-400 rounded-full opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose KshatriyaKonnect?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built specifically for the Rajput community with features that honor our traditions and values.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cultural Values</h3>
                <p className="text-gray-600">
                  Connect with people who share your cultural background and traditional values.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Community</h3>
                <p className="text-gray-600">
                  Join a trusted community of verified Rajput members looking for genuine connections.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sword className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Honor & Respect</h3>
                <p className="text-gray-600">
                  A platform built on the principles of honor, respect, and meaningful relationships.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-red-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Royal Match?</h2>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Rajputs who have found love, friendship, and meaningful connections on KshatriyaKonnect.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg font-semibold">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">KshatriyaKonnect</span>
          </div>
          <p className="text-gray-400">© 2024 KshatriyaKonnect. Connecting the Royal Rajput Community.</p>
        </div>
      </footer>
    </div>
  )
}
